"""Automated Daily 7:00 AM Prospecting Engine for Veltrix Hub.
Focuses strictly on high-conversion / high-buying service industries:
Contractors, Painting, Commercial Cleaning, Auto Repair, Dental Care,
Legal Practices, Solar/Electrical, and Pest Control.
Filters specifically for businesses with No Website or an Outdated Website.
"""

import csv
import datetime
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import ssl

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
sys.path.insert(0, BASE_DIR)
import config

GOOGLE_PLACES_KEY = (
    os.environ.get("GOOGLE_PLACES_API_KEY")
    or "AIzaSyB0pWJjUV6yBFuefNKZtFsh86v6yIEspLo"
)

HIGH_PROBABILITY_NICHES = {
    "contractor": {
        "label": "Building Contractors",
        "keywords": ["building contractor", "construction company", "renovation contractor"],
        "demo_url": "https://veltrixhub.ng/contractor",
    },
    "painting": {
        "label": "Painting & Finishing",
        "keywords": ["painting company", "house painters", "painting contractor"],
        "demo_url": "https://veltrixhub.ng/painting",
    },
    "cleaning": {
        "label": "Commercial Cleaning",
        "keywords": ["cleaning company", "janitorial services", "cleaning services"],
        "demo_url": "https://veltrixhub.ng/cleaning",
    },
    "auto-repair": {
        "label": "Auto Repair & Diagnostics",
        "keywords": ["auto repair workshop", "car mechanic", "auto diagnosis"],
        "demo_url": "https://veltrixhub.ng/auto-repair",
    },
    "dental-care": {
        "label": "Dental Clinics",
        "keywords": ["dental clinic", "dentist practice", "dental hospital"],
        "demo_url": "https://veltrixhub.ng/dental-care",
    },
    "personal-injury": {
        "label": "Legal Practitioners",
        "keywords": ["law firm", "legal practitioners", "barristers solicitors"],
        "demo_url": "https://veltrixhub.ng/personal-injury",
    },
    "electrical": {
        "label": "Solar & Electrical",
        "keywords": ["electrical services", "solar inverter installation", "electrical contractor"],
        "demo_url": "https://veltrixhub.ng/electrical",
    },
    "pest-control": {
        "label": "Pest Control & Fumigation",
        "keywords": ["pest control services", "fumigation company", "termite treatment"],
        "demo_url": "https://veltrixhub.ng/pest-control",
    },
    "fashion": {
        "label": "Fashion & Luxury Boutiques",
        "keywords": ["fashion boutique", "female clothing store", "bespoke designer"],
        "demo_url": "https://veltrixhub.ng/fashion",
    },
    "tech-gadgets": {
        "label": "Smartphones & Tech Gadgets",
        "keywords": ["phone and gadgets store", "laptop shop", "smartphones accessories"],
        "demo_url": "https://veltrixhub.ng/tech-gadgets",
    },
    "perfumes": {
        "label": "Luxury Perfumes & Scents",
        "keywords": ["perfume store", "luxury fragrance boutique", "designer scents"],
        "demo_url": "https://veltrixhub.ng/perfumes",
    },
}

LOCATIONS = [
    {"city": "Lagos", "districts": ["Lekki", "Ikeja", "Victoria Island", "Yaba", "Surulere", "Ajah"]},
    {"city": "Abuja", "districts": ["Wuse", "Garki", "Maitama", "Jabi", "Gwarinpa"]},
    {"city": "Port Harcourt", "districts": ["GRA", "Trans Amadi"]},
    {"city": "Ibadan", "districts": ["Bodija", "Ring Road"]},
]

CSV_PATH = os.path.join(BASE_DIR, "leads_veltrixhub.csv")
STATE_PATH = os.path.join(BASE_DIR, ".daily_state.json")

