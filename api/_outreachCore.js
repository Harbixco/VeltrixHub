/**
 * Shared Pure-JS Outreach Core for Veltrix Hub.
 * Zero Node-only dependencies so both Vercel/CLI Node runners and the Vite frontend import one source of truth.
 */

export const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
  "zohomail.com",
]);

const SOCIAL_OR_DIRECTORY_HOSTS = [
  "facebook.com",
  "fb.com",
  "instagram.com",
  "wa.me",
  "whatsapp.com",
  "twitter.com",
  "x.com",
  "linkedin.com",
  "tiktok.com",
  "youtube.com",
  "youtu.be",
  "linktr.ee",
  "jiji.ng",
  "nairaland.com",
  "vconnect.com",
  "finelib.com",
  "businessesnigeria.com",
  "businesslist.com.ng",
  "yellowpages",
  "clutch.co",
  "google.com",
];

// Major national conglomerates, PLCs, banks, telcos, and multinationals that should not receive SME pitches
const ENTERPRISE_PATTERNS = [
  /\bplc\b/i,
  /\bmtn\b/i,
  /\bairtel\b/i,
  /\bglobacom\b/i,
  /\bdangote\b/i,
  /\bbua\s+(group|cement|foods)\b/i,
  /\blafarge\b/i,
  /\bunn?ilever\b/i,
  /\bnestle\b/i,
  /\bguinness\b/i,
  /\bnigerian breweries\b/i,
  /\bfirst\s*bank\b/i,
  /\bzenith\s*bank\b/i,
  /\baccess\s*bank\b/i,
  /\bgtbank\b/i,
  /\bguaranty\s*trust\b/i,
  /\bstanbic\b/i,
  /\bsterling\s*bank\b/i,
  /\bfidelity\s*bank\b/i,
  /\bwema\s*bank\b/i,
  /\bpaga\b/i,
  /\bpaystack\b/i,
  /\bflutterwave\b/i,
  /\binterswitch\b/i,
  /\bopay\b/i,
  /\bkonga\b/i,
  /\bjumia\b/i,
  /\bjulius[\s-]*berger\b/i,
  /\bcappa\s*(and|&)\s*d'?alberto\b/i,
  /\bsetraco\b/i,
  /\breynolds\s*construction\b/i,
  /\brccnigeria\b/i,
  /\bdantata\s*(&|and)\s*sawoe\b/i,
  /\bitb\s*nigeria\b/i,
  /\bberger\s*paints\b/i,
  /\bcapplc\b/i,
  /\bdulux\b/i,
  /\bmeyer\s*paints\b/i,
  /\bportland\s*paints\b/i,
  /\baluko\s*(&|and)\s*oyebode\b/i,
  /\bbanwo\s*(&|and)\s*ighodalo\b/i,
  /\bolaniwun\s*ajayi\b/i,
  /\btemplars\b/i,
  /\bg\.\s*elias\b/i,
  /\baelex\b/i,
  /\bdetail\s*commercial\b/i,
  /\budo\s*udoma\b/i,
  /\brentokil\b/i,
  /\bcoscharis\b/i,
  /\brt\s*briscoe\b/i,
  /\barnergy\b/i,
  /\bdaystar\s*power\b/i,
  /\bstarsight\s*energy\b/i,
  /\bslot\s*systems\b/i,
  /\bpointek\b/i,
  /\bkara\s*nigeria\b/i,
  /\bessenza\b/i,
  /\bmontaigne\s*place\b/i,
  /\btiffany\s*amber\b/i,
  /\b(mai\s+)?atafo\b/i,
  /\blisa\s*folawiyo\b/i,
  /\borange\s*culture\b/i,
  /\bdavid\s*wej\b/i,
  /\bpwc\b/i,
  /\bkpmg\b/i,
  /\bdeloitte\b/i,
  /\bmckinsey\b/i,
  /\btotalenergies\b/i,
  /\bchevron\b/i,
  /\bshell\b/i,
  /\bseplat\b/i,
  /\boando\b/i,
  /\barab\s*contractors\b/i,
  /\barabcont\b/i,
  /\bccecc\b/i,
  /\bhi[\s-]*tech\s*construction\b/i,
  /\bmothercat\b/i,
  /\btier\s*1\b/i,
  /\bjackson[\s,]*etti\b/i,
  /\bbabalakin\b/i,
  /\bpunuka\b/i,
  /\bchemstar\b/i,
  /\bfinecoat\b/i,
  /\bsmile\s*360\b/i,
  /\belektron\s*energy\b/i,
  /\bsolynta\b/i,
];

