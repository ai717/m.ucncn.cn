@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 正在扫描 inbox 目录下的新 JSON 文件并自动发布...
node scripts\ingest.js --push
pause
