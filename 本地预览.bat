@echo off
chcp 65001 >nul
title 搞钱实验室 - 本地独立预览服务

echo =======================================================
echo          ⚡ 搞钱实验室 (MoneyLab) 本地独立预览
echo =======================================================
echo.
echo 正在启动独立本地 Web 服务 (端口: 28766)...
echo.

cd /d "%~dp0"

:: 优先使用 node 启动零依赖原生微型 HTTP 服务器，无需安装任何额外包
start "" http://localhost:28766/

node -e "
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 28766;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('✓ 本地预览服务已启动: http://localhost:' + PORT + '/');
  console.log('💡 浏览器已自动打开。测试完毕后，直接关闭本黑框窗口即可停止服务。');
});
"

pause
