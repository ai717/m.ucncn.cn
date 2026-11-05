/**
 * BizPeel 商业线索雷达与种子采集器 (MoneyLab Seed Ingestion Engine)
 * 作用：从 https://bizpeel.com/zh/ 自动抓取最新已验证的商业解剖项目、公司、赛道与营收数据
 * 输出：money/data/bizpeel_seeds.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      },
      timeout: 15000
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
      }
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function fetchBizPeelSeeds() {
  console.log('🚀 开始连接 BizPeel (https://bizpeel.com/zh/) 抓取一手商业线索...');
  
  try {
    const html = await fetchUrl('https://bizpeel.com/zh/');
    console.log(`✓ 页面获取成功，体积: ${(html.length / 1024).toFixed(1)} KB`);

    // 匹配 /zh/project/ 相关的项目卡片
    const projectRegex = /href="(\/zh\/project\/([a-zA-Z0-9_-]+))"[^>]*>([\s\S]*?)<\/a>/gi;
    const seeds = [];
    const seenSlugs = new Set();

    let match;
    while ((match = projectRegex.exec(html)) !== null) {
      const relUrl = match[1];
      const slug = match[2];
      const rawBlock = match[3];

      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      // 清洗文本中的标题、标签与营收信息
      const cleanText = rawBlock.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      
      seeds.push({
        id: `seed-bizpeel-${slug}`,
        slug: slug,
        title: cleanText.slice(0, 80) || slug,
        url: `https://bizpeel.com${relUrl}`,
        source: 'BizPeel (https://bizpeel.com/zh/)',
        raw_snippet: cleanText,
        ingested_at: new Date().toISOString().split('T')[0]
      });
    }

    console.log(`✓ 成功解析出 ${seeds.length} 个商业案例种子线索`);

    const outDir = path.join(__dirname, '../data');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const outFile = path.join(outDir, 'bizpeel_seeds.json');
    fs.writeFileSync(outFile, JSON.stringify(seeds, null, 2), 'utf8');
    console.log(`✓ 种子数据已成功写入: ${outFile}`);

    return seeds;
  } catch (err) {
    console.error('❌ 抓取 BizPeel 异常:', err.message);
    return [];
  }
}

if (require.main === module) {
  fetchBizPeelSeeds();
}

module.exports = { fetchBizPeelSeeds };
