import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import dns from "dns/promises";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  normalizeLead,
  generatePitchContent,
  isEnterpriseOrSkipLead,
} from "../api/_outreachCore.js";

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

/* Pitch generation imported from ../api/_outreachCore.js (generatePitchContent) */

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
  const isDryRun = process.argv.includes("--dry-run");
  logLine("==================================================");
  logLine(
    `VELTRIX HUB AUTOMATED 2:00 PM PITCHING BATCH ENGINE${isDryRun ? " (DRY-RUN)" : ""}`
  );
  logLine("==================================================");

  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  const db = client.db(DB_NAME);
  const leadsCol = db.collection(LEADS_COLLECTION);
  const stateCol = db.collection(STATE_COLLECTION);

  if (!isDryRun) {
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
  }

  const todayPrefix = new Date().toISOString().split("T")[0];
  const sentTodayCount = await leadsCol.countDocuments({
    status: "sent",
    sent_at: { $regex: `^${todayPrefix}` },
  });

  logLine(`Today's dispatched count: ${sentTodayCount} / ${TOTAL_DAILY_LIMIT}`);

  if (!isDryRun && sentTodayCount >= TOTAL_DAILY_LIMIT) {
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

  // Query pending leads with deliverability and SME filtering guarantee
  const query = {
    email: { $exists: true, $nin: [null, ""] },
    status: { $nin: ["sent", "followup_sent", "invalid_domain", "invalid_format", "skipped_enterprise", "skipped_duplicate"] },
    is_deliverable: { $ne: false },
  };

  const pendingLeads = await leadsCol.find(query).limit(remainingQuota).toArray();
  logLine(`Found ${pendingLeads.length} deliverable pending leads ready in queue.`);

  if (pendingLeads.length === 0) {
    logLine("No pending leads left to dispatch in database. Outreach queue complete.");
    if (!isDryRun) {
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
    }
    await client.close();
    return;
  }

  let totalDispatched = 0;
  let totalShieldBlocked = 0;
  let totalEnterpriseSkipped = 0;

  for (let i = 0; i < pendingLeads.length; i++) {
    const rawLead = pendingLeads[i];
    const lead = normalizeLead(rawLead);
    const recipient = lead.email;

    // 0. Enterprise Guard (Avoid pitching major PLCs/corporations with SME templates)
    if (isEnterpriseOrSkipLead(lead.business_name, recipient, lead.website_url, rawLead.source)) {
      logLine(`[ENTERPRISE SKIPPED] ${lead.business_name} <${recipient}>: Excluded from SME outreach.`);
      totalEnterpriseSkipped++;
      if (!isDryRun) {
        await leadsCol.updateOne(
          { _id: rawLead._id },
          {
            $set: {
              status: "skipped_enterprise",
              is_deliverable: false,
              fail_reason: "Excluded by SME Enterprise Filter",
              verified_at: new Date().toISOString(),
            },
          }
        );
      }
      continue;
    }

    // 1. Live DNS MX verification shield (Zero bounce guarantee)
    const mx = await verifyDomainMx(recipient);
    if (!mx.valid) {
      logLine(`[MX SHIELD BLOCKED] ${recipient}: ${mx.reason}. Skipped to protect sender reputation.`);
      totalShieldBlocked++;
      if (!isDryRun) {
        await leadsCol.updateOne(
          { _id: rawLead._id },
          {
            $set: {
              status: "invalid_domain",
              is_deliverable: false,
              fail_reason: mx.reason,
              verified_at: new Date().toISOString(),
            },
          }
        );
      }
      continue;
    }

    // 2. Select rotating sender (Kayode, Christopher, William) & Dual-Track Pitch
    const sender = SENDERS[(sentTodayCount + totalDispatched) % SENDERS.length];
    const { subject, plainText, htmlText, pitchTrack } = generatePitchContent(lead, sender);

    if (isDryRun) {
      totalDispatched++;
      logLine(`[DRY-RUN #${totalDispatched}] track=${pitchTrack} | to=${recipient} (${lead.business_name}) | subject="${subject}"`);
      if (totalDispatched <= 3) {
        logLine(`--- Preview (${pitchTrack}) ---\n${plainText.split("\n").slice(0, 7).join("\n")}\n...`);
      }
      continue;
    }

    const transporter = getTransporter(sender.email);

    const stepLabel = `[${sentTodayCount + totalDispatched + 1}/${TOTAL_DAILY_LIMIT}]`;
    logLine(`${stepLabel} [${pitchTrack}] Sending via ${sender.firstName} to ${recipient} (${lead.business_name})...`);

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
        { _id: rawLead._id },
        {
          $set: {
            status: "sent",
            sent_at: nowIso,
            sent_by: sender.email,
            sender_id: sender.id,
            pitch_track: pitchTrack,
            last_subject: subject,
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
        { _id: rawLead._id },
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
  logLine(
    `BATCH COMPLETE: ${totalDispatched} ${isDryRun ? "previewed" : "dispatched"}, ${totalShieldBlocked} MX-shield blocked, ${totalEnterpriseSkipped} enterprise skipped.`
  );
  logLine("==================================================");

  if (!isDryRun) {
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
  }

  await client.close();
}

runPitchingBatch().catch((err) => {
  logLine(`Fatal error in pitching batch runner: ${err.message}`);
  process.exit(1);
});