const ENTERPRISE_DOMAINS = [
  "julius-berger.com",
  "cappadalberto.com",
  "setraco.net",
  "rccnigeria.com",
  "dantata-sawoe.com",
  "itbng.com",
  "bergerpaintnig.com",
  "capplc.com",
  "meyerpaints.com",
  "portlandpaintsng.com",
  "aluko-oyebode.com",
  "banwo-ighodalo.com",
  "olaniwunajayi.net",
  "templars-law.com",
  "gelias.com",
  "aelex.com",
  "detailsolicitors.com",
  "rentokil-initial.com",
  "coscharisgroup.net",
  "rtbriscoe.com",
  "arnergy.com",
  "daystar-power.com",
  "starsightenergy.com",
  "slot.ng",
  "pointekonline.com",
  "kara.com.ng",
  "essenza.ng",
  "montaigneplace.com",
  "tiffanyamberng.com",
  "atafo.com",
  "lisafolawiyo.com",
  "orangeculture.com.ng",
  "davidwej.com",
];

const SKIP_EMAIL_DOMAINS = new Set([
  "wixpress.com",
  "sentry.io",
  "example.com",
  "domain.com",
  "yourdomain.com",
  "mysite.com",
  "email.com",
  "website.com",
  "yoursite.com",
  "wordpress.org",
  "wordpress.com",
  "wixsite.com",
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "twitter.com",
  "github.com",
  "cloudflare.com",
  "gravatar.com",
  "google.com",
  "jiji.ng",
]);

const NICHE_LABELS = {
  contractor: "construction and contracting",
  painting: "painting and finishing",
  cleaning: "commercial cleaning",
  "auto-repair": "auto repair and diagnostics",
  "dental-care": "dental care",
  "personal-injury": "legal and advisory",
  electrical: "electrical and solar engineering",
  "pest-control": "pest control and fumigation",
  fashion: "fashion and retail",
  perfumes: "fragrance and retail",
  "tech-gadgets": "tech and gadget retail",
};

/** Returns readable industry phrase for a niche slug. */
export function getNicheDisplayLabel(niche) {
  const key = (niche || "").toLowerCase().trim();
  return NICHE_LABELS[key] || (key ? key.replace(/-/g, " ") : "service");
}

/** Returns true when email uses a public free webmail domain rather than a custom business domain. */
export function isFreeEmailDomain(email) {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1].toLowerCase().trim();
  return FREE_EMAIL_DOMAINS.has(domain);
}

/** Returns true when URL points to social media, WhatsApp, or a third-party directory instead of an owned site. */
export function isSocialOrDirectoryUrl(url) {
  if (!url || typeof url !== "string") return false;
  const low = url.toLowerCase();
  return SOCIAL_OR_DIRECTORY_HOSTS.some((host) => low.includes(host));
}

/** Cleans and validates extracted email syntax, filtering framework and image artifacts. */
export function cleanEmail(raw) {
  if (!raw || typeof raw !== "string") return null;
  const e = raw.trim().replace(/^mailto:/i, "").split("?")[0].replace(/[.,;:)'"]+$/, "").toLowerCase();

  const badExts = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".css", ".js", ".map", ".ico", ".woff", ".ttf", ".pdf"];
  if (badExts.some((ext) => e.endsWith(ext))) return null;

  const badTerms = [
    "wixpress",
    "sentry",
    "example",
    "schema",
    "wordpress",
    "domain.com",
    "yourdomain",
    "mysite",
    "your@email",
    "name@email",
    "test@test",
    "user@website",
    "react",
    "webpack",
    "babel",
    "polyfill",
    "segmenter",
    "bundle",
    "lodash",
    "rspack",
    "core-js",
    "node_modules",
    "npm",
    "jsdelivr",
    "unpkg",
    "github",
    "cloudflare",
    "gravatar",
    "akamai",
    "noreply",
    "no-reply",
    "donotreply",
    "mailer-daemon",
    "postmaster@",
    "abuse@",
  ];
  if (badTerms.some((t) => e.includes(t))) return null;

  const parts = e.split("@");
  if (parts.length !== 2) return null;

  const [user, domain] = parts;
  if (!user || user.length > 64 || !domain || domain.length > 120) return null;
  if (/^[\d._-]/.test(domain)) return null;
  if (SKIP_EMAIL_DOMAINS.has(domain)) return null;
  if (domain.endsWith(".gov.ng") || domain.endsWith(".edu.ng")) return null;

  const tld = domain.split(".").pop();
  if (!tld || !/^[a-z]{2,}$/.test(tld)) return null;

  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(e)) return null;

  return e;
}

