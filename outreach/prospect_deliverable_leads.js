// High-Speed Lead Harvester with 100% Pre-Flight DNS MX Verification
import { MongoClient } from "mongodb";
import dns from "dns";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const resolveMx = promisify(dns.resolveMx);

const GOOGLE_PLACES_KEY =
  process.env.GOOGLE_PLACES_API_KEY || "AIzaSyB0pWJjUV6yBFuefNKZtFsh86v6yIEspLo";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://agbajeabiodunkay_db_user:8sh9sZDp89t6sBkU@veltrix-leads.plfrnll.mongodb.net/veltrix_leads?retryWrites=true&w=majority";

const DB_NAME = "veltrix_leads";
const LEADS_COLLECTION = "leads";
const CSV_PATH = path.join(process.cwd(), "outreach", "leads_veltrixhub.csv");

const NICHES = [
  {
    key: "contractor",
    label: "Building Contractors",
    queries: [
      "building contractor in Ikeja Lagos",
      "construction company in Lekki Lagos",
      "renovation contractor in Victoria Island Lagos",
      "civil engineering construction in Abuja",
      "building contractor in Port Harcourt",
      "construction firm in Yaba Lagos",
      "general contractor in Surulere Lagos",
    ],
    demo_url: "https://veltrixhub.ng/contractor",
  },
  {
    key: "painting",
    label: "Painting & Finishing",
    queries: [
      "painting company in Lagos",
      "house painters in Lekki Lagos",
      "painting contractor in Ikeja",
      "painting services in Abuja",
      "industrial painting company in Lagos",
      "commercial painting contractor in Port Harcourt",
      "paint manufacturing and finishing in Lagos",
    ],
    demo_url: "https://veltrixhub.ng/painting",
  },
  {
    key: "cleaning",
    label: "Commercial Cleaning",
    queries: [
      "commercial cleaning company in Victoria Island Lagos",
      "cleaning services in Lekki Lagos",
      "janitorial services in Ikeja",
      "facility management cleaning in Abuja",
      "cleaning company in Port Harcourt",
      "office cleaning services in Yaba Lagos",
      "cleaning and fumigation company in Lagos",
    ],
    demo_url: "https://veltrixhub.ng/cleaning",
  },
  {
    key: "auto-repair",
    label: "Auto Repair & Diagnostics",
    queries: [
      "auto repair workshop in Ikeja Lagos",
      "car diagnostic center in Lekki Lagos",
      "auto mechanic workshop in Victoria Island",
      "auto repair center in Garki Abuja",
      "car repair service in Port Harcourt",
      "automobile engineering in Surulere Lagos",
      "car service workshop in Yaba Lagos",
    ],
    demo_url: "https://veltrixhub.ng/auto-repair",
  },
  {
    key: "dental-care",
    label: "Dental Clinics",
    queries: [
      "dental clinic in Victoria Island Lagos",
      "dental care practice in Lekki Lagos",
      "dentist hospital in Ikeja Lagos",
      "dental clinic in Wuse Abuja",
      "dental clinic in Maitama Abuja",
      "family dental care in Surulere Lagos",
      "dental surgery clinic in Port Harcourt",
    ],
    demo_url: "https://veltrixhub.ng/dental-care",
  },
  {
    key: "personal-injury",
    label: "Commercial Law Firms",
    queries: [
      "law firm in Victoria Island Lagos",
      "legal practitioners in Ikeja Lagos",
      "barristers solicitors in Lekki Lagos",
      "commercial law firm in Maitama Abuja",
      "law firm in Port Harcourt",
      "solicitors and advocates in Yaba Lagos",
      "corporate legal counsel in Lagos",
    ],
    demo_url: "https://veltrixhub.ng/personal-injury",
  },
  {
    key: "electrical",
    label: "Solar & Inverter Engineering",
    queries: [
      "solar inverter installation company in Lagos",
      "solar company in Ikeja Lagos",
      "electrical engineering contractor in Lekki",
      "solar energy systems in Abuja",
      "inverter solar installation in Port Harcourt",
      "renewable energy solar in Victoria Island",
      "electrical wiring and installation in Lagos",
    ],
    demo_url: "https://veltrixhub.ng/electrical",
  },
  {
    key: "pest-control",
    label: "Pest Control & Fumigation",
    queries: [
      "pest control services in Lagos",
      "fumigation company in Lekki Lagos",
      "pest control company in Ikeja",
      "fumigation services in Abuja",
      "commercial pest control in Port Harcourt",
      "termite treatment in Victoria Island Lagos",
    ],
    demo_url: "https://veltrixhub.ng/pest-control",
  },
  {
    key: "fashion",
    label: "Fashion & Boutiques",
    queries: [
      "fashion boutique in Lekki Lagos",
      "designer clothing boutique in Victoria Island Lagos",
      "bespoke fashion house in Ikeja Lagos",
      "luxury fashion store in Wuse Abuja",
      "clothing brand in Lagos",
    ],
    demo_url: "https://veltrixhub.ng/fashion",
  },
  {
    key: "tech-gadgets",
    label: "Tech & Gadgets Stores",
    queries: [
      "gadget store in Ikeja Lagos",
      "phone and laptop shop in Victoria Island Lagos",
      "smartphones accessories in Lekki Lagos",
      "computer store in Abuja",
      "tech retail store in Yaba Lagos",
    ],
    demo_url: "https://veltrixhub.ng/tech-gadgets",
  },
  {
    key: "perfumes",
    label: "Luxury Perfumes",
    queries: [
      "perfume store in Lekki Lagos",
      "luxury fragrance boutique in Victoria Island",
      "designer perfume shop in Ikeja Lagos",
      "perfume boutique in Abuja",
    ],
    demo_url: "https://veltrixhub.ng/perfumes",
  },
];

