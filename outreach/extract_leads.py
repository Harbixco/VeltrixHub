import csv
import datetime
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

try:
    import config
except ImportError:
    from . import config

# Google Places API (New) Key
GOOGLE_PLACES_KEY = os.environ.get("GOOGLE_PLACES_API_KEY") or "AIzaSyB0pWJjUV6yBFuefNKZtFsh86v6yIEspLo"

# Target Niche & Demo Mapping
NICHES = {
    "contractor": {
        "keywords": ["building contractor", "construction company", "civil engineering contractors", "home renovation"],
        "demo_url": "https://veltrixhub.ng/contractor",
    },
    "painting": {
        "keywords": ["painting company", "house painters", "commercial painting", "painting contractor"],
        "demo_url": "https://veltrixhub.ng/painting",
    },
    "cleaning": {
        "keywords": ["cleaning company", "cleaning services", "commercial cleaners", "janitorial services"],
        "demo_url": "https://veltrixhub.ng/cleaning",
    },
    "auto-repair": {
        "keywords": ["auto repair workshop", "car mechanic", "auto diagnosis", "car repair garage"],
        "demo_url": "https://veltrixhub.ng/auto-repair",
    },
    "dental-care": {
        "keywords": ["dental clinic", "dentist practice", "dental hospital", "teeth whitening"],
        "demo_url": "https://veltrixhub.ng/dental-care",
    },
    "personal-injury": {
        "keywords": ["law firm", "legal practitioners", "barristers and solicitors", "corporate lawyers"],
        "demo_url": "https://veltrixhub.ng/personal-injury",
    },
    "electrical": {
        "keywords": ["electrical services", "electrical contractor", "electrical installation", "solar inverter installation"],
        "demo_url": "https://veltrixhub.ng/electrical",
    },
    "pest-control": {
        "keywords": ["pest control services", "fumigation company", "termite treatment", "bedbug fumigation"],
        "demo_url": "https://veltrixhub.ng/pest-control",
    },
    "fashion": {
        "keywords": ["fashion boutique", "female clothing store", "bespoke fashion designer", "luxury apparel"],
        "demo_url": "https://veltrixhub.ng/fashion",
    },
    "perfumes": {
        "keywords": ["perfume store", "luxury fragrance boutique", "designer scents", "oil perfumes"],
        "demo_url": "https://veltrixhub.ng/perfumes",
    },
    "tech-gadgets": {
        "keywords": ["phone and gadgets store", "laptop shop", "electronics and accessories", "smartphones store"],
        "demo_url": "https://veltrixhub.ng/tech-gadgets",
    },
}

# Major Commercial Districts in Nigeria
LOCATIONS = [
    {"city": "Lagos", "districts": ["Lekki", "Ikeja", "Victoria Island", "Yaba", "Surulere", "Ajah", "Maryland", "Ikoyi"]},
    {"city": "Abuja", "districts": ["Wuse", "Garki", "Maitama", "Jabi", "Gwarinpa", "Asokoro", "Utako"]},
    {"city": "Port Harcourt", "districts": ["GRA", "Trans Amadi", "Peter Odili", "D-Line"]},
    {"city": "Ibadan", "districts": ["Bodija", "Ring Road", "Dugbe", "Oluyole"]},
]

CSV_PATH = config.LEADS_CSV_PATH


def load_existing_emails():
    emails = set()
    if os.path.exists(CSV_PATH):
        with open(CSV_PATH, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                e = row.get("email", "").strip().lower()
                if e:
                    emails.add(e)
    return emails


def search_google_places(query):
    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_KEY,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating",
    }
    data = json.dumps({"textQuery": query}).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            res = json.loads(resp.read().decode("utf-8"))
            return res.get("places", [])
    except Exception as e:
        print(f"  [Places API Notice] {e}")
        return []


def scrape_emails_from_website(url):
    if not url:
        return []

    emails = set()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }

    parsed = urllib.parse.urlparse(url)
    base = f"{parsed.scheme}://{parsed.netloc}"
    test_urls = [url, f"{base}/contact", f"{base}/contact-us", f"{base}/about", f"{base}/about-us"]

    for u in test_urls:
        try:
            req = urllib.request.Request(u, headers=headers)
            with urllib.request.urlopen(req, timeout=6) as resp:
                content_type = resp.headers.get("Content-Type", "")
                if "html" not in content_type:
                    continue
                html = resp.read().decode("utf-8", errors="ignore")

                # Match mailto links first
                mailtos = re.findall(r'mailto:([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)', html, re.I)
                for m in mailtos:
                    clean_m = clean_email(m)
                    if clean_m:
                        emails.add(clean_m)

                # Match raw emails in text
                found = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', html)
                for f in found:
                    clean_f = clean_email(f)
                    if clean_f:
                        emails.add(clean_f)

            if emails:
                break
        except Exception:
            continue

    return list(emails)


