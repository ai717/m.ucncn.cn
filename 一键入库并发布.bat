@echo off
chcp 65001 >nul
title 搞钱实验室 - 一键自动入库并发布到 m.ucncn.cn

echo =======================================================
echo          ⚡ 搞钱实验室 (MoneyLab) 独立站自动发布系统
echo =======================================================
echo.
echo 正在扫描 inbox 目录下的新 JSON 文件...
echo.

cd /d "%~dp0"
node scripts\ingest.js --push

echo.
echo =======================================================
echo 执行完毕！稍后访问 https://m.ucncn.cn 查看更新
echo =======================================================
timeout /t 5 >nul
exit
