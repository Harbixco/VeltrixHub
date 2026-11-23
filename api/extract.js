// Vercel Serverless Function & Node Handler: Automated Google Places Lead Extraction
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

const GOOGLE_PLACES_KEY =
  process.env.GOOGLE_PLACES_API_KEY || "AIzaSyB0pWJjUV6yBFuefNKZtFsh86v6yIEspLo";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://agbajeabiodunkay_db_user:8sh9sZDp89t6sBkU@veltrix-leads.plfrnll.mongodb.net/veltrix_leads?retryWrites=true&w=majority";

const DB_NAME = "veltrix_leads";
const CSV_PATH = path.join(process.cwd(), "outreach", "leads_veltrixhub.csv");

const NICHES = {
  cleaning: {
    keywords: ["cleaning company", "cleaning services", "janitorial services"],
    demo_url: "https://veltrixhub.ng/cleaning",
  },
  painting: {
    keywords: ["painting company", "house painters", "painting contractor"],
    demo_url: "https://veltrixhub.ng/painting",
  },
  "plumbing-services": {
    keywords: ["plumbing services", "emergency plumber", "plumbing contractor"],
    demo_url: "https://veltrixhub.ng/plumbing-services",
  },
  "auto-repair": {
    keywords: ["auto repair workshop", "car mechanic", "auto diagnosis"],
    demo_url: "https://veltrixhub.ng/auto-repair",
  },
  contractor: {
    keywords: ["building contractor", "construction company", "renovation contractor"],
    demo_url: "https://veltrixhub.ng/contractor",
  },
  "dental-care": {
    keywords: ["dental clinic", "dentist practice", "dental hospital"],
    demo_url: "https://veltrixhub.ng/dental-care",
  },
  "personal-injury": {
    keywords: ["law firm", "legal practitioners", "barristers solicitors"],
    demo_url: "https://veltrixhub.ng/personal-injury",
  },
  "towing-company": {
    keywords: ["towing service", "vehicle recovery", "breakdown service"],
    demo_url: "https://veltrixhub.ng/towing-company",
  },
  electrical: {
    keywords: ["electrical services", "electrical contractor", "solar inverter installation"],
    demo_url: "https://veltrixhub.ng/electrical",
  },
  flooring: {
    keywords: ["flooring company", "epoxy flooring", "marble tiles installation"],
    demo_url: "https://veltrixhub.ng/flooring",
  },
  landscaping: {
    keywords: ["landscaping services", "interlocking and paving", "garden design"],
    demo_url: "https://veltrixhub.ng/landscaping",
  },
  locksmith: {
    keywords: ["locksmith services", "car key programming", "lock repair"],
    demo_url: "https://veltrixhub.ng/locksmith",
  },
  "pest-control": {
    keywords: ["pest control services", "fumigation company", "termite treatment"],
    demo_url: "https://veltrixhub.ng/pest-control",
  },
  "pressure-demo": {
    keywords: ["pressure washing", "power washing", "exterior building cleaning"],
    demo_url: "https://veltrixhub.ng/pressure-demo",
  },
  fashion: {
    keywords: ["fashion boutique", "female clothing store", "bespoke designer"],
    demo_url: "https://veltrixhub.ng/fashion",
  },
  perfumes: {
    keywords: ["perfume store", "luxury fragrance boutique", "designer scents"],
    demo_url: "https://veltrixhub.ng/perfumes",
  },
  "tech-gadgets": {
    keywords: ["phone and gadgets store", "laptop shop", "smartphones accessories"],
    demo_url: "https://veltrixhub.ng/tech-gadgets",
  },
};

const LOCATIONS = [
  { city: "Lagos", districts: ["Lekki", "Ikeja", "Victoria Island", "Yaba", "Surulere", "Ajah"] },
  { city: "Abuja", districts: ["Wuse", "Garki", "Maitama", "Jabi", "Gwarinpa"] },
  { city: "Port Harcourt", districts: ["GRA", "Trans Amadi"] },
  { city: "Ibadan", districts: ["Bodija", "Ring Road"] },
];

function parseCSVLine(text) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = "";
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function getValidDemoUrl(rawUrl, nicheKey, agency = "veltrixhub") {
  if (rawUrl && typeof rawUrl === "string" && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))) {
    return rawUrl.trim();
  }
  const cleanNiche = (nicheKey || "painting").toLowerCase().trim();
  return `https://veltrixhub.ng/${cleanNiche}`;
}

let cachedClient = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 });
    await cachedClient.connect();
  }
  return cachedClient.db(DB_NAME);
}