/** Identifies giant PLCs, multinationals, banks, and curated enterprise entries that do not fit SME website outreach. */
export function isEnterpriseOrSkipLead(bizName = "", email = "", websiteUrl = "", source = "") {
  const name = String(bizName || "").trim();
  const em = String(email || "").toLowerCase().trim();
  const domain = em.includes("@") ? em.split("@")[1] : "";

  if (ENTERPRISE_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) {
    return true;
  }
  if (ENTERPRISE_PATTERNS.some((rx) => rx.test(name) || rx.test(domain))) {
    return true;
  }
  if (websiteUrl && isSocialOrDirectoryUrl(websiteUrl) && domain && SKIP_EMAIL_DOMAINS.has(domain)) {
    return true;
  }
  if (String(source || "").includes("Verified Nigerian Enterprise Directory")) {
    return true;
  }
  return false;
}

/**
 * Audits an existing website HTML payload for concrete mobile and conversion gaps.
 * Returns { isQualified, isBrokenOrDead, reasons, auditSummary }.
 */
export function auditWebsiteHtml(websiteUrl = "", html = "", fetchError = "") {
  const reasons = [];
  const cleanUrl = String(websiteUrl || "").trim();
  const body = String(html || "");

  if (/\.business\.site/i.test(cleanUrl)) {
    reasons.push("Relies on a discontinued Google Business Site link instead of an owned domain");
    return { isQualified: true, isBrokenOrDead: true, reasons, auditSummary: reasons.join("; ") };
  }

  if (fetchError || body.length < 150) {
    reasons.push("Website is slow, timing out, or currently unreachable");
    return { isQualified: true, isBrokenOrDead: true, reasons, auditSummary: reasons.join("; ") };
  }

  if (/^http:\/\//i.test(cleanUrl)) {
    reasons.push("Missing HTTPS SSL encryption (browsers warn visitors 'Not Secure')");
  }

  const hasViewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(body);
  if (!hasViewport) {
    reasons.push("Not optimized for mobile screens (missing responsive viewport setup)");
  }

  const hasWhatsappCta = /(wa\.me|api\.whatsapp\.com|whatsapp\.com\/send|whatsapp:|chaty|joinchat|wp-whatsapp|floating-wpp)/i.test(
    body
  );
  if (!hasWhatsappCta) {
    reasons.push("No direct 1-click WhatsApp quote or chat hook for mobile visitors");
  }

  const copyrightMatch = body.match(/(?:©|copyright|&copy;)\s*(?:20\d\d\s*[-–]\s*)?(20\d\d)/i);
  if (copyrightMatch) {
    const year = parseInt(copyrightMatch[1], 10);
    if (!Number.isNaN(year) && year <= 2023) {
      reasons.push(`Outdated site copyright (${year})`);
    }
  }

  return {
    isQualified: reasons.length > 0,
    isBrokenOrDead: false,
    reasons,
    auditSummary: reasons.join("; "),
  };
}

