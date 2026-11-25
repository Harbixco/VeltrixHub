import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import dns from "dns/promises";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://agbajeabiodunkay_db_user:8sh9sZDp89t6sBkU@veltrix-leads.plfrnll.mongodb.net/veltrix_leads?retryWrites=true&w=majority";
const DB_NAME = "veltrix_leads";
const LEADS_COLLECTION = "leads";
const STATE_COLLECTION = "outreach_state";
const CSV_PATH = path.join(__dirname, "leads_veltrixhub.csv");
const LOG_PATH = path.join(__dirname, "pitching_batch.log");

const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD || "Face123@@book@@";

const SENDERS = [
  {
    id: "kayode",
    name: "Kayode | Veltrix Hub",
    email: "kayode@veltrixhub.ng",
    firstName: "Kayode",
    dailyLimit: 25,
  },
  {
    id: "christopher",
    name: "Christopher | Veltrix Hub",
    email: "christopher@veltrixhub.ng",
    firstName: "Christopher",
    dailyLimit: 25,
  },
  {
    id: "william",
    name: "William | Veltrix Hub",
    email: "william@veltrixhub.ng",
    firstName: "William",
    dailyLimit: 25,
  },
];

const TOTAL_DAILY_LIMIT = 75;

function logLine(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try {
    fs.appendFileSync(LOG_PATH, `${line}\n`, "utf8");
  } catch {}
}

const mxCache = new Map();
async function verifyDomainMx(email) {
  if (!email || !email.includes("@")) {
    return { valid: false, reason: "Malformed email format" };
  }
  const domain = email.split("@")[1].toLowerCase().trim();
  if (mxCache.has(domain)) return mxCache.get(domain);

  try {
    const mx = await dns.resolveMx(domain).catch(() => null);
    if (mx && Array.isArray(mx) && mx.length > 0) {
      const res = { valid: true, domain, mxHost: mx[0].exchange };
      mxCache.set(domain, res);
      return res;
    }
    const res = { valid: false, domain, reason: `DNS NXDOMAIN: ${domain} has no mail exchange record` };
    mxCache.set(domain, res);
    return res;
  } catch (err) {
    const res = { valid: false, domain, reason: `DNS failure for ${domain}: ${err.code || err.message}` };
    mxCache.set(domain, res);
    return res;
  }
}

const transporterCache = new Map();
function getTransporter(senderEmail) {
  if (!transporterCache.has(senderEmail)) {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: ZOHO_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    transporterCache.set(senderEmail, transporter);
  }
  return transporterCache.get(senderEmail);
}