// Scrape email from website and contact pages
async function scrapeEmailsFromWebsite(websiteUrl) {
  if (!websiteUrl) return [];
  const emails = new Set();
  const testUrls = [websiteUrl];

  try {
    const parsed = new URL(websiteUrl);
    const base = `${parsed.protocol}//${parsed.host}`;
    testUrls.push(`${base}/contact`, `${base}/contact-us`, `${base}/about`);
  } catch {
    return [];
  }

  for (const u of testUrls) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const resp = await fetch(u, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) VeltrixScraper/1.0" },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!resp.ok) continue;
      const html = await resp.text();

      // Mailto matches
      const mailtos = html.match(/mailto:([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/gi) || [];
      for (const m of mailtos) {
        const clean = cleanEmail(m.replace(/^mailto:/i, ""));
        if (clean) emails.add(clean);
      }

      // Regex text matches
      const matches = html.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g) || [];
      for (const e of matches) {
        const clean = cleanEmail(e);
        if (clean) emails.add(clean);
      }

      if (emails.size > 0) break;
    } catch {
      continue;
    }
  }

  return Array.from(emails);
}

function cleanEmail(e) {
  if (!e) return null;
  e = e.trim().replace(/[.,;:)'"]+$/, "");
  const low = e.toLowerCase();
  const badExts = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".css", ".js"];
  if (badExts.some((ext) => low.endsWith(ext))) return null;
  const badTerms = ["wixpress", "sentry", "example", "schema", "wordpress", "yourdomain", "domain.com"];
  if (badTerms.some((term) => low.includes(term))) return null;
  if (!e.includes("@") || !e.split("@")[1].includes(".")) return null;
  return e;
}