function cleanBrandName(raw = "") {
  let name = String(raw || "").replace(/[#]/g, "Number ").replace(/\s+/g, " ").trim();
  if (!name) return "Your Business";
  // Strip verbose SEO taglines after -, |, or : when Google Places listings append keyword descriptions
  const splitters = [" - ", " | ", " — ", ": "];
  for (const sep of splitters) {
    if (name.includes(sep)) {
      const head = name.split(sep)[0].trim();
      if (head.length >= 4) {
        name = head;
        break;
      }
    }
  }
  if (name.length > 42 && name.includes(",")) {
    const head = name.split(",")[0].trim();
    if (head.length >= 5) name = head;
  }
  return name.trim();
}

/** Normalizes MongoDB and CSV lead schema variants into a consistent object. */
export function normalizeLead(lead = {}) {
  const businessName = cleanBrandName(lead.business_name || lead.businessName || lead.company || "Your Business");
  const contactName = (lead.contact_name || lead.contactName || lead.contact_person || "").trim();
  const email = (lead.email || "").toLowerCase().trim();
  const niche = (lead.niche || lead.industry || "painting").toLowerCase().trim();
  const city = (lead.city || "Lagos").trim();
  let demoUrl = (lead.demo_url || lead.demoUrl || "").trim();
  if (!demoUrl.startsWith("http://") && !demoUrl.startsWith("https://")) {
    demoUrl = `https://veltrixhub.ng/${niche}`;
  }

  const auditReasons = Array.isArray(lead.audit_reasons)
    ? lead.audit_reasons.filter(Boolean)
    : typeof lead.audit_reasons === "string" && lead.audit_reasons.trim()
      ? lead.audit_reasons.split(";").map((s) => s.trim()).filter(Boolean)
      : [];

  return {
    ...lead,
    _id: lead._id,
    business_name: businessName,
    businessName,
    contact_name: contactName,
    email,
    niche,
    city,
    demo_url: demoUrl,
    website_url: (lead.website_url || lead.website || "").trim(),
    audit_reasons: auditReasons,
    audit_status: (lead.audit_status || "").trim(),
    pitch_track: (lead.pitch_track || "").trim(),
    hasWebsite: lead.hasWebsite,
    status: lead.status || "pending",
    sent_at: lead.sent_at || "",
    sent_by: lead.sent_by || "",
  };
}

/**
 * Classifies whether a lead receives the Website Upgrade pitch ('outdated_website')
 * or Launch First Website pitch ('no_website').
 * Custom corporate domains are ALWAYS routed to 'outdated_website' so we never tell
 * an official-domain business that they do not have a website.
 */
export function classifyLeadPitchTrack(rawLead) {
  const lead = normalizeLead(rawLead);
  const freeMail = isFreeEmailDomain(lead.email);

  if (!freeMail) {
    return "outdated_website";
  }

  if (lead.pitch_track === "outdated_website") {
    return "outdated_website";
  }

  if (lead.pitch_track === "no_website" || lead.hasWebsite === false) {
    return "no_website";
  }

  if (lead.website_url || lead.audit_reasons.length > 0) {
    return "outdated_website";
  }

  return "no_website";
}

function buildNaturalGreeting(lead) {
  const cName = (lead.contact_name || "").trim();
  if (!cName || /^(the\s+)?managing\s+director$/i.test(cName)) {
    return `Hello ${lead.business_name} Team,`;
  }
  return `Hello ${cName},`;
}

function buildAuditObservation(lead, nicheLabel, city) {
  const reasons = (lead.audit_reasons || []).slice(0, 2);
  if (reasons.length > 0) {
    const formatted = reasons.map((r) => r.charAt(0).toLowerCase() + r.slice(1)).join(" and ");
    const gapLabel = reasons.length === 1 ? "a practical conversion gap" : "two practical gaps";
    const causeVerb = reasons.length === 1 ? "often causes" : "often cause";
    return `While checking your website for ${lead.business_name}, we noticed ${gapLabel} (${formatted}) that ${causeVerb} potential mobile customers in ${city} to drop off before making an inquiry.`;
  }

  if (lead.website_url) {
    return `While reviewing your current website for ${lead.business_name}, I noticed an opportunity to capture more mobile visitors in ${city} with faster loading speeds and a direct 1-click WhatsApp quote flow.`;
  }

  return `Even with an existing business presence and official domain, many ${nicheLabel} companies in ${city} lose ready-to-buy mobile visitors when pages load slowly on mobile data or lack an instant 1-click WhatsApp inquiry flow.`;
}

/**
 * Generates Dual-Track personalized plain-text and HTML pitch copy with tracking links.
 */
export function generatePitchContent(rawLead, sender = { name: "Kayode | Veltrix Hub" }) {
  const lead = normalizeLead(rawLead);
  const { business_name: businessName, city, niche, demo_url: demoUrl, email: recipientEmail } = lead;
  const nicheLabel = getNicheDisplayLabel(niche);
  const pitchTrack = classifyLeadPitchTrack(lead);
  const greeting = buildNaturalGreeting(lead);

  const encEmail = encodeURIComponent(recipientEmail);
  const encBiz = encodeURIComponent(businessName);
  const encDemo = encodeURIComponent(demoUrl);

  const trackingPixelUrl = `https://veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&action=open`;
  const trackedDemoUrl = `https://veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&url=${encDemo}&action=click`;

  if (pitchTrack === "outdated_website") {
    const subjects = [
      `Quick idea for ${businessName}'s website & WhatsApp leads`,
      `Turning mobile visitors on ${businessName}'s site into WhatsApp inquiries`,
      `A faster, WhatsApp-ready web upgrade concept for ${businessName}`,
    ];
    const subject = subjects[(recipientEmail.length + businessName.length) % subjects.length];
    const observation = buildAuditObservation(lead, nicheLabel, city);

    const plainText = `${greeting}

I came across ${businessName} while researching established ${nicheLabel} providers in ${city}.

${observation}

We built an interactive benchmark demo tailored for ${nicheLabel} businesses in ${city} so you can compare it alongside your current site:
Interactive Demo: ${demoUrl}

What upgrading to this structure brings to ${businessName}:
1. 1-Click WhatsApp Conversion: Visitors tap one button to send inquiries straight to your team instead of waiting on static forms.
2. Sub-Second Mobile Speed: Built cleanly for Nigerian mobile networks (MTN, Airtel, Glo) so prospects do not bounce.
3. Structured Trust & Proof: Prominent credibility signals, project highlights, and clear service pages that convert first-time buyers.
4. Zero-Downtime Upgrade: Custom-branded for ${businessName} and deployed on your existing domain within 3 to 5 business days.

Would you be open to a brief 5-minute chat on WhatsApp or a quick call this week to see how we can implement this upgrade for ${businessName}?

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
  <p>I came across <strong>${businessName}</strong> while researching established ${nicheLabel} providers in ${city}.</p>
  <p>${observation}</p>
  <p>We put together an interactive benchmark demo tailored for ${nicheLabel} businesses in ${city} so you can review the layout alongside your current site:</p>
  <p style="margin: 24px 0;">
    <a href="${trackedDemoUrl}" style="display: inline-block; background-color: #050f2c; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">View Interactive Upgrade Demo &rarr;</a>
  </p>
  <p><strong>What this upgrade brings to ${businessName}:</strong></p>
  <ul style="padding-left: 20px;">
    <li><strong>1-Click WhatsApp Conversion:</strong> Mobile visitors tap once to send project or service inquiries directly to your team.</li>
    <li><strong>Sub-Second Mobile Speed:</strong> Engineered cleanly for Nigerian mobile networks so visitors never drop off waiting on heavy pages.</li>
    <li><strong>Structured Credibility:</strong> Clear service breakdown, trust indicators, and FAQ clarity designed for first-time buyers.</li>
    <li><strong>Zero-Downtime Deployment:</strong> Custom-branded for ${businessName} and launched on your existing domain within 3 to 5 business days.</li>
  </ul>
  <p>Would you be open to a brief 5-minute chat on WhatsApp or a quick call this week to see how we can adapt this for ${businessName}?</p>
  <p style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
    <strong>${sender.name}</strong><br>
    Growth Team | Veltrix Hub<br>
    WhatsApp / Phone: <a href="https://wa.me/2348087098270" style="color: #2563eb;">+234 808 709 8270</a><br>
    Website: <a href="https://veltrixhub.ng" style="color: #2563eb;">https://veltrixhub.ng</a>
  </p>
  <img src="${trackingPixelUrl}" width="1" height="1" alt="" style="display:none;width:1px;height:1px;max-height:1px;max-width:1px;opacity:0;border:none;outline:none;" />
</body>
</html>`;

    return { subject, plainText, htmlText, pitchTrack, observation };
  }

  // Track 2: no_website (SMEs with verified Gmail/Yahoo and no active website)
  const subjects = [
    `Helping customers in ${city} find ${businessName} on Google & WhatsApp`,
    `A modern customer website ready for ${businessName}`,
    `Quick question regarding ${businessName}'s online bookings`,
  ];
  const subject = subjects[(recipientEmail.length + businessName.length) % subjects.length];
  const observation = `In today's market, most clients in ${city} search for ${nicheLabel} providers on their phones before deciding who to trust. Without a fast, mobile-friendly website that connects straight to your WhatsApp, high-intent customers often book elsewhere.`;

  const plainText = `${greeting}

I came across ${businessName} while researching top ${nicheLabel} businesses in ${city}.

${observation}

We built a live demonstration website tailored specifically for your industry:
Demo: ${demoUrl}

What launching this brings to ${businessName}:
1. Direct WhatsApp Ordering: Customers click one button and chat directly with your sales team.
2. Verified Credibility: Clear trust signals and CAC credibility badges that reassure first-time buyers.
3. Mobile-First Speed: Loads smoothly on MTN, Airtel, and Glo mobile networks.
4. Fast Turnaround: Custom-branded and launched live for ${businessName} within 3 to 5 business days.

Would you be open to a brief 5-minute chat on WhatsApp or a short phone call this week to see how this can bring more paying clients to ${businessName}?

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
  <p>I came across <strong>${businessName}</strong> while researching top ${nicheLabel} services in ${city}.</p>
  <p>${observation}</p>
  <p>We built a live demonstration website tailored specifically for your industry:</p>
  <p style="margin: 24px 0;">
    <a href="${trackedDemoUrl}" style="display: inline-block; background-color: #050f2c; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">View Live Demonstration &rarr;</a>
  </p>
  <p><strong>What this brings to ${businessName}:</strong></p>
  <ul style="padding-left: 20px;">
    <li><strong>Direct WhatsApp Conversion:</strong> Customers click one button and message your team directly.</li>
    <li><strong>Verified Credibility:</strong> Clear trust indicators and CAC registration signals that give new clients full confidence.</li>
    <li><strong>Mobile-First Speed:</strong> Engineered to load quickly on Nigerian mobile networks.</li>
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

  return { subject, plainText, htmlText, pitchTrack, observation };
}

/**
 * Generates track-aware 7-day follow-up email copy.
 */
export function generateFollowUpContent(rawLead, sender = { name: "Kayode | Veltrix Hub" }) {
  const lead = normalizeLead(rawLead);
  const { business_name: businessName, city, niche, demo_url: demoUrl, email: recipientEmail } = lead;
  const nicheLabel = getNicheDisplayLabel(niche);
  const pitchTrack = classifyLeadPitchTrack(lead);
  const greeting = buildNaturalGreeting(lead);

  const encEmail = encodeURIComponent(recipientEmail);
  const encBiz = encodeURIComponent(businessName);
  const encDemo = encodeURIComponent(demoUrl);

  const trackingPixelUrl = `https://veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&action=open`;
  const trackedDemoUrl = `https://veltrixhub.ng/api/track?email=${encEmail}&biz=${encBiz}&url=${encDemo}&action=click`;

  const subject =
    pitchTrack === "outdated_website"
      ? `Following up: WhatsApp conversion demo for ${businessName}`
      : `Following up regarding ${businessName}'s website demo`;

  const contextLine =
    pitchTrack === "outdated_website"
      ? `I wanted to follow up briefly on the redesign & WhatsApp lead-capture demo we shared for ${businessName} in ${city}.`
      : `I wanted to follow up briefly on my note last week regarding ${businessName}'s customer website in ${city}.`;

  const plainText = `${greeting}

${contextLine}

We are seeing strong results for ${nicheLabel} providers switching to fast mobile layouts with 1-click WhatsApp quote routing.

Here is the interactive demonstration we prepared for your review:
Demo: ${demoUrl}

If you would like us to customize a version for ${businessName}, please reply to this email or message our team on WhatsApp at +234 808 709 8270.

Best regards,

${sender.name}
Growth Team | Veltrix Hub
WhatsApp: https://wa.me/2348087098270
`;

  const htmlText = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>${greeting}</p>
  <p>${contextLine}</p>
  <p>We are seeing strong conversion gains for ${nicheLabel} providers using fast mobile layouts with 1-click WhatsApp inquiry routing.</p>
  <p style="margin: 24px 0;">
    <a href="${trackedDemoUrl}" style="display: inline-block; background-color: #050f2c; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">View Live Demonstration &rarr;</a>
  </p>
  <p>If you'd like to explore this for <strong>${businessName}</strong>, reply directly or reach us on WhatsApp at <a href="https://wa.me/2348087098270" style="color:#2563eb;">+234 808 709 8270</a>.</p>
  <p style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
    <strong>${sender.name}</strong><br>
    Growth Team | Veltrix Hub
  </p>
  <img src="${trackingPixelUrl}" width="1" height="1" alt="" style="display:none;width:1px;height:1px;opacity:0;" />
</body>
</html>`;

  return { subject, plainText, htmlText, pitchTrack };
}