function cleanEmail(raw) {
  if (!raw) return null;
  const e = raw.trim().replace(/^mailto:/i, "").split("?")[0].toLowerCase();

  // Exclude file extensions
  const badExts = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".css", ".js", ".map", ".ico", ".woff", ".ttf"];
  if (badExts.some((ext) => e.endsWith(ext))) return null;

  // Exclude software / code / framework artifacts
  const badTerms = [
    "wix", "sentry", "example", "schema", "wordpress", "domain.com", "mysite", "react", "webpack",
    "babel", "polyfill", "segmenter", "bundle", "lodash", "rspack", "core-js", "node_modules", "npm",
    "jsdelivr", "unpkg", "github", "cloudflare", "gravatar", "akamai"
  ];
  if (badTerms.some((t) => e.includes(t))) return null;

  // Must have exactly one @
  const parts = e.split("@");
  if (parts.length !== 2) return null;

  const [user, domain] = parts;
  if (!user || user.length > 64) return null;
  if (!domain || domain.length > 120) return null;

  // Domain cannot start with digit or symbol
  if (/^[\d._-]/.test(domain)) return null;

  // Domain must contain a valid TLD (at least 2 alphabetic chars)
  const tld = domain.split(".").pop();
  if (!tld || !/^[a-z]{2,}$/.test(tld)) return null;

  // Overall RFC-like syntax
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(e)) return null;

  return e;
}

const mxCache = new Map();
async function verifyMx(email) {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1].toLowerCase().trim();
  if (mxCache.has(domain)) return mxCache.get(domain);

  try {
    const mx = await resolveMx(domain).catch(() => null);
    const isValid = Boolean(mx && Array.isArray(mx) && mx.length > 0);
    mxCache.set(domain, isValid ? mx[0].exchange : false);
    return isValid ? mx[0].exchange : false;
  } catch {
    mxCache.set(domain, false);
    return false;
  }
}

// Concurrently scrape multiple pages of a website in 2 seconds max
async function scrapeEmails(websiteUrl) {
  if (!websiteUrl) return [];
  let base = "";
  try {
    const parsed = new URL(websiteUrl);
    base = `${parsed.protocol}//${parsed.host}`;
  } catch {
    return [];
  }

  const pages = [websiteUrl, `${base}/contact`, `${base}/contact-us`, `${base}/about`];
  const found = new Set();

  const fetchPromises = pages.map(async (pageUrl) => {
    try {
      const resp = await fetch(pageUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) VeltrixProspector/2.0" },
        signal: AbortSignal.timeout(2200),
      });
      if (!resp.ok) return;
      const html = await resp.text();

      const mailtos = html.match(/mailto:([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/gi) || [];
      for (const m of mailtos) {
        const ce = cleanEmail(m);
        if (ce) found.add(ce);
      }

      const regexMatches = html.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g) || [];
      for (const r of regexMatches) {
        const ce = cleanEmail(r);
        if (ce) found.add(ce);
      }
    } catch {
      // Timeout or error ignored
    }
  });

  await Promise.allSettled(fetchPromises);
  return Array.from(found);
}

