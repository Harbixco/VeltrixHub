// Vercel Serverless Function & Node Handler: Automated Pitching Dispatch Trigger
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const OUTREACH_DIR = path.join(process.cwd(), "outreach");
const SCRIPT_PATH = path.join(OUTREACH_DIR, "send_outreach.py");
const LOG_PATH = path.join(OUTREACH_DIR, "outreach.log");

let activeProcess = null;

export default async function handler(req, res) {
  req.query = req.query || {};
  req.body = req.body || {};

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 1. STATUS CHECK
  if (req.query.status === "true" || req.query.status === true || req.method === "GET") {
    let logTail = [];
    if (fs.existsSync(LOG_PATH)) {
      try {
        const fullLog = fs.readFileSync(LOG_PATH, "utf-8");
        logTail = fullLog.split("\n").filter(Boolean).slice(-15);
      } catch (e) {
        logTail = [e.message];
      }
    }

    return res.status(200).json({
      success: true,
      isRunning: activeProcess !== null,
      lastLogs: logTail,
    });
  }

  // 2. TRIGGER LIVE DISPATCH
  const mode = req.body?.mode || req.query.mode || "send"; // 'send', 'dry-run', or 'test'
  const recipient = req.body?.recipient || req.query.recipient || "";

  if (activeProcess !== null) {
    return res.status(200).json({
      success: true,
      message: "Outreach engine is already running in background.",
      isRunning: true,
    });
  }

  try {
    const args = [SCRIPT_PATH];
    if (mode === "dry-run") {
      args.push("--dry-run");
    } else if (mode === "test") {
      args.push("--test", recipient || "info@veltrixhub.ng");
    } else {
      args.push("--send");
    }

    const logStream = fs.createWriteStream(LOG_PATH, { flags: "a" });
    const timestamp = new Date().toISOString();
    logStream.write(`\n=== DISPATCH STARTED AT ${timestamp} (mode: ${mode}) ===\n`);

    const env = {
      ...process.env,
      ZOHO_PASSWORD: process.env.ZOHO_PASSWORD || "Face123@@book@@",
      PYTHONUNBUFFERED: "1",
      PYTHONIOENCODING: "utf-8",
    };

    activeProcess = spawn("python", ["send_outreach.py", ...args.slice(1)], {
      cwd: OUTREACH_DIR,
      shell: true,
      env: env,
    });

    activeProcess.stdout.pipe(logStream, { end: false });
    activeProcess.stderr.pipe(logStream, { end: false });

    activeProcess.on("close", (code) => {
      logStream.write(`\n=== DISPATCH FINISHED AT ${new Date().toISOString()} (exit code: ${code}) ===\n`);
      logStream.end();
      activeProcess = null;
    });

    return res.status(200).json({
      success: true,
      message: `Outreach engine launched in background (mode: ${mode}). Emails rotating across 3 mailboxes.`,
      isRunning: true,
    });
  } catch (err) {
    console.error("Failed to launch outreach runner:", err);
    activeProcess = null;
    return res.status(500).json({ success: false, error: err.message });
  }
}
