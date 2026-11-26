"""Automated Daily 7:00 AM Prospecting Wrapper for Veltrix Hub.
Delegates to prospect_deliverable_leads.js so scheduled Python and Node triggers share
one single source of truth (Enterprise filtering, Website Conversion Audit, MX Verification, and MongoDB Sync).
Never guesses unverified .ng domains.
"""

import os
import subprocess
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
ENV_FILE = os.path.join(PROJECT_ROOT, ".env.local")
SCRIPT_PATH = os.path.join(BASE_DIR, "prospect_deliverable_leads.js")


def run_prospecting():
    cmd = ["node"]
    if os.path.exists(ENV_FILE):
        cmd.extend(["--env-file", ENV_FILE])
    cmd.append(SCRIPT_PATH)
    result = subprocess.run(cmd, cwd=BASE_DIR)
    sys.exit(result.returncode)


if __name__ == "__main__":
    run_prospecting()