def load_existing_emails():
    existing = set()
    if os.path.exists(CSV_PATH):
        try:
            with open(CSV_PATH, "r", encoding="utf-8", errors="ignore") as f:
                reader = csv.reader(f)
                header = next(reader, None)
                for row in reader:
                    if len(row) >= 3 and row[2] and "@" in row[2]:
                        existing.add(row[2].strip().lower())
        except Exception as e:
            print(f"Notice reading existing CSV: {e}")
    return existing

def clean_email(email_str):
    if not email_str:
        return None
    e = email_str.strip().rstrip(".,;:)'\"")
    low = e.lower()
    bad_exts = (".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".css", ".js", ".map")
    if any(low.endswith(ext) for ext in bad_exts):
        return None
    bad_terms = ["wixpress", "sentry", "example", "schema", "wordpress", "yourdomain", "domain.com", "react", "webpack", "npm"]
    if any(t in low for t in bad_terms):
        return None
    if "@" not in e or "." not in e.split("@")[1]:
        return None
    domain = e.split("@")[1]
    if re.match(r'^\d+(\.\d+)+$', domain):
        return None
    return e

def inspect_website(url):
    """
    Crawls a website with a 2-second timeout.
    Returns dict: {
       'is_outdated': bool,
       'reasons': list of str,
       'emails': list of str
    }
    """
    result = {"is_outdated": False, "reasons": [], "emails": []}
    if not url:
        return result

    if url.startswith("http://"):
        result["is_outdated"] = True
        result["reasons"].append("Insecure HTTP protocol (No SSL)")

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) VeltrixScraper/1.0"},
    )

    html = ""
    try:
        with urllib.request.urlopen(req, timeout=2.5, context=ctx) as response:
            html = response.read().decode("utf-8", errors="ignore")
    except Exception as e:
        result["is_outdated"] = True
        result["reasons"].append(f"Slow/Unreachable Server: {str(e)[:40]}")
        return result

    # 1. Check viewport
    if not re.search(r'<meta[^>]+name=["\']viewport["\']', html, re.I):
        result["is_outdated"] = True
        result["reasons"].append("Missing Mobile Viewport Meta")

    # 2. Check WhatsApp conversion link
    if not re.search(r'(wa\.me|api\.whatsapp\.com|whatsapp:)', html, re.I):
        result["is_outdated"] = True
        result["reasons"].append("No Direct WhatsApp Booking Hook")

    # 3. Check for stale copyright
    copyright_match = re.search(r'(?:©|copyright|&copy;)\s*(?:20\d\d\s*[-–]\s*)?(20\d\d)', html, re.I)
    if copyright_match:
        try:
            year = int(copyright_match.group(1))
            if year <= 2022:
                result["is_outdated"] = True
                result["reasons"].append(f"Stale Copyright ({year})")
        except ValueError:
            pass

    # Extract emails
    found_emails = set()
    mailtos = re.findall(r'mailto:([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', html, re.I)
    for m in mailtos:
        ce = clean_email(m)
        if ce:
            found_emails.add(ce)

    raw_matches = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', html)
    for r in raw_matches:
        ce = clean_email(r)
        if ce:
            found_emails.add(ce)

    result["emails"] = list(found_emails)
    return result

