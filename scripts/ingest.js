/**
 * 搞钱实验室 (MoneyLab) - 结构化数据入库与自动发布脚本
 * 
 * 智能模式：
 * 1. 默认自动扫描 money/inbox/ 目录下的所有 .json 文件
 * 2. 自动校验、去重合并到 money/data/projects.json
 * 3. 自动将处理完的文件移动到 money/inbox/archive/ 备份，防止重复
 * 4. 可选自动 Git 提交并推送触发发布
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INBOX_DIR = path.resolve(__dirname, '../inbox');
const ARCHIVE_DIR = path.resolve(__dirname, '../inbox/archive');
const DB_PATH = path.resolve(__dirname, '../data/projects.json');

// 确保目录存在
if (!fs.existsSync(INBOX_DIR)) fs.mkdirSync(INBOX_DIR, { recursive: true });
if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

const args = process.argv.slice(2);
const fileArg = args.find(a => a.startsWith('--file='));
const shouldPush = args.includes('--push');

// 收集待处理的文件列表
let filesToProcess = [];
let mdFilesToProcess = [];

if (fileArg) {
  const customPath = path.resolve(process.cwd(), fileArg.split('=')[1]);
  if (fs.existsSync(customPath)) {
    filesToProcess.push(customPath);
  } else {
    console.error(`❌ 找不到指定文件: ${customPath}`);
    process.exit(1);
  }
} else {
  // 默认模式：扫描 money/inbox/ 下的所有 .json 与 .md 文件（排除 archive 子目录）
  const entries = fs.readdirSync(INBOX_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.json') {
        filesToProcess.push(path.join(INBOX_DIR, entry.name));
      } else if (ext === '.md') {
        mdFilesToProcess.push(path.join(INBOX_DIR, entry.name));
      }
    }
  }
}

if (filesToProcess.length === 0 && mdFilesToProcess.length === 0) {
  console.log('💡 [money/inbox] 文件夹中没有发现新的 .json 或 .md 文件。');
  console.log('👉 请把下载的新文件直接放入 money/inbox 文件夹中，然后再次运行！');
  process.exit(0);
}

// 【防撞锁 1】：如果有推送需求，先自动 pull 对齐云端最新数据，防止冲掉云端 Bot 写入的内容
if (shouldPush) {
  try {
    console.log('🔄 正在同步云端最新数据 (git pull --rebase)，防止多端冲突...');
    execSync('git pull --rebase origin main', { stdio: 'inherit' });
    console.log('✓ 云端最新状态已对齐！\n');
  } catch (err) {
    console.warn('⚠️ 尝试对齐云端时遇到提示（若无网络或无变更可忽略）');
  }
}

console.log(`🔍 扫描到 ${filesToProcess.length} 个待入库文件，开始处理...`);

// 校验单条数据函数
function validateItem(item, idx, filename) {
  const required = ['title', 'category', 'score', 'summary'];
  for (const field of required) {
    if (item[field] === undefined || item[field] === null || item[field] === '') {
      throw new Error(`[${filename}] 第 ${idx + 1} 条数据缺少必填字段: [${field}]`);
    }
  }
}

// 读取现有主数据库
let existing = [];
if (fs.existsSync(DB_PATH)) {
  try {
    existing = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (e) {
    existing = [];
  }
}

let totalAdded = 0;
let totalUpdated = 0;
const processedFiles = [];

// 自动分拣与安装 inbox 中的单项目专属 SKILL.md
if (mdFilesToProcess.length > 0) {
  console.log(`\n🔍 检测到 ${mdFilesToProcess.length} 个专属技能包 (.md)，正在自动分发安装...`);
  for (const mdPath of mdFilesToProcess) {
    const raw = fs.readFileSync(mdPath, 'utf8');
    let slug = '';
    const nameMatch = raw.match(/^name:\s*["']?([^"'\r\n]+)["']?/m);
    if (nameMatch) {
      slug = nameMatch[1].trim();
    } else {
      const base = path.basename(mdPath, '.md').replace(/-?SKILL$/i, '');
      slug = base;
    }

    if (slug) {
      const targetDir = path.resolve(__dirname, `../skills/${slug}`);
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'SKILL.md'), raw, 'utf8');
      console.log(`  ✓ 专属技能包已自动安装至: skills/${slug}/SKILL.md`);
      processedFiles.push(mdPath);
    } else {
      console.warn(`  ⚠️ 无法识别技能文件 [${path.basename(mdPath)}] 的对应项目 Slug，跳过归档。`);
    }
  }
}

for (const filePath of filesToProcess) {
  const filename = path.basename(filePath);
  try {
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    if (!raw) continue;
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed) ? parsed : [parsed];

    let fileAdded = 0;
    let fileUpdated = 0;

    // 智能识别：纯英文数据集自动合并到 data/projects_en.json
    const isEnDataset = filename.toLowerCase().includes('-en') || filename.toLowerCase().includes('_en') || (items.length > 0 && !/[\u4e00-\u9fa5]/.test(items[0].title));

    if (isEnDataset) {
      console.log(`  🌐 检测到纯英文出海数据集 [${filename}]，直接合并至 data/projects_en.json...`);
      const DB_PATH_EN = path.resolve(__dirname, '../data/projects_en.json');
      let enList = [];
      if (fs.existsSync(DB_PATH_EN)) {
        try { enList = JSON.parse(fs.readFileSync(DB_PATH_EN, 'utf8')); } catch (e) { enList = []; }
      }
      for (const item of items) {
        const matchIdx = enList.findIndex(e => (e.slug && e.slug === item.slug) || (e.id && e.id === item.id));
        if (matchIdx >= 0) {
          enList[matchIdx] = { ...enList[matchIdx], ...item };
          fileUpdated++;
        } else {
          enList.unshift(item);
          fileAdded++;
        }
      }
      fs.writeFileSync(DB_PATH_EN, JSON.stringify(enList, null, 2), 'utf8');
      console.log(`  ✓ 英文数据集 [${filename}]: 新增 ${fileAdded} 条, 更新 ${fileUpdated} 条`);
      totalAdded += fileAdded;
      totalUpdated += fileUpdated;
      processedFiles.push(filePath);
      continue;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      validateItem(item, i, filename);

      if (!item.id) {
        item.id = `ml-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
      }
      if (!item.created_at) {
        item.created_at = new Date().toISOString().slice(0, 10);
      }
      if (!item.rating_tier) {
        item.rating_tier = item.score >= 90 ? 'S' : (item.score >= 80 ? 'A' : 'B');
      }

      // 弹性字段智能自适应与标准化 (Elastic Schema Normalizer)
      if (item.metrics) {
        // 1. 难度星级自适应 (数字 difficulty_stars 与 字符串 tech_barrier 互通)
        if (typeof item.metrics.difficulty_stars !== 'number' && typeof item.metrics.tech_barrier === 'string') {
          const m = item.metrics.tech_barrier.match(/(\d)\/5/);
          if (m) item.metrics.difficulty_stars = parseInt(m[1], 10);
          else item.metrics.difficulty_stars = (item.metrics.tech_barrier.match(/★/g) || []).length || 2;
        } else if (typeof item.metrics.difficulty_stars === 'number' && !item.metrics.tech_barrier) {
          item.metrics.tech_barrier = '★'.repeat(item.metrics.difficulty_stars) + '☆'.repeat(5 - item.metrics.difficulty_stars) + ` (${item.metrics.difficulty_stars}/5)`;
        }
        
        // 2. 启动资金自适应 (initial_cost 与 startup_cost 互通)
        if (!item.metrics.initial_cost && item.metrics.startup_cost) {
          item.metrics.initial_cost = item.metrics.startup_cost;
        } else if (!item.metrics.startup_cost && item.metrics.initial_cost) {
          item.metrics.startup_cost = item.metrics.initial_cost;
        }

        // 3. 变现模式自适应 (revenue_model 与 monetization_model 互通)
        if (!item.metrics.revenue_model && item.monetization_model) {
          item.metrics.revenue_model = item.monetization_model;
        } else if (!item.monetization_model && item.metrics.revenue_model) {
          item.monetization_model = item.metrics.revenue_model;
        }
      }

      const matchIdx = existing.findIndex(e => 
        (e.id && e.id === item.id) || 
        (e.slug && e.slug === item.slug) || 
        (e.title && e.title === item.title)
      );

      if (matchIdx >= 0) {
        existing[matchIdx] = { ...existing[matchIdx], ...item };
        fileUpdated++;
      } else {
        existing.unshift(item);
        fileAdded++;
      }
    }

    console.log(`  ✓ 已处理 [${filename}]: 新增 ${fileAdded} 条, 更新 ${fileUpdated} 条`);
    totalAdded += fileAdded;
    totalUpdated += fileUpdated;
    processedFiles.push(filePath);
  } catch (err) {
    console.error(`  ✗ 处理文件 [${filename}] 出错: ${err.message}`);
  }
}

if (totalAdded === 0 && totalUpdated === 0 && mdFilesToProcess.length === 0) {
  console.log('⚠️ 没有有效的新数据或技能文件可入库。');
  process.exit(0);
}

// 写回主数据库
fs.writeFileSync(DB_PATH, JSON.stringify(existing, null, 2), 'utf8');
console.log(`\n🎉 数据合并完成！当前实验室总项目数: ${existing.length} 条 (本次新增: ${totalAdded}, 更新: ${totalUpdated})`);

// 自动同步英文出海数据库 (data/projects_en.json)
const DB_PATH_EN = path.resolve(__dirname, '../data/projects_en.json');
let enExisting = [];
if (fs.existsSync(DB_PATH_EN)) {
  try { enExisting = JSON.parse(fs.readFileSync(DB_PATH_EN, 'utf8')); } catch (e) { enExisting = []; }
}

const categoryEnMap = {
  '出海/独立开发': 'Micro-SaaS & Automation',
  '软硬结合/轻制造': 'Physical + Digital POD',
  '线下数字化线索': 'Local Lead-Gen & Arbitrage',
  '国内虚拟电商': 'Pure Digital Assets',
  'AI应用与服务': 'AI Wrappers & B2B Solutions',
  '跨境与电商': 'Cross-Border & E-Commerce'
};

let enAdded = 0;
existing.forEach(item => {
  const matchIdx = enExisting.findIndex(e => (e.slug && e.slug === item.slug) || (e.id && e.id === item.id));
  if (matchIdx < 0) {
    const enEntry = {
      id: item.id,
      title: item.title_en || item.title,
      slug: item.slug,
      category: item.category_en || categoryEnMap[item.category] || 'Micro-SaaS & Automation',
      tags: item.tags || [],
      summary: item.summary_en || item.summary,
      score: item.score,
      rating_tier: item.rating_tier,
      verdict: item.verdict_en || item.verdict,
      score_breakdown: item.score_breakdown,
      metrics: {
        ...item.metrics,
        clean_model: item.metrics?.clean_model || item.metrics?.revenue_model || 'Subscription / License'
      },
      deep_dive: item.deep_dive || {
        opportunity: item.core_thesis?.opportunity_arbitrage || item.summary,
        workflow: (item.workflow_steps || []).map(s => `${s.phase || 'Phase'}: ${s.title || ''} - ${s.detail || ''}`),
        risk_and_pitfalls: item.pitfalls_to_avoid || 'Maintain strict operational discipline.',
        tools: item.tools || []
      },
      source_url: item.source_url,
      created_at: item.created_at
    };
    enExisting.unshift(enEntry);
    enAdded++;
    console.log(`  🌐 自动为项目 [${item.slug}] 派生并对齐英文出海版！`);
  }
});
fs.writeFileSync(DB_PATH_EN, JSON.stringify(enExisting, null, 2), 'utf8');
if (enAdded > 0) {
  console.log(`✓ 英文出海数据库同步更新: 新增 ${enAdded} 条双语对齐记录`);
}

// 自动同步刷新 index.html 的 JSON-LD 结构化微数据与 sitemap.xml
try {
  const htmlPath = path.resolve(__dirname, '../index.html');
  const sitemapPath = path.resolve(__dirname, '../sitemap.xml');
  
  if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://m.ucncn.cn/#website',
          'url': 'https://m.ucncn.cn/',
          'name': '搞钱实验室 (MoneyLab)',
          'description': '前沿出海变现、AI副业与微型商业项目尽调雷达。',
          'inLanguage': 'zh-CN',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://m.ucncn.cn/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'ItemList',
          '@id': 'https://m.ucncn.cn/#itemlist',
          'name': '精选商业变现与搞钱项目库',
          'description': '经过AI四维量化打分与客观解剖的精锐商业案例。',
          'itemListElement': existing.map((p, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'item': {
              '@type': 'Article',
              'headline': p.title,
              'description': p.summary,
              'url': 'https://m.ucncn.cn/#' + (p.slug || p.id),
              'datePublished': p.created_at,
              'keywords': (p.tags || []).join(','),
              'about': p.category
            }
          }))
        }
      ]
    };
    
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${JSON.stringify(schemaData, null, 2)}\n  </script>`);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('✓ Google 结构化微数据 (JSON-LD) 已同步刷新！');
  }

  // 刷新 sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://m.ucncn.cn/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>\n`;
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log('✓ 网站地图 (sitemap.xml) 已同步刷新！');
} catch (seoErr) {
  console.warn('⚠️ 同步更新 SEO 元数据时出现提示:', seoErr.message);
}

// 自动移动处理完的文件到 archive 归档
for (const src of processedFiles) {
  const base = path.basename(src);
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const dest = path.join(ARCHIVE_DIR, `${timestamp}_${base}`);
  try {
    fs.renameSync(src, dest);
  } catch (e) {
    // 跨驱动器 fallback
    fs.copyFileSync(src, dest);
    fs.unlinkSync(src);
  }
}
console.log(`📦 已处理文件已自动移动到 inbox/archive/ 归档备份。`);

// 自动编译落地页与刷新多语言索引
try {
  console.log('\n🔨 正在重新编译多语言独立落地页、Sitemap 与 AI 索引...');
  execSync('node scripts/generate_landing_pages.js', { stdio: 'inherit' });
} catch (buildErr) {
  console.warn('⚠️ 编译落地页时提示:', buildErr.message);
}

// 自动发布（附带重试防撞机制）
if (shouldPush) {
  try {
    console.log('\n🚀 正在推送到 GitHub，GitHub Pages 将全自动构建生效...');
    execSync('git add data/ inbox/ skills/ index.html en/ sitemap.xml catalog.json llms.txt p/', { stdio: 'inherit' });
    execSync(`git commit -m "chore: auto-ingest ${totalAdded} projects via inbox"`, { stdio: 'inherit' });
    
    try {
      execSync('git push origin main', { stdio: 'inherit' });
    } catch (pushErr) {
      console.log('⚠️ 检测到云端刚产生新提交，正在自动执行 rebase 对齐并重试推送...');
      execSync('git pull --rebase origin main', { stdio: 'inherit' });
      execSync('git push origin main', { stdio: 'inherit' });
    }

    console.log('\n=============================================');
    console.log('✅ 发布完成！稍后访问 https://m.ucncn.cn 查看更新。');
    console.log('=============================================');
  } catch (err) {
    console.error('⚠️ 自动推送未成功，请检查网络或 Git 配置:', err.message);
  }
}
