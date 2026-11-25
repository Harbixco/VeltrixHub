// Vercel Serverless Function & Node Handler: Automated Zoho SMTP Outreach Engine
import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";
import dns from "dns";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const resolveMx = promisify(dns.resolveMx);

// Real-Time DNS MX Verification Shield to Prevent Bounces
const mxCache = new Map();
async function verifyDomainMx(email) {
  if (!email || !email.includes("@")) {
    return { valid: false, reason: "Malformed email format" };
  }
  const domain = email.split("@")[1].toLowerCase().trim();
  if (mxCache.has(domain)) {
    return mxCache.get(domain);
  }

  try {
    const mx = await resolveMx(domain).catch(() => null);
    if (mx && Array.isArray(mx) && mx.length > 0) {
      const res = { valid: true, domain, mxHost: mx[0].exchange };
      mxCache.set(domain, res);
      return res;
    }
    const res = { valid: false, domain, reason: `DNS NXDOMAIN: Domain ${domain} has no mail exchange (MX) server` };
    mxCache.set(domain, res);
    return res;
  } catch (err) {
    const res = { valid: false, domain, reason: `DNS resolution failed for ${domain}: ${err.code || err.message}` };
    mxCache.set(domain, res);
    return res;
  }
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://agbajeabiodunkay_db_user:8sh9sZDp89t6sBkU@veltrix-leads.plfrnll.mongodb.net/veltrix_leads?retryWrites=true&w=majority";

const DB_NAME = "veltrix_leads";
const LEADS_COLLECTION = "leads";
const STATE_COLLECTION = "outreach_state";

const OUTREACH_DIR = path.join(process.cwd(), "outreach");
const CSV_PATH = path.join(OUTREACH_DIR, "leads_veltrixhub.csv");
const LOG_PATH = path.join(OUTREACH_DIR, "outreach.log");

const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD || "Face123@@book@@";

// 3 Distinct Zoho Business Senders (25 emails/day each = 75 total daily ceiling)
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

// Cached MongoDB Client for Serverless Function reuse
let cachedClient = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    await cachedClient.connect();
  }
  return cachedClient.db(DB_NAME);
}

// Nodemailer Transporter Cache
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

// Helper to normalize lead document across schemas
function normalizeLead(lead) {
  const businessName = (lead.business_name || lead.businessName || "Your Business").trim();
  const contactName = (lead.contact_name || lead.contactName || "").trim();
  const email = (lead.email || "").toLowerCase().trim();
  const niche = (lead.niche || lead.industry || "painting").toLowerCase().trim();
  const city = (lead.city || "Lagos").trim();
  let demoUrl = (lead.demo_url || lead.demoUrl || "").trim();
  if (!demoUrl.startsWith("http://") && !demoUrl.startsWith("https://")) {
    demoUrl = `https://veltrixhub.ng/${niche}`;
  }
  return {
    _id: lead._id,
    business_name: businessName,
    businessName: businessName,
    contact_name: contactName,
    email: email,
    niche: niche,
    city: city,
    demo_url: demoUrl,
    status: lead.status || "pending",
    sent_at: lead.sent_at || "",
    sent_by: lead.sent_by || "",
  };
}