export default async function handler(req, res) {
  req.query = req.query || {};
  req.body = req.body || {};

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 1. GET ALL LEADS ENDPOINT (for frontend table)
  if (req.query.get_leads === "true" || req.query.get_leads === true) {
    try {
      const leadsMap = new Map();

      // Read local CSV if present
      if (fs.existsSync(CSV_PATH)) {
        try {
          const csvContent = fs.readFileSync(CSV_PATH, "utf-8");
          const lines = csvContent.split("\n").map((l) => l.trim()).filter(Boolean);
          for (let i = 1; i < lines.length; i++) {
            const parts = parseCSVLine(lines[i]);
            if (parts.length >= 3) {
              const email = parts[2]?.replace(/^"|"$/g, "").trim();
              if (email && email.includes("@")) {
                const niche = parts[3]?.replace(/^"|"$/g, "").trim() || "painting";
                const urlInParts = parts.find((p) => p.startsWith("http://") || p.startsWith("https://"));
                const demoUrl = getValidDemoUrl(urlInParts || parts[5], niche, "veltrixhub");
                let city = parts[4]?.replace(/^"|"$/g, "").trim() || "Lagos";

                leadsMap.set(email.toLowerCase(), {
                  id: `csv-${i}`,
                  business_name: parts[0]?.replace(/^"|"$/g, "").trim(),
                  contact_name: parts[1]?.replace(/^"|"$/g, "").trim() || "The Managing Director",
                  email: email,
                  niche: niche,
                  city: city,
                  demo_url: demoUrl,
                  status: parts[6]?.replace(/^"|"$/g, "").trim() || "pending",
                  sent_at: parts[7]?.replace(/^"|"$/g, "").trim() || "",
                  sent_by: parts[8]?.replace(/^"|"$/g, "").trim() || "",
                  source: "CSV Storage",
                });
              }
            }
          }
        } catch (csvErr) {
          console.warn("Notice reading CSV leads:", csvErr.message);
        }
      }

      // Read MongoDB leads if available
      try {
        const db = await getDb();
        const mongoLeads = await db
          .collection("leads")
          .find({})
          .sort({ createdAt: -1 })
          .limit(200)
          .toArray();

        for (const doc of mongoLeads) {
          if (doc.email) {
            const lowEmail = doc.email.toLowerCase().trim();
            const existing = leadsMap.get(lowEmail);
            const niche = doc.niche || existing?.niche || "painting";
            const demoUrl = getValidDemoUrl(doc.demo_url || existing?.demo_url, niche, "veltrixhub");

            leadsMap.set(lowEmail, {
              ...existing,
              id: doc._id?.toString() || doc.id || lowEmail,
              business_name: doc.business_name || existing?.business_name,
              contact_name: doc.contact_name || existing?.contact_name || "The Managing Director",
              email: doc.email,
              phone: doc.phone || "",
              niche: niche,
              city: doc.city || existing?.city || "Lagos",
              demo_url: demoUrl,
              status: doc.status || existing?.status || "pending",
              sent_at: doc.sent_at || existing?.sent_at || "",
              sent_by: doc.sent_by || existing?.sent_by || "",
              source: doc.source || "MongoDB Atlas",
              createdAt: doc.createdAt,
            });
          }
        }
      } catch (dbErr) {
        console.warn("MongoDB read notice (fallback to CSV):", dbErr.message);
      }

      const allLeads = Array.from(leadsMap.values());
      return res.status(200).json({
        success: true,
        count: allLeads.length,
        leads: allLeads,
      });
    } catch (err) {
      console.error("Error reading leads:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // 2. EXTRACTION ENDPOINT
  const targetCount = parseInt(req.query.count || req.body?.count || "10", 10);
  const targetNiche = req.query.niche || req.body?.niche || null;
  const targetCity = req.query.city || req.body?.city || null;

  try {
    const db = await getDb();
    const leadsCol = db.collection("leads");

    // Load existing emails from database to avoid duplicates
    const existingDocs = await leadsCol.find({}, { projection: { email: 1 } }).toArray();
    const existingEmails = new Set(
      existingDocs.map((d) => (d.email || "").toLowerCase().trim()).filter(Boolean)
    );

    // Also read local CSV if present
    if (fs.existsSync(CSV_PATH)) {
      try {
        const csvContent = fs.readFileSync(CSV_PATH, "utf-8");
        const lines = csvContent.split("\n").filter(Boolean);
        for (let i = 1; i < lines.length; i++) {
          const parts = parseCSVLine(lines[i]);
          if (parts[2] && parts[2].includes("@")) {
            existingEmails.add(parts[2].replace(/^"|"$/g, "").trim().toLowerCase());
          }
        }
      } catch (e) {
        console.warn("Notice reading CSV:", e.message);
      }
    }

    const newlyExtracted = [];
    const nicheKeys = targetNiche && NICHES[targetNiche] ? [targetNiche] : Object.keys(NICHES);
    const locationPool = LOCATIONS.filter(
      (l) => !targetCity || l.city.toLowerCase() === targetCity.toLowerCase()
    );

    for (const nicheKey of nicheKeys) {
      if (newlyExtracted.length >= targetCount) break;
      const nicheInfo = NICHES[nicheKey];

      for (const loc of locationPool) {
        if (newlyExtracted.length >= targetCount) break;
        const city = loc.city;

        for (const district of loc.districts) {
          if (newlyExtracted.length >= targetCount) break;

          for (const keyword of nicheInfo.keywords.slice(0, 2)) {
            if (newlyExtracted.length >= targetCount) break;

            const queryText = `${keyword} in ${district} ${city} Nigeria`;
            try {
              const placesUrl = "https://places.googleapis.com/v1/places:searchText";
              const placesResp = await fetch(placesUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
                  "X-Goog-FieldMask":
                    "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating",
                },
                body: JSON.stringify({ textQuery: queryText }),
              });

              if (!placesResp.ok) continue;
              const placesData = await placesResp.json();
              const places = placesData.places || [];

              for (const p of places) {
                if (newlyExtracted.length >= targetCount) break;
                const bizName = p.displayName?.text?.trim();
                const website = p.websiteUri || "";
                const phone = p.nationalPhoneNumber || "";

                if (!bizName || !website) continue;

                const foundEmails = await scrapeEmailsFromWebsite(website);
                const freshEmails = foundEmails.filter((e) => !existingEmails.has(e.toLowerCase()));

                if (freshEmails.length > 0) {
                  const primaryEmail = freshEmails[0];
                  existingEmails.add(primaryEmail.toLowerCase());

                  const leadRecord = {
                    business_name: bizName,
                    contact_name: "The Managing Director",
                    email: primaryEmail,
                    phone: phone,
                    niche: nicheKey,
                    city: city,
                    demo_url: nicheInfo.demo_url,
                    status: "pending",
                    source: "Google Places Automated Extraction",
                    createdAt: new Date(),
                  };

                  newlyExtracted.push(leadRecord);

                  // Insert into MongoDB
                  await leadsCol.updateOne(
                    { email: primaryEmail.toLowerCase() },
                    { $set: leadRecord },
                    { upsert: true }
                  );

                  // Append to CSV on disk if local filesystem is writable
                  try {
                    if (fs.existsSync(CSV_PATH)) {
                      const csvRow = `"${bizName.replace(/"/g, '""')}","The Managing Director","${primaryEmail}","${nicheKey}","${city}","${nicheInfo.demo_url}","pending","",""\n`;
                      fs.appendFileSync(CSV_PATH, csvRow, "utf-8");
                    }
                  } catch (csvErr) {
                    console.warn("Notice appending to CSV:", csvErr.message);
                  }
                }
              }
            } catch (err) {
              console.warn("Query error for", queryText, err.message);
            }
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      added_count: newlyExtracted.length,
      leads: newlyExtracted,
      message: `Successfully extracted and verified ${newlyExtracted.length} fresh prospects.`,
    });
  } catch (err) {
    console.error("Extraction error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