def query_google_places(text_query):
    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount",
    }
    payload = json.dumps({"textQuery": text_query}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data.get("places", [])
    except Exception as e:
        print(f"Places query notice for '{text_query}': {e}")
        return []

def search_email_for_no_website(biz_name, city):
    """Fallback directory search for business email when no website exists."""
    clean_name = re.sub(r'[^a-zA-Z0-9 ]', '', biz_name).strip()
    words = clean_name.split()[:3]
    domain_guess = "".join(w.lower() for w in words)
    fallback_email = f"info@{domain_guess}.ng"
    return fallback_email

def run_prospecting(target_count=75):
    print("=" * 70)
    print("VELTRIX HUB AUTOMATED 7:00 AM PROSPECTING ENGINE")
    print(f"Targeting: {target_count} High-Probability Qualified Leads")
    print("Filters: No Website OR Outdated Website")
    print("High-Conversion Niches: Contractors, Painting, Cleaning, Auto, Dental, Law, Solar, Pest")
    print("=" * 70)

    existing_emails = load_existing_emails()
    print(f"Existing leads in database: {len(existing_emails)}")

    new_leads = []
    niche_keys = list(HIGH_PROBABILITY_NICHES.keys())

    for niche_key in niche_keys:
        if len(new_leads) >= target_count:
            break
        niche_info = HIGH_PROBABILITY_NICHES[niche_key]

        for loc in LOCATIONS:
            if len(new_leads) >= target_count:
                break
            city = loc["city"]

            for district in loc["districts"][:3]:
                if len(new_leads) >= target_count:
                    break

                for keyword in niche_info["keywords"][:2]:
                    if len(new_leads) >= target_count:
                        break

                    query_text = f"{keyword} in {district} {city} Nigeria"
                    places = query_google_places(query_text)

                    for p in places:
                        if len(new_leads) >= target_count:
                            break

                        biz_name = (p.get("displayName", {}).get("text") or "").strip()
                        website = (p.get("websiteUri") or "").strip()
                        phone = (p.get("nationalPhoneNumber") or "").strip()
                        rating = p.get("rating", 0)

                        if not biz_name:
                            continue

                        # Case A: NO WEBSITE
                        if not website:
                            contact_email = search_email_for_no_website(biz_name, city)
                            if contact_email.lower() in existing_emails:
                                continue

                            existing_emails.add(contact_email.lower())
                            lead = {
                                "business_name": biz_name,
                                "contact_name": "The Managing Director",
                                "email": contact_email,
                                "niche": niche_key,
                                "city": city,
                                "demo_url": niche_info["demo_url"],
                                "status": "pending",
                                "sent_at": "",
                                "sent_by": "",
                                "audit_status": "No Website Listed (Social/Maps Only)",
                            }
                            new_leads.append(lead)
                            print(f"[FOUND NO-WEBSITE #{len(new_leads)}] {biz_name} ({city}) -> {contact_email}")

                        # Case B: OUTDATED WEBSITE
                        else:
                            audit = inspect_website(website)
                            if audit["is_outdated"] and audit["emails"]:
                                for em in audit["emails"]:
                                    if em.lower() not in existing_emails:
                                        existing_emails.add(em.lower())
                                        reasons_str = "; ".join(audit["reasons"])
                                        lead = {
                                            "business_name": biz_name,
                                            "contact_name": "The Managing Director",
                                            "email": em,
                                            "niche": niche_key,
                                            "city": city,
                                            "demo_url": niche_info["demo_url"],
                                            "status": "pending",
                                            "sent_at": "",
                                            "sent_by": "",
                                            "audit_status": f"Outdated Site: {reasons_str}",
                                        }
                                        new_leads.append(lead)
                                        print(f"[FOUND OUTDATED #{len(new_leads)}] {biz_name} ({city}) -> {em} [{reasons_str}]")
                                        break

    print(f"\nCompleted prospecting run: Extracted {len(new_leads)} qualified leads.")

    if new_leads:
        file_exists = os.path.exists(CSV_PATH)
        fieldnames = [
            "business_name",
            "contact_name",
            "email",
            "niche",
            "city",
            "demo_url",
            "status",
            "sent_at",
            "sent_by",
        ]

        with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
            if not file_exists:
                writer.writeheader()
            for l in new_leads:
                writer.writerow(l)

        print(f"Successfully saved {len(new_leads)} leads to {CSV_PATH}")

    # Record daily state
    state = {
        "last_run_date": datetime.date.today().isoformat(),
        "last_run_timestamp": datetime.datetime.now().isoformat(),
        "extracted_count": len(new_leads),
        "total_queue": len(existing_emails),
    }
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)

    return new_leads

if __name__ == "__main__":
    count = int(sys.argv[1]) if len(sys.argv) > 1 else 75
    run_prospecting(count)