def clean_email(e):
    if not e:
        return None
    e = e.strip().rstrip(".,;:)'\"")
    e_low = e.lower()

    # Filter invalid artifacts and dummy domains
    blacklisted_extensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".css", ".js", ".woff", ".ttf"]
    if any(e_low.endswith(ext) for ext in blacklisted_extensions):
        return None

    blacklisted_terms = [
        "example.com",
        "email.com",
        "yourdomain",
        "yoursite",
        "wixpress.com",
        "sentry.io",
        "schema.org",
        "wordpress.org",
        "domain.com",
        "test@test",
        "name@domain",
    ]
    if any(term in e_low for term in blacklisted_terms):
        return None

    # Must contain a valid TLD
    if "." not in e.split("@")[-1]:
        return None

    return e


def clean_contact_name(biz_name):
    # Derive natural Nigerian greeting name or title
    lower = biz_name.lower()
    if "dr." in lower or "doctor" in lower or "dental" in lower or "clinic" in lower:
        return "Doctor"
    if "engr" in lower or "engineer" in lower:
        return "Engr. Lead"
    if "barr" in lower or "law" in lower or "legal" in lower:
        return "Counsel"
    return "The Managing Director"


def append_leads_to_csv(new_leads):
    if not new_leads:
        return 0

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

    file_exists = os.path.exists(CSV_PATH)
    with open(CSV_PATH, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        for l in new_leads:
            writer.writerow(l)

    return len(new_leads)


def extract_leads_batch(target_count=75, specific_niche=None, specific_city=None):
    existing_emails = load_existing_emails()
    print("=" * 70)
    print("VELTRIX HUB AUTOMATED LEAD EXTRACTION ENGINE")
    print(f"Goal: Extract {target_count} fresh, verified Nigerian business prospects")
    print(f"Existing Leads in CSV: {len(existing_emails)}")
    print("=" * 70)

    extracted_leads = []
    
    niche_keys = [specific_niche] if specific_niche and specific_niche in NICHES else list(NICHES.keys())
    location_pool = [l for l in LOCATIONS if not specific_city or l["city"].lower() == specific_city.lower()]
    if not location_pool:
        location_pool = LOCATIONS

    # Cycle through niches and high-density commercial districts
    for niche_key in niche_keys:
        niche_info = NICHES[niche_key]
        demo_url = niche_info["demo_url"]

        for loc in location_pool:
            city = loc["city"]
            for district in loc["districts"]:
                if len(extracted_leads) >= target_count:
                    break

                for keyword in niche_info["keywords"][:2]:
                    if len(extracted_leads) >= target_count:
                        break

                    query = f"{keyword} in {district} {city} Nigeria"
                    print(f"\nScanning: '{query}'...")
                    places = search_google_places(query)
                    print(f"  Found {len(places)} places on Google Places.")

                    for p in places:
                        if len(extracted_leads) >= target_count:
                            break

                        biz_name = p.get("displayName", {}).get("text", "").strip()
                        website = p.get("websiteUri", "")
                        phone = p.get("nationalPhoneNumber", "")

                        if not biz_name:
                            continue

                        # Extract emails
                        discovered_emails = []
                        if website:
                            discovered_emails = scrape_emails_from_website(website)

                        # Filter against existing database
                        new_valid_emails = [e for e in discovered_emails if e.lower() not in existing_emails]

                        if new_valid_emails:
                            primary_email = new_valid_emails[0]
                            existing_emails.add(primary_email.lower())
                            contact_name = clean_contact_name(biz_name)

                            lead_record = {
                                "business_name": biz_name,
                                "contact_name": contact_name,
                                "email": primary_email,
                                "niche": niche_key,
                                "city": city,
                                "demo_url": demo_url,
                                "status": "pending",
                                "sent_at": "",
                                "sent_by": "",
                            }
                            extracted_leads.append(lead_record)
                            print(f"  [+] EXTRACTED: {biz_name} | {primary_email} | {city} | Demo: {demo_url}")

                    # Respectful delay between queries
                    time.sleep(1.0)

    # Append to CSV
    added_count = append_leads_to_csv(extracted_leads)
    print("\n" + "=" * 70)
    print(f"EXTRACTION COMPLETED: Successfully added {added_count} verified leads to {CSV_PATH}")
    print(f"Total Leads Now in Pipeline: {len(load_existing_emails())}")
    print("=" * 70)
    return added_count


if __name__ == "__main__":
    count = 75
    niche = None
    city = None

    for i, arg in enumerate(sys.argv):
        if arg == "--count" and i + 1 < len(sys.argv):
            try:
                count = int(sys.argv[i + 1])
            except ValueError:
                pass
        elif arg == "--niche" and i + 1 < len(sys.argv):
            niche = sys.argv[i + 1]
        elif arg == "--city" and i + 1 < len(sys.argv):
            city = sys.argv[i + 1]

    extract_leads_batch(target_count=count, specific_niche=niche, specific_city=city)