function generatePitch(lead, sender) {
  const businessName = (lead.company || lead.business_name || "Your Business").trim();
  const contactName = (lead.contact_person || lead.contact_name || "").trim();
  const city = (lead.city || "Lagos").trim();
  const niche = (lead.niche || "business").trim();
  let demoUrl = (lead.demo_url || `https://veltrixhub.ng/${niche}`).trim();
  if (!demoUrl.startsWith("http")) demoUrl = `https://veltrixhub.ng/${niche}`;

  const recipientEmail = (lead.email || "").toLowerCase().trim();
  const greeting = contactName ? `Hello ${contactName},` : `Hello ${businessName} Team,`;

  const subjects = [
    `Helping customers in ${city} find ${businessName} on WhatsApp & Google`,
    `Quick question regarding ${businessName}'s customer website`,
    `A high-converting customer website ready for ${businessName}`,
  ];
  const subject = subjects[(recipientEmail.length + businessName.length) % subjects.length];

  const encEmail = encodeURIComponent(recipientEmail);
  const encBiz = encodeURIComponent(businessName);
  const encDemo = encodeURIComponent(demoUrl);

  const trackingPixelUrl = `https://www.veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&action=open`;
  const trackedDemoUrl = `https://www.veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&url=${encDemo}&action=click`;

  const plainText = `${greeting}

I came across ${businessName} while researching top ${niche} businesses in ${city}.

In today's market, most clients in ${city} search for ${niche} services on their mobile phones before deciding who to trust. Without a fast, mobile-friendly website that connects directly to your WhatsApp, potential customers often end up booking with competitors.

We have built a live demonstration website tailored specifically for your industry:
Demo: ${demoUrl}

What this brings to ${businessName}:
1. Direct WhatsApp Ordering: Customers click one button and chat directly with your sales team.
2. Verified Credibility: Prominent CAC registration and customer trust badges that reassure first-time buyers.
3. Fast Turnaround: Completely custom-tailored and live for your business within 3 to 5 business days.

Would you be open to a brief 5-minute chat on WhatsApp or a short phone call this week to see how this can drive more paying clients to ${businessName}?

Best regards,

${sender.name}
Digital Growth Partner | Veltrix Hub
WhatsApp / Phone: +234 808 709 8270
Website: https://veltrixhub.ng
Email: info@veltrixhub.ng
`;

  const htmlText = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>${greeting}</p>
  <p>I came across <strong>${businessName}</strong> while researching established ${niche} services in ${city}.</p>
  <p>In today's market, most clients in ${city} search for ${niche} services on their phones before deciding who to patronize. Without a fast, mobile-friendly website that links straight to your WhatsApp, potential customers often book with competitors.</p>
  <p>We built a live demonstration website tailored specifically for your industry:</p>
  <p style="margin: 24px 0;">
    <a href="${trackedDemoUrl}" style="display: inline-block; background-color: #050f2c; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">View Live Demonstration &rarr;</a>
  </p>
  <p><strong>What this brings to ${businessName}:</strong></p>
  <ul style="padding-left: 20px;">
    <li><strong>Direct WhatsApp Conversion:</strong> Customers click one button and message your team directly.</li>
    <li><strong>Verified Credibility:</strong> Clear trust indicators and CAC registration signals that give new clients full confidence.</li>
    <li><strong>Fast Delivery:</strong> Custom-tailored and live for your business within 3 to 5 business days.</li>
  </ul>
  <p>Would you be open to a brief 5-minute chat on WhatsApp or a short phone call this week to see how this can bring more paying customers to ${businessName}?</p>
  <p style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
    <strong>${sender.name}</strong><br>
    Growth Team | Veltrix Hub<br>
    WhatsApp / Phone: <a href="https://wa.me/2348087098270" style="color: #2563eb;">+234 808 709 8270</a><br>
    Website: <a href="https://veltrixhub.ng" style="color: #2563eb;">https://veltrixhub.ng</a>
  </p>
  <img src="${trackingPixelUrl}" width="1" height="1" alt="" style="display:none;width:1px;height:1px;max-height:1px;max-width:1px;opacity:0;border:none;outline:none;" />
</body>
</html>`;

  return { subject, plainText, htmlText };
}

async function syncCsv(db) {
  try {
    const allLeads = await db.collection(LEADS_COLLECTION).find({}).toArray();
    const csvHeader = "business_name,contact_name,email,niche,city,demo_url,status,sent_at,sent_by\n";
    const csvRows = allLeads.map((l) => {
      const escape = (val) => {
        if (!val) return "";
        const str = String(val);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };
      return [
        escape(l.company || l.business_name),
        escape(l.contact_person || l.contact_name || "The Managing Director"),
        escape(l.email),
        escape(l.niche),
        escape(l.city),
        escape(l.demo_url || `https://veltrixhub.ng/${l.niche}`),
        escape(l.status),
        escape(l.sent_at || ""),
        escape(l.sent_by || ""),
      ].join(",");
    }).join("\n");

    fs.writeFileSync(CSV_PATH, csvHeader + csvRows, "utf8");
    logLine(`Synced ${allLeads.length} leads to leads_veltrixhub.csv`);
  } catch (err) {
    logLine(`Notice syncing CSV: ${err.message}`);
  }
}

