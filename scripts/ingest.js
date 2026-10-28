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

if (fileArg) {
  const customPath = path.resolve(process.cwd(), fileArg.split('=')[1]);
  if (fs.existsSync(customPath)) {
    filesToProcess.push(customPath);
  } else {
    console.error(`❌ 找不到指定文件: ${customPath}`);
    process.exit(1);
  }
} else {
  // 默认模式：扫描 money/inbox/ 下的所有 .json 文件（排除 archive 子目录）
  const entries = fs.readdirSync(INBOX_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.json')) {
      filesToProcess.push(path.join(INBOX_DIR, entry.name));
    }
  }
}

if (filesToProcess.length === 0) {
  console.log('💡 [money/inbox] 文件夹中没有发现新的 .json 文件。');
  console.log('👉 请把下载的新文件直接放入 money/inbox 文件夹中，然后再次双击运行！');
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

for (const filePath of filesToProcess) {
  const filename = path.basename(filePath);
  try {
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    if (!raw) continue;
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed) ? parsed : [parsed];

    let fileAdded = 0;
    let fileUpdated = 0;

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

if (totalAdded === 0 && totalUpdated === 0) {
  console.log('⚠️ 没有有效的新数据可入库。');
  process.exit(0);
}

// 写回主数据库
fs.writeFileSync(DB_PATH, JSON.stringify(existing, null, 2), 'utf8');
console.log(`\n🎉 数据合并完成！当前实验室总项目数: ${existing.length} 条 (本次新增: ${totalAdded}, 更新: ${totalUpdated})`);

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

// 自动发布（附带重试防撞机制）
if (shouldPush) {
  try {
    console.log('\n🚀 正在推送到 GitHub，GitHub Pages 将全自动构建生效...');
    execSync('git add data/projects.json inbox', { stdio: 'inherit' });
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
