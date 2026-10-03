@echo off
cd /d "%~dp0"
echo GameForge will be available at http://127.0.0.1:4173
echo Keep this window open while testing. Press Ctrl+C to stop.
node server.mjs
pause
