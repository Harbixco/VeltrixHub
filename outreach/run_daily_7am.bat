@echo off
cd /d "C:\Users\HP\Desktop\VeltrixHub\outreach"
echo ================================================== >> daily_prospector.log
echo [AUTO 7:00 AM RUN] %DATE% %TIME% >> daily_prospector.log
node --env-file=../.env.local prospect_deliverable_leads.js >> daily_prospector.log 2>&1
echo [AUTO RUN FINISHED] %DATE% %TIME% >> daily_prospector.log