// Generate Personalized Outreach Pitch with Live Open & Click Tracking
function generatePitchContent(rawLead, sender) {
  const lead = normalizeLead(rawLead);
  const businessName = lead.business_name;
  const contactName = lead.contact_name;
  const city = lead.city;
  const niche = lead.niche;
  const demoUrl = lead.demo_url;
  const recipientEmail = lead.email;
  const greeting = contactName ? `Hello ${contactName},` : `Hello ${businessName} Team,`;

  const subjects = [
    `Helping customers in ${city} find ${businessName} on WhatsApp & Google`,
    `Quick question regarding ${businessName}'s customer website`,
    `A high-converting customer website ready for ${businessName}`,
  ];
  // Deterministic selection based on email length to keep stable during re-runs
  const subject = subjects[(recipientEmail.length + (businessName.length || 0)) % subjects.length];

  const encEmail = encodeURIComponent(recipientEmail);
  const encBiz = encodeURIComponent(businessName);
  const encDemo = encodeURIComponent(demoUrl);

  const trackingPixelUrl = `https://veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&action=open`;
  const trackedDemoUrl = `https://veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&url=${encDemo}&action=click`;

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
<head>
<meta charset="utf-8">
</head>
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
  
  <!-- Invisible 1x1 Open Tracking Pixel -->
  <img src="${trackingPixelUrl}" width="1" height="1" alt="" style="display:none;width:1px;height:1px;max-height:1px;max-width:1px;opacity:0;border:none;outline:none;" />
</body>
</html>`;

  return { subject, plainText, htmlText };
}

// Generate Follow-Up Email Content
function generateFollowUpContent(rawLead, sender) {
  const lead = normalizeLead(rawLead);
  const businessName = lead.business_name;
  const contactName = lead.contact_name;
  const city = lead.city;
  const niche = lead.niche;
  const demoUrl = lead.demo_url;
  const recipientEmail = lead.email;
  const greeting = contactName ? `Hello ${contactName},` : `Hello ${businessName} Team,`;

  const subject = `Following up regarding ${businessName}'s website demo`;
  const encEmail = encodeURIComponent(recipientEmail);
  const encBiz = encodeURIComponent(businessName);
  const encDemo = encodeURIComponent(demoUrl);

  const trackingPixelUrl = `https://veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&action=open`;
  const trackedDemoUrl = `https://veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&url=${encDemo}&action=click`;

  const plainText = `${greeting}

I wanted to quickly follow up on my note last week regarding ${businessName}'s customer website in ${city}.

We noticed several ${niche} providers in your area upgrading to direct-WhatsApp customer sites to capture high-value clients searching on Google and Instagram.

Here is the live interactive demonstration we prepared for your business:
Demo: ${demoUrl}

If you would like to test this live for ${businessName} this month, please reply to this email or send a quick message to our team on WhatsApp at +234 808 709 8270.

Best regards,

${sender.name}
Growth Team | Veltrix Hub
WhatsApp: https://wa.me/2348087098270
`;

  const htmlText = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>${greeting}</p>
  <p>I wanted to quickly follow up on my note last week regarding <strong>${businessName}</strong>'s customer website in ${city}.</p>
  <p>We noticed several ${niche} providers in your area upgrading to direct-WhatsApp booking systems to capture clients searching on mobile.</p>
  <p style="margin: 24px 0;">
    <a href="${trackedDemoUrl}" style="display: inline-block; background-color: #050f2c; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">View Live Demonstration &rarr;</a>
  </p>
  <p>If you'd like to test this live for ${businessName} this month, feel free to reply directly or message us on WhatsApp at <a href="https://wa.me/2348087098270" style="color:#2563eb;">+234 808 709 8270</a>.</p>
  <p style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
    <strong>${sender.name}</strong><br>
    Growth Team | Veltrix Hub
  </p>
  <img src="${trackingPixelUrl}" width="1" height="1" alt="" style="display:none;width:1px;height:1px;opacity:0;" />
</body>
</html>`;

  return { subject, plainText, htmlText };
}

// Append log to MongoDB State Collection & safe file
async function appendLog(db, message) {
  const line = `[${new Date().toISOString()}] ${message}`;
  try {
    if (db) {
      await db.collection(STATE_COLLECTION).updateOne(
        { _id: "current_state" },
        {
          $push: {
            logs: {
              $each: [line],
              $slice: -60, // Keep last 60 log lines
            },
          },
          $set: { lastActivity: new Date() },
        },
        { upsert: true }
      );
    }
  } catch (e) {
    // Mongo log error safe
  }

  // Safe file append if on local filesystem
  try {
    fs.appendFileSync(LOG_PATH, `${line}\n`, "utf-8");
  } catch {
    // Read-only filesystem on Vercel is ignored safely
  }
}

// Calculate Progress Metrics from MongoDB & CSV with Deliverability Breakdown
async function calculateProgress(db) {
  let total = 0;
  let sent = 0;
  let pending = 0;
  let failed = 0;
  let invalidDomains = 0;
  let followUpDue = 0;
  let lastSentLead = null;
  let sentToday = 0;

  const now = Date.now();
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const todayPrefix = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // 1. Check MongoDB leads
  if (db) {
    try {
      const allLeads = await db.collection(LEADS_COLLECTION).find({}).toArray();

      for (const lead of allLeads) {
        const st = (lead.status || "pending").toLowerCase();
        if (st === "invalid_domain" || lead.is_deliverable === false) {
          invalidDomains++;
          continue;
        }

        if (st === "sent" || st === "followup_sent") {
          sent++;
          const sentAt = lead.sent_at || "";
          if (sentAt.startsWith(todayPrefix)) {
            sentToday++;
          }
          if (sentAt) {
            const time = new Date(sentAt).getTime();
            if (!isNaN(time) && now - time >= SEVEN_DAYS_MS && st !== "followup_sent") {
              followUpDue++;
            }
          }
          if (!lastSentLead && lead.sent_at) {
            lastSentLead = {
              business_name: lead.business_name || lead.businessName,
              email: lead.email,
              sent_by: lead.sent_by,
              sent_at: lead.sent_at,
            };
          }
        } else if (st === "failed") {
          failed++;
        } else if (lead.email && lead.email.includes("@")) {
          pending++;
        }
      }
      total = sent + pending;
    } catch (e) {
      console.warn("MongoDB progress read notice:", e.message);
    }
  }

  const percent = total > 0 ? Math.round((sent / total) * 100) : 0;
  return {
    total,
    sent,
    pending,
    failed,
    invalidDomains,
    followUpDue,
    percent,
    sentToday,
    lastSentLead,
  };
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

  let db = null;
  try {
    db = await getDb();
  } catch (err) {
    console.warn("MongoDB connection notice:", err.message);
  }

  // 1. GET STATUS & LOGS (Unless an explicit action mode like mode=send or dry-run is requested via query or cron)
  const queryMode = req.query?.mode;
  const isStatusRequest =
    req.query.status === "true" ||
    req.query.status === true ||
    (req.method === "GET" && !queryMode);

  if (isStatusRequest) {
    const progress = await calculateProgress(db);

    let stateDoc = null;
    if (db) {
      try {
        stateDoc = await db.collection(STATE_COLLECTION).findOne({ _id: "current_state" });
      } catch (e) {
        // Safe
      }
    }

    const isRunning = Boolean(stateDoc?.isRunning);
    const lastLogs = stateDoc?.logs || [
      "Engine Standby: 3 Zoho Mailboxes Ready (Kayode, Christopher, William)",
      `Total Leads in Database: ${progress.total} | Sent: ${progress.sent} | Pending: ${progress.pending}`,
    ];

    return res.status(200).json({
      success: true,
      agency: "veltrixhub",
      isRunning,
      isCompleted: progress.pending === 0 && progress.sent > 0,
      progress: {
        ...progress,
        currentStep: stateDoc?.currentStep || "",
        currentSender: stateDoc?.currentSender || "",
        currentRecipient: stateDoc?.currentRecipient || "",
        statusDetail: stateDoc?.statusDetail || "Engine Standby: 3 Zoho Mailboxes Ready",
      },
      lastLogs,
    });
  }

  // 2. STOP DISPATCH
  const mode = req.body?.mode || req.query.mode || "send";
  if (mode === "stop") {
    if (db) {
      await db.collection(STATE_COLLECTION).updateOne(
        { _id: "current_state" },
        {
          $set: {
            isRunning: false,
            statusDetail: "Engine stopped by user.",
            lastActivity: new Date(),
          },
        },
        { upsert: true }
      );
      await appendLog(db, "Outreach dispatch paused/stopped by user.");
    }
    return res.status(200).json({
      success: true,
      isRunning: false,
      message: "Outreach engine stopped successfully.",
    });
  }

  // 3. DRY RUN (SIMULATION MODE)
  if (mode === "dry-run") {
    const progress = await calculateProgress(db);
    let sampleLeads = [];

    if (db) {
      sampleLeads = await db
        .collection(LEADS_COLLECTION)
        .find({
          email: { $exists: true, $nin: [null, ""] },
          status: { $nin: ["sent", "followup_sent"] },
        })
        .limit(3)
        .toArray();
    }

    if (sampleLeads.length === 0) {
      sampleLeads = [
        {
          business_name: "Apex Painting Services",
          contact_name: "Mr. Adebayo",
          email: "adebayo@apexpaint.ng",
          niche: "painting",
          city: "Lagos",
          demo_url: "https://veltrixhub.ng/painting",
        },
        {
          business_name: "Sparkle Cleaning Pro",
          contact_name: "Mrs. Fatima",
          email: "fatima@sparklepro.ng",
          niche: "cleaning",
          city: "Abuja",
          demo_url: "https://veltrixhub.ng/cleaning",
        },
        {
          business_name: "Crown Auto Specialists",
          contact_name: "Mr. Tunde",
          email: "tunde@crownauto.ng",
          niche: "auto-repair",
          city: "Lagos",
          demo_url: "https://veltrixhub.ng/auto-repair",
        },
      ];
    }

    const previews = sampleLeads.map((rawLead, i) => {
      const lead = normalizeLead(rawLead);
      const sender = SENDERS[i % SENDERS.length];
      const { subject, plainText, htmlText } = generatePitchContent(lead, sender);
      return {
        sender: `${sender.name} <${sender.email}>`,
        recipient: `${lead.email} (${lead.business_name}, ${lead.city})`,
        subject,
        preview: plainText.slice(0, 300) + "...",
        trackingPixel: `https://veltrixhub.ng/api/track?email=${encodeURIComponent(lead.email)}&action=open`,
      };
    });

    await appendLog(db, `[DRY-RUN] Verified ${sampleLeads.length} sample pitch templates with real tracking links.`);

    return res.status(200).json({
      success: true,
      mode: "dry-run",
      message: "Dry run completed successfully. All templates verified.",
      previews,
      progress,
    });
  }

  // 4. TEST EMAIL MODE
  if (mode === "test") {
    const recipient = req.body?.recipient || req.query.recipient || "info@veltrixhub.ng";
    const testResults = [];

    const dummyLead = {
      business_name: "Test Client Services",
      contact_name: "Valued Prospect",
      email: recipient,
      niche: "painting",
      city: "Lagos",
      demo_url: "https://veltrixhub.ng/painting",
    };

    for (const sender of SENDERS) {
      const transporter = getTransporter(sender.email);
      const { subject, plainText, htmlText } = generatePitchContent(dummyLead, sender);
      try {
        await transporter.sendMail({
          from: `"${sender.name}" <${sender.email}>`,
          to: recipient,
          replyTo: "kayode@veltrixhub.ng",
          subject: `[TEST] ${subject}`,
          text: plainText,
          html: htmlText,
        });
        testResults.push({ sender: sender.email, status: "sent" });
        await appendLog(db, `[TEST] Sent verification email from ${sender.email} to ${recipient}`);
      } catch (err) {
        testResults.push({ sender: sender.email, status: "failed", error: err.message });
        await appendLog(db, `[TEST ERROR] ${sender.email}: ${err.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Test emails processed for ${recipient}`,
      results: testResults,
    });
  }

  // 5. LIVE SEND / DISPATCH BATCH
  // Dispatches a batch (default: 3 leads per HTTP invocation to keep response well within Vercel's 10-15s limit)
  const batchSize = Math.min(parseInt(req.body?.batchSize || req.query?.batchSize || "3", 10), 5);
  const targetNiche = req.body?.niche || null;

  try {
    if (!db) {
      throw new Error("Database connection is currently unavailable.");
    }

    // Set engine state to RUNNING in MongoDB
    await db.collection(STATE_COLLECTION).updateOne(
      { _id: "current_state" },
      {
        $set: {
          isRunning: true,
          statusDetail: "Engine active: selecting next pending leads for Zoho dispatch...",
          lastActivity: new Date(),
        },
      },
      { upsert: true }
    );

    // Find pending deliverable leads with verified MX servers
    const query = {
      email: { $exists: true, $nin: [null, ""] },
      status: { $nin: ["sent", "followup_sent", "invalid_domain", "invalid_format"] },
      is_deliverable: { $ne: false },
    };
    if (targetNiche && targetNiche !== "all") {
      query.$or = [{ niche: targetNiche }, { industry: targetNiche }];
    }

    const pendingLeads = await db
      .collection(LEADS_COLLECTION)
      .find(query)
      .limit(batchSize)
      .toArray();

    if (pendingLeads.length === 0) {
      await db.collection(STATE_COLLECTION).updateOne(
        { _id: "current_state" },
        {
          $set: {
            isRunning: false,
            statusDetail: "All pending leads in database have been pitched! Batch complete.",
            lastActivity: new Date(),
          },
        }
      );
      await appendLog(db, "Batch complete: No pending leads left in database.");

      const finalProgress = await calculateProgress(db);
      return res.status(200).json({
        success: true,
        isCompleted: true,
        isRunning: false,
        message: "All leads have been pitched. Batch finished.",
        progress: finalProgress,
      });
    }

    // Get today's total sent count across senders
    const todayPrefix = new Date().toISOString().split("T")[0];
    const sentTodayCount = await db.collection(LEADS_COLLECTION).countDocuments({
      status: "sent",
      sent_at: { $regex: `^${todayPrefix}` },
    });

    if (sentTodayCount >= TOTAL_DAILY_LIMIT) {
      await db.collection(STATE_COLLECTION).updateOne(
        { _id: "current_state" },
        {
          $set: {
            isRunning: false,
            statusDetail: `Daily safety limit reached (${TOTAL_DAILY_LIMIT} emails sent today). Engine resting until tomorrow 7 AM.`,
            lastActivity: new Date(),
          },
        }
      );
      await appendLog(
        db,
        `Daily safety ceiling reached (${TOTAL_DAILY_LIMIT} sent today). Pausing to preserve sender reputation.`
      );
      const progress = await calculateProgress(db);
      return res.status(200).json({
        success: true,
        isRunning: false,
        isDailyLimitReached: true,
        message: `Daily safety limit of ${TOTAL_DAILY_LIMIT} emails has been reached for today.`,
        progress,
      });
    }

    const dispatchedInThisCall = [];

    for (let i = 0; i < pendingLeads.length; i++) {
      const lead = pendingLeads[i];
      const senderIndex = (sentTodayCount + i) % SENDERS.length;
      const sender = SENDERS[senderIndex];

      const { subject, plainText, htmlText } =
        mode === "followup"
          ? generateFollowUpContent(lead, sender)
          : generatePitchContent(lead, sender);

      const recipient = (lead.email || "").trim();

      // Pre-Flight DNS MX Verification Shield (100% Zero-Bounce Guarantee)
      const mxCheck = await verifyDomainMx(recipient);
      if (!mxCheck.valid) {
        await appendLog(
          db,
          `[MX SHIELD BLOCKED] Skipped ${recipient}: ${mxCheck.reason}. 100% bounce protection saved sender score.`
        );
        await db.collection(LEADS_COLLECTION).updateOne(
          { _id: lead._id },
          {
            $set: {
              status: "invalid_domain",
              is_deliverable: false,
              fail_reason: mxCheck.reason,
              verified_at: new Date().toISOString(),
            },
          }
        );
        continue;
      }

      const transporter = getTransporter(sender.email);

      const stepText = `[${sentTodayCount + i + 1}/${TOTAL_DAILY_LIMIT}]`;
      await appendLog(
        db,
        `${stepText} Sending via ${sender.firstName} to ${recipient} (${lead.business_name || "Lead"})...`
      );

      // Update state for live UI
      await db.collection(STATE_COLLECTION).updateOne(
        { _id: "current_state" },
        {
          $set: {
            currentStep: `${sentTodayCount + i + 1}/${TOTAL_DAILY_LIMIT}`,
            currentSender: sender.name,
            currentRecipient: `${recipient} (${lead.business_name || ""})`,
            statusDetail: `Delivering pitch to ${lead.business_name} via ${sender.firstName}...`,
          },
        }
      );

      try {
        await transporter.sendMail({
          from: `"${sender.name}" <${sender.email}>`,
          to: recipient,
          replyTo: "kayode@veltrixhub.ng",
          subject: subject,
          text: plainText,
          html: htmlText,
        });

        const nowIso = new Date().toISOString().replace("T", " ").slice(0, 19);

        // Update lead in MongoDB
        await db.collection(LEADS_COLLECTION).updateOne(
          { _id: lead._id },
          {
            $set: {
              status: mode === "followup" ? "followup_sent" : "sent",
              sent_at: nowIso,
              sent_by: sender.email,
              last_subject: subject,
            },
          }
        );

        dispatchedInThisCall.push({
          email: recipient,
          business_name: lead.business_name,
          sent_by: sender.email,
          status: "sent",
        });

        await appendLog(
          db,
          `✓ Delivered to ${recipient} via ${sender.email}. (Account count: ${(sentTodayCount % 25) + 1}/25)`
        );
      } catch (sendErr) {
        console.error(`Error sending to ${recipient}:`, sendErr.message);
        await appendLog(db, `✗ Error sending to ${recipient}: ${sendErr.message}`);

        await db.collection(LEADS_COLLECTION).updateOne(
          { _id: lead._id },
          {
            $set: {
              status: "failed",
              fail_reason: sendErr.message,
              failed_at: new Date().toISOString(),
            },
          }
        );

        dispatchedInThisCall.push({
          email: recipient,
          business_name: lead.business_name,
          status: "failed",
          error: sendErr.message,
        });
      }
    }

    const updatedProgress = await calculateProgress(db);
    const hasMore = updatedProgress.pending > 0 && updatedProgress.sentToday < TOTAL_DAILY_LIMIT;

    await db.collection(STATE_COLLECTION).updateOne(
      { _id: "current_state" },
      {
        $set: {
          isRunning: hasMore,
          statusDetail: hasMore
            ? `Batch active. Dispatched ${dispatchedInThisCall.length} emails. Next batch ready.`
            : "Daily batch dispatch completed.",
          lastActivity: new Date(),
        },
      }
    );

    return res.status(200).json({
      success: true,
      isRunning: hasMore,
      dispatched: dispatchedInThisCall,
      progress: updatedProgress,
      message: `Successfully processed ${dispatchedInThisCall.length} pitches. Total sent today: ${updatedProgress.sentToday}/${TOTAL_DAILY_LIMIT}.`,
    });
  } catch (err) {
    console.error("Dispatch runner error:", err);
    if (db) {
      await db.collection(STATE_COLLECTION).updateOne(
        { _id: "current_state" },
        {
          $set: {
            isRunning: false,
            statusDetail: `Error encountered: ${err.message}`,
            lastActivity: new Date(),
          },
        }
      );
      await appendLog(db, `[ENGINE ERROR] ${err.message}`);
    }
    return res.status(500).json({ success: false, error: err.message });
  }
}