async function runPitchingBatch() {
  logLine("==================================================");
  logLine("VELTRIX HUB AUTOMATED 2:00 PM PITCHING BATCH ENGINE");
  logLine("==================================================");

  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  const db = client.db(DB_NAME);
  const leadsCol = db.collection(LEADS_COLLECTION);
  const stateCol = db.collection(STATE_COLLECTION);

  // Mark engine running in state doc
  await stateCol.updateOne(
    { _id: "current_state" },
    {
      $set: {
        isRunning: true,
        statusDetail: "Automated 2:00 PM batch in progress: checking limits and pending leads...",
        lastActivity: new Date(),
      },
    },
    { upsert: true }
  );

  const todayPrefix = new Date().toISOString().split("T")[0];
  const sentTodayCount = await leadsCol.countDocuments({
    status: "sent",
    sent_at: { $regex: `^${todayPrefix}` },
  });

  logLine(`Today's dispatched count: ${sentTodayCount} / ${TOTAL_DAILY_LIMIT}`);

  if (sentTodayCount >= TOTAL_DAILY_LIMIT) {
    logLine(`Daily safety ceiling of ${TOTAL_DAILY_LIMIT} emails already met for ${todayPrefix}. Batch complete.`);
    await stateCol.updateOne(
      { _id: "current_state" },
      {
        $set: {
          isRunning: false,
          statusDetail: `Daily safety limit reached (${TOTAL_DAILY_LIMIT} sent today). Engine resting.`,
          lastActivity: new Date(),
        },
      }
    );
    await client.close();
    return;
  }

  const remainingQuota = TOTAL_DAILY_LIMIT - sentTodayCount;
  logLine(`Quota remaining for today's batch: ${remainingQuota} emails`);

  // Query pending leads with deliverability guarantee
  const query = {
    email: { $exists: true, $nin: [null, ""] },
    status: { $nin: ["sent", "followup_sent", "invalid_domain", "invalid_format"] },
    is_deliverable: { $ne: false },
  };

  const pendingLeads = await leadsCol.find(query).limit(remainingQuota).toArray();
  logLine(`Found ${pendingLeads.length} deliverable pending leads ready in queue.`);

  if (pendingLeads.length === 0) {
    logLine("No pending leads left to dispatch in database. Outreach queue complete.");
    await stateCol.updateOne(
      { _id: "current_state" },
      {
        $set: {
          isRunning: false,
          statusDetail: "All pending leads pitched! Queue is clear.",
          lastActivity: new Date(),
        },
      }
    );
    await client.close();
    return;
  }

  let totalDispatched = 0;
  let totalShieldBlocked = 0;

  for (let i = 0; i < pendingLeads.length; i++) {
    const lead = pendingLeads[i];
    const recipient = (lead.email || "").trim();

    // 1. Live DNS MX verification shield (Zero bounce guarantee)
    const mx = await verifyDomainMx(recipient);
    if (!mx.valid) {
      logLine(`[MX SHIELD BLOCKED] ${recipient}: ${mx.reason}. Skipped to protect sender reputation.`);
      totalShieldBlocked++;
      await leadsCol.updateOne(
        { _id: lead._id },
        {
          $set: {
            status: "invalid_domain",
            is_deliverable: false,
            fail_reason: mx.reason,
            verified_at: new Date().toISOString(),
          },
        }
      );
      continue;
    }

    // 2. Select rotating sender (Kayode, Christopher, William)
    const sender = SENDERS[(sentTodayCount + totalDispatched) % SENDERS.length];
    const { subject, plainText, htmlText } = generatePitch(lead, sender);
    const transporter = getTransporter(sender.email);

    const stepLabel = `[${sentTodayCount + totalDispatched + 1}/${TOTAL_DAILY_LIMIT}]`;
    logLine(`${stepLabel} Sending via ${sender.firstName} to ${recipient} (${lead.company || lead.business_name})...`);

    try {
      await transporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to: recipient,
        replyTo: "kayode@veltrixhub.ng",
        subject,
        text: plainText,
        html: htmlText,
      });

      const nowIso = new Date().toISOString();
      await leadsCol.updateOne(
        { _id: lead._id },
        {
          $set: {
            status: "sent",
            sent_at: nowIso,
            sent_by: sender.email,
            sender_id: sender.id,
            verified_mx: mx.mxHost || true,
          },
        }
      );

      totalDispatched++;
      logLine(`-> Delivered successfully via ${sender.email}.`);

      // Update state for live UI tracking
      await stateCol.updateOne(
        { _id: "current_state" },
        {
          $set: {
            isRunning: true,
            currentStep: `${sentTodayCount + totalDispatched}/${TOTAL_DAILY_LIMIT}`,
            currentSender: sender.name,
            currentRecipient: recipient,
            statusDetail: `Dispatched ${sentTodayCount + totalDispatched}/${TOTAL_DAILY_LIMIT} pitches via rotating Zoho mailboxes.`,
            lastActivity: new Date(),
          },
        }
      );

      // Human-like cadence delay (2 seconds)
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      logLine(`-> Send failed for ${recipient}: ${err.message}`);
      await leadsCol.updateOne(
        { _id: lead._id },
        {
          $set: {
            status: "failed",
            error: err.message,
            failed_at: new Date().toISOString(),
          },
        }
      );
    }
  }

  logLine("==================================================");
  logLine(`BATCH COMPLETE: ${totalDispatched} dispatched, ${totalShieldBlocked} MX-shield blocked.`);
  logLine("==================================================");

  // Sync CSV and update final state
  await syncCsv(db);
  await stateCol.updateOne(
    { _id: "current_state" },
    {
      $set: {
        isRunning: false,
        statusDetail: `2:00 PM batch finished: sent ${totalDispatched} pitches today (${sentTodayCount + totalDispatched}/${TOTAL_DAILY_LIMIT}).`,
        lastActivity: new Date(),
      },
    }
  );

  await client.close();
}

runPitchingBatch().catch((err) => {
  logLine(`Fatal error in pitching batch runner: ${err.message}`);
  process.exit(1);
});
