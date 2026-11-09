const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');

['index.html', 'en/index.html'].forEach(rel => {
  const filePath = path.join(ROOT_DIR, rel);
  const html = fs.readFileSync(filePath, 'utf8');
  const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  let idx = 0;
  while ((m = scriptRegex.exec(html)) !== null) {
    idx++;
    const tm = m[0].match(/type=["']([^"']+)["']/i);
    if (tm && (tm[1].includes('json') || tm[1].includes('tailwind'))) continue;
    const code = m[1];
    if (!code.trim()) continue;
    try {
      new vm.Script(code, { filename: `${rel}:script[${idx}]` });
      console.log(`✓ ${rel} script[${idx}] syntax OK`);
    } catch (e) {
      console.error(`❌ Syntax error in ${rel} script[${idx}]:`, e);
      process.exit(1);
    }
  }
});
console.log('✓ All HTML inline scripts passed syntax validation!');
