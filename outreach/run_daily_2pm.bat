@echo off
cd /d "C:\Users\HP\Desktop\VeltrixHub\outreach"
echo ================================================== >> pitching_batch.log
echo [AUTO 2:00 PM PITCHING BATCH] %DATE% %TIME% >> pitching_batch.log
node --env-file=../.env.local run_pitching_batch.js >> pitching_batch.log 2>&1
echo [AUTO 2:00 PM RUN FINISHED] %DATE% %TIME% >> pitching_batch.log
