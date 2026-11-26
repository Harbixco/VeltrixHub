// No-Website SME WhatsApp Contact Harvester & Queue Builder for Veltrix Hub
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  cleanEmail,
  isSocialOrDirectoryUrl,
  isEnterpriseOrSkipLead,
  normalizeNicheSlug,
  formatNigerianWhatsApp,
  generateWhatsAppPitchMessage,
  buildWhatsAppPitchUrl,
  normalizeLead,
} from "../api/_outreachCore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOOGLE_PLACES_KEY =
  process.env.GOOGLE_PLACES_API_KEY || "AIzaSyB0pWJjUV6yBFuefNKZtFsh86v6yIEspLo";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://agbajeabiodunkay_db_user:8sh9sZDp89t6sBkU@veltrix-leads.plfrnll.mongodb.net/veltrix_leads?retryWrites=true&w=majority";

const DB_NAME = "veltrix_leads";
const LEADS_COLLECTION = "leads";
const WA_CSV_PATH = path.join(__dirname, "whatsapp_no_website_leads.csv");

const SERVICE_NICHES = [
  {
    key: "cleaning",
    label: "Commercial Cleaning",
    queries: ["cleaning services in Ikeja Lagos", "office cleaning company in Lekki Lagos", "cleaning service in Wuse Abuja", "cleaning company in Surulere Lagos"],
  },
  {
    key: "painting",
    label: "Painting & Finishing",
    queries: ["house painters in Ikeja Lagos", "painting contractor in Lekki Lagos", "painting services in Abuja", "painter in Port Harcourt"],
  },
  {
    key: "contractor",
    label: "Building Contractors",
    queries: ["building contractor in Lekki Lagos", "renovation contractor in Ikeja Lagos", "building construction company in Abuja"],
  },
  {
    key: "auto-repair",
    label: "Auto Repair & Diagnostics",
    queries: ["auto mechanic workshop in Ikeja Lagos", "car repair service in Lekki Lagos", "auto repair garage in Abuja", "car mechanic in Surulere Lagos"],
  },
  {
    key: "dental-care",
    label: "Dental Clinics",
    queries: ["dental clinic in Surulere Lagos", "dental care in Ikeja Lagos", "dental clinic in Garki Abuja"],
  },
  {
    key: "electrical",
    label: "Solar & Electrical",
    queries: ["solar inverter installer in Ikeja Lagos", "electrical contractor in Surulere Lagos", "solar installation in Abuja"],
  },
  {
    key: "pest-control",
    label: "Pest Control & Fumigation",
    queries: ["fumigation service in Ikeja Lagos", "pest control in Surulere Lagos", "fumigation company in Wuse Abuja"],
  },
  {
    key: "plumbing-services",
    label: "Plumbing Services",
    queries: ["plumber in Lekki Lagos", "plumbing services in Ikeja Lagos", "plumbing contractor in Abuja"],
  },
  {
    key: "fashion",
    label: "Fashion & Boutiques",
    queries: ["fashion designer in Lekki Lagos", "bespoke tailoring in Ikeja Lagos", "clothing boutique in Abuja"],
  },
  {
    key: "perfumes",
    label: "Luxury Perfumes",
    queries: ["perfume store in Ikeja Lagos", "perfume oil shop in Wuse Abuja", "fragrance boutique in Lekki Lagos"],
  },
  {
    key: "tech-gadgets",
    label: "Tech & Gadgets Stores",
    queries: ["phone store in Computer Village Ikeja Lagos", "laptop repair shop in Yaba Lagos", "gadget store in Wuse Abuja"],
  },
];

function extractCity(query, address) {
  const combined = `${query} ${address}`.toLowerCase();
  if (combined.includes("abuja")) return "Abuja";
  if (combined.includes("port harcourt")) return "Port Harcourt";
  if (combined.includes("ibadan")) return "Ibadan";
  return "Lagos";
}

function escapeCsv(val) {
  if (val === undefined || val === null) return "";
  const s = String(val);
  return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
}

