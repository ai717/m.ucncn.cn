@echo off
chcp 65001 >nul
cd /d "%~dp0"
start "" "http://localhost:28766/"
node scripts\server.js
pause
