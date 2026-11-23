import os

# ==============================================================================
# Veltrix Hub Automated Outreach Configuration
# ==============================================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

# Automatic .env loader (no external dependencies required)
def load_env():
    for env_file in [os.path.join(BASE_DIR, ".env"), os.path.join(PROJECT_ROOT, ".env")]:
        if os.path.exists(env_file):
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, val = line.split("=", 1)
                        key = key.strip()
                        val = val.strip().strip('"').strip("'")
                        if key and not os.environ.get(key):
                            os.environ[key] = val

load_env()

SMTP_HOST = "smtp.zoho.com"
SMTP_PORT = 465  # SSL

# Default fallback password if all accounts share the same master/app password
DEFAULT_PASS = os.environ.get("ZOHO_PASSWORD") or os.environ.get("ZOHO_PASS") or ""

# 3 Distinct Outreach Senders (25 emails/day each = 75 total daily)
SENDERS = [
    {
        "id": "kayode",
        "email": "kayode@veltrixhub.ng",
        "name": "Kayode | Veltrix Hub",
        "first_name": "Kayode",
        "daily_limit": 25,
        "password": os.environ.get("ZOHO_PASS_KAYODE") or DEFAULT_PASS,
    },
    {
        "id": "christopher",
        "email": "christopher@veltrixhub.ng",
        "name": "Christopher | Veltrix Hub",
        "first_name": "Christopher",
        "daily_limit": 25,
        "password": os.environ.get("ZOHO_PASS_CHRISTOPHER") or DEFAULT_PASS,
    },
    {
        "id": "william",
        "email": "william@veltrixhub.ng",
        "name": "William | Veltrix Hub",
        "first_name": "William",
        "daily_limit": 25,
        "password": os.environ.get("ZOHO_PASS_WILLIAM") or DEFAULT_PASS,
    },
]

# Total daily ceiling across all accounts
TOTAL_DAILY_LIMIT = 75

# Human-like delay between each email (in seconds)
# Randomly chosen between MIN_DELAY and MAX_DELAY (2 to 5 minutes)
MIN_DELAY_SECONDS = 120
MAX_DELAY_SECONDS = 300

# File paths
LEADS_CSV_PATH = os.path.join(BASE_DIR, "leads_veltrixhub.csv")
LOG_PATH = os.path.join(BASE_DIR, "outreach.log")

# Veltrix Hub Direct Business Contact Details
VELTRIX_PHONE = "+234 808 709 8270"
VELTRIX_WHATSAPP = "https://wa.me/2348087098270"
VELTRIX_WEBSITE = "https://veltrixhub.ng"
VELTRIX_INBOUND_EMAIL = "info@veltrixhub.ng"