async function main() {
  console.log("=== NO-WEBSITE SME WHATSAPP CONTACT HARVESTER ===");
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  const db = client.db(DB_NAME);
  const col = db.collection(LEADS_COLLECTION);

  // 1. Upgrade existing phone-only no-website leads in MongoDB to 'whatsapp_ready'
  const existingNoWeb = await col
    .find({
      $and: [
        { $or: [{ hasWebsite: false }, { website_url: { $in: ["", null] } }] },
        { $or: [{ email: { $exists: false } }, { email: null }, { email: "" }] },
        { phone: { $exists: true, $nin: ["", null] } },
      ],
    })
    .toArray();

  const seenWaDigits = new Set();
  const bulkOps = [];

  for (const doc of existingNoWeb) {
    const phoneInfo = formatNigerianWhatsApp(doc.phone);
    if (!phoneInfo) continue;

    const rawInd = doc.niche || doc.industry || "";
    const mappedNiche = normalizeNicheSlug(rawInd);
    if (!mappedNiche) {
      seenWaDigits.add(phoneInfo.waDigits);
      continue;
    }

    if (seenWaDigits.has(phoneInfo.waDigits)) continue;
    seenWaDigits.add(phoneInfo.waDigits);

    const cleanName = normalizeLead({ business_name: doc.businessName || doc.business_name }).business_name;
    if (isEnterpriseOrSkipLead(cleanName, "", "", doc.source)) continue;

    const demoUrl = `https://veltrixhub.ng/${mappedNiche}`;
    const nextStatus = doc.status === "whatsapp_sent" ? "whatsapp_sent" : "whatsapp_ready";
    const waUrl = buildWhatsAppPitchUrl({
      business_name: cleanName,
      niche: mappedNiche,
      city: doc.city || "Lagos",
      demo_url: demoUrl,
      whatsapp_number: phoneInfo.waDigits,
    });

    bulkOps.push({
      updateOne: {
        filter: { _id: doc._id },
        update: {
          $set: {
            business_name: cleanName,
            businessName: cleanName,
            niche: mappedNiche,
            demo_url: demoUrl,
            hasWebsite: false,
            whatsapp_digits: phoneInfo.waDigits,
            whatsapp_number: phoneInfo.display,
            wa_link: waUrl,
            pitch_track: "no_website",
            status: nextStatus,
            is_deliverable: false,
            updatedAt: new Date().toISOString(),
          },
        },
      },
    });
  }
  if (bulkOps.length > 0) {
    await col.bulkWrite(bulkOps);
  }
  console.log(`Restored/standardized existing no-website WhatsApp leads: ${bulkOps.length}`);

  // 2. Track all phone digits already present across entire collection
  const allPhones = await col.find({ phone: { $exists: true, $nin: ["", null] } }, { projection: { phone: 1, whatsapp_digits: 1 } }).toArray();
  for (const p of allPhones) {
    const info = formatNigerianWhatsApp(p.whatsapp_digits || p.phone);
    if (info) seenWaDigits.add(info.waDigits);
  }

  // 3. Harvest fresh NO-WEBSITE SME leads across all service & retail niches from Google Places
  let addedNew = 0;
  const maxPerNiche = 12;

  for (const niche of SERVICE_NICHES) {
    let nicheAdded = 0;
    console.log(`\nScanning Google Places (No Website Filter) for ${niche.label}...`);

    for (const query of niche.queries) {
      if (nicheAdded >= maxPerNiche) break;
      try {
        const resp = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri",
          },
          body: JSON.stringify({ textQuery: query }),
          signal: AbortSignal.timeout(8000),
        });

        if (!resp.ok) continue;
        const data = await resp.json();
        const places = data.places || [];

        for (const p of places) {
          if (nicheAdded >= maxPerNiche) break;
          const rawName = p.displayName?.text?.trim();
          const website = (p.websiteUri || "").trim();
          const phone = (p.nationalPhoneNumber || "").trim();
          const address = (p.formattedAddress || "").trim();

          if (!rawName || !phone) continue;

          // Keep strictly businesses with NO website at all, or only a social media/WhatsApp link
          const hasRealWebsite = Boolean(website && !isSocialOrDirectoryUrl(website) && !/\.business\.site/i.test(website));
          if (hasRealWebsite) continue;

          const phoneInfo = formatNigerianWhatsApp(phone);
          if (!phoneInfo || seenWaDigits.has(phoneInfo.waDigits)) continue;

          const cleanName = normalizeLead({ business_name: rawName }).business_name;
          if (isEnterpriseOrSkipLead(cleanName, "", website, "Google Places")) continue;

          seenWaDigits.add(phoneInfo.waDigits);
          const city = extractCity(query, address);
          const demoUrl = `https://veltrixhub.ng/${niche.key}`;
          const waUrl = buildWhatsAppPitchUrl({
            business_name: cleanName,
            niche: niche.key,
            city,
            demo_url: demoUrl,
            whatsapp_number: phoneInfo.waDigits,
          });

          const doc = {
            business_name: cleanName,
            businessName: cleanName,
            contact_name: "Team",
            phone: phoneInfo.display,
            whatsapp_digits: phoneInfo.waDigits,
            whatsapp_number: phoneInfo.display,
            wa_link: waUrl,
            email: "",
            niche: niche.key,
            industry: niche.key,
            city,
            address,
            website_url: website,
            hasWebsite: false,
            demo_url: demoUrl,
            pitch_track: "no_website",
            audit_status: website ? `Social/Directory only (${website})` : "No Website Listed on Google Maps",
            status: "whatsapp_ready",
            is_deliverable: false,
            source: "Google Places (No Website - WhatsApp Ready)",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          await col.updateOne(
            { whatsapp_digits: phoneInfo.waDigits },
            { $set: doc },
            { upsert: true }
          );

          addedNew++;
          nicheAdded++;
          console.log(`  [WA #${addedNew}] ${cleanName} | ${phoneInfo.display} | ${niche.key} | ${city}`);
        }
      } catch (err) {
        console.warn(`Query notice for "${query}": ${err.message}`);
      }
    }
  }

  // 4. Clean any enterprise/public entities or real-website false positives from whatsapp_ready before export
  const preReady = await col
    .find({ status: { $in: ["whatsapp_ready", "whatsapp_sent"] }, whatsapp_digits: { $exists: true, $ne: "" } })
    .sort({ updatedAt: -1 })
    .toArray();

  const readyWaLeads = [];
  for (const l of preReady) {
    const cname = normalizeLead({ business_name: l.business_name || l.businessName }).business_name;
    const web = (l.website_url || "").trim();
    const hasOwnedWebsite = Boolean(web && !isSocialOrDirectoryUrl(web) && !/\.business\.site/i.test(web));

    if (hasOwnedWebsite) {
      await col.updateOne(
        { _id: l._id },
        { $set: { status: "skipped_has_website", hasWebsite: true, is_deliverable: false } }
      );
      continue;
    }
    if (isEnterpriseOrSkipLead(cname, l.email || "", web, l.source || "")) {
      await col.updateOne({ _id: l._id }, { $set: { status: "skipped_enterprise", is_deliverable: false } });
      continue;
    }
    readyWaLeads.push({ ...l, business_name: cname });
  }

  const header = "business_name,niche,city,whatsapp_number,wa_link,demo_url,audit_status,status,address\n";
  const rows = readyWaLeads
    .map((l) =>
      [
        escapeCsv(l.business_name || l.businessName),
        escapeCsv(l.niche),
        escapeCsv(l.city || "Lagos"),
        escapeCsv(l.whatsapp_number || l.phone),
        escapeCsv(l.wa_link || buildWhatsAppPitchUrl(l)),
        escapeCsv(l.demo_url),
        escapeCsv(l.audit_status || "No Website Listed"),
        escapeCsv(l.status),
        escapeCsv(l.address || ""),
      ].join(",")
    )
    .join("\n");

  fs.writeFileSync(WA_CSV_PATH, header + rows, "utf8");

  console.log("\n=======================================================");
  console.log(`WHATSAPP HARVEST COMPLETE: +${addedNew} new no-website service SMEs, ${bulkOps.length} standardized.`);
  console.log(`TOTAL READY IN WHATSAPP QUEUE: ${readyWaLeads.length}`);
  console.log(`Exported CSV: ${WA_CSV_PATH}`);
  console.log("=======================================================");

  await client.close();
}

main().catch((err) => {
  console.error("WhatsApp harvest error:", err);
  process.exit(1);
});