async function main() {
  console.log("=== STARTING HIGH-SPEED DELIVERABLE LEAD HARVESTER ===");
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  const db = client.db(DB_NAME);
  const leadsCol = db.collection(LEADS_COLLECTION);

  // Load existing emails
  const existingDocs = await leadsCol.find({}, { projection: { email: 1 } }).toArray();
  const existingEmails = new Set(existingDocs.map((d) => (d.email || "").toLowerCase().trim()).filter(Boolean));

  // Current pending deliverable count
  const currentPending = await leadsCol.countDocuments({ status: "pending", is_deliverable: true });
  console.log(`Current pending deliverable leads: ${currentPending}`);

  const TARGET_TOTAL = 80;
  const NEEDED = Math.max(TARGET_TOTAL - currentPending, 25);
  console.log(`Targeting to harvest at least ${NEEDED} fresh MX-verified leads (to hit ${TARGET_TOTAL} total in queue)...`);

  let addedCount = 0;

  for (const niche of NICHES) {
    if (addedCount >= NEEDED) break;
    console.log(`\nExploring ${niche.label} (${niche.key})...`);

    for (const query of niche.queries) {
      if (addedCount >= NEEDED) break;

      try {
        const placesResp = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri",
          },
          body: JSON.stringify({ textQuery: query }),
        });

        if (!placesResp.ok) continue;
        const placesData = await placesResp.json();
        const places = placesData.places || [];

        // Concurrently process places
        for (const place of places) {
          if (addedCount >= NEEDED) break;
          const bizName = place.displayName?.text?.trim();
          const website = place.websiteUri || "";
          const phone = place.nationalPhoneNumber || "";
          const address = place.formattedAddress || "";

          if (!bizName || !website) continue;

          let city = "Lagos";
          if (query.toLowerCase().includes("abuja") || address.toLowerCase().includes("abuja")) city = "Abuja";
          else if (query.toLowerCase().includes("port harcourt") || address.toLowerCase().includes("port harcourt")) city = "Port Harcourt";
          else if (query.toLowerCase().includes("ibadan") || address.toLowerCase().includes("ibadan")) city = "Ibadan";

          const scrapedEmails = await scrapeEmails(website);

          for (const rawEmail of scrapedEmails) {
            const email = rawEmail.toLowerCase().trim();
            if (existingEmails.has(email)) continue;

            const mxHost = await verifyMx(email);
            if (!mxHost) continue;

            existingEmails.add(email);
            addedCount++;

            const newLead = {
              business_name: bizName,
              businessName: bizName,
              contact_name: "The Managing Director",
              email: email,
              phone: phone,
              niche: niche.key,
              industry: niche.key,
              city: city,
              demo_url: niche.demo_url,
              status: "pending",
              is_deliverable: true,
              mx_verified: true,
              mx_host: mxHost,
              source: "Google Places + Real-Time MX Verification",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            await leadsCol.updateOne({ email: email }, { $set: newLead }, { upsert: true });

            console.log(
              `  ✓ [#${addedCount}] ${bizName} | ${email} (MX: ${mxHost}) | ${niche.key}`
            );

            // Safe append to CSV
            try {
              if (fs.existsSync(CSV_PATH)) {
                const csvRow = `"${bizName.replace(/"/g, '""')}","The Managing Director","${email}","${niche.key}","${city}","${niche.demo_url}","pending","",""\n`;
                fs.appendFileSync(CSV_PATH, csvRow, "utf-8");
              }
            } catch {
              // CSV safe
            }

            break; // One primary verified lead per business
          }
        }
      } catch (err) {
        console.warn(`Query error for "${query}":`, err.message);
      }
    }
  }

  const finalPending = await leadsCol.countDocuments({ status: "pending", is_deliverable: true });
  console.log("\n=======================================================");
  console.log(`HARVEST COMPLETE! Discovered & verified ${addedCount} brand new deliverable prospects.`);
  console.log(`TOTAL DELIVERABLE LEADS NOW READY IN QUEUE: ${finalPending}`);
  console.log("=======================================================");

  await client.close();
}

main().catch(console.error);
