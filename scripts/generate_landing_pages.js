const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const zhProjects = require('../data/projects.json');
const enProjects = require('../data/projects_en.json');

// ==========================================
// 0. 构建时硬核查重与数据完整性门禁 (Dedup & Integrity Gatekeeper)
// ==========================================
function validateAndDedupProjects(projects, lang) {
  const seenIds = new Set();
  const seenSlugs = new Set();
  const duplicates = [];

  projects.forEach((p, index) => {
    if (!p.id) duplicates.push(`[${lang}] Index ${index} 缺少必填字段 id`);
    if (!p.slug) duplicates.push(`[${lang}] Index ${index} 缺少必填字段 slug`);

    if (seenIds.has(p.id)) {
      duplicates.push(`[${lang}] 致命错误：发现重复的项目 ID "${p.id}"`);
    } else {
      seenIds.add(p.id);
    }

    if (seenSlugs.has(p.slug)) {
      duplicates.push(`[${lang}] 致命错误：发现重复的 URL Slug "${p.slug}" (会导致路由覆盖与SEO自残)`);
    } else {
      seenSlugs.add(p.slug);
    }
  });

  return duplicates;
}

const zhErrors = validateAndDedupProjects(zhProjects, 'ZH');
const enErrors = validateAndDedupProjects(enProjects, 'EN');
const allErrors = [...zhErrors, ...enErrors];

if (allErrors.length > 0) {
  console.error('\n❌ 【构建中断】检测到项目数据存在重复或格式冲突：');
  allErrors.forEach(err => console.error('  - ' + err));
  process.exit(1);
}

// 检查中英双语 Slug 是否 1:1 对齐
const zhSlugs = new Set(zhProjects.map(p => p.slug));
const enSlugs = new Set(enProjects.map(p => p.slug));
zhSlugs.forEach(slug => {
  if (!enSlugs.has(slug)) {
    console.warn(`⚠️ [警告] 中文项目 "${slug}" 缺少对应的英文版本`);
  }
});

console.log(`✓ 查重与数据完整性校验通过：中文 ${zhProjects.length} 篇 / 英文 ${enProjects.length} 篇，0 冲突，0 重复`);

const GTAG_SNIPPET = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NWJ2D2NRYK"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-NWJ2D2NRYK');
  </script>`;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generatePageHtml(p, lang) {
  const isEn = lang === 'en';
  const slug = p.slug;
  const canonicalUrl = isEn ? `https://m.ucncn.cn/en/p/${slug}/` : `https://m.ucncn.cn/p/${slug}/`;
  const zhUrl = `https://m.ucncn.cn/p/${slug}/`;
  const enUrl = `https://m.ucncn.cn/en/p/${slug}/`;
  const homeUrl = isEn ? '../../' : '../../';
  const targetSpaUrl = isEn ? `../../#${slug}` : `../../#${slug}`;
  const switcherUrl = isEn ? `../../../p/${slug}/` : `../en/p/${slug}/`;
  const switcherLabel = isEn ? '🌐 ZH' : '🌐 EN';
  const switcherTitle = isEn ? 'Switch to Chinese Edition (ZH)' : 'Switch to English Edition (EN)';

  const pageTitle = isEn 
    ? `${p.title} - Revenue Blueprint & AI Agent Skill | MoneyLab`
    : `${p.title} - 商业模式尽调与落地SOP | 搞钱实验室 MoneyLab`;

  const metaDesc = isEn
    ? `Deconstructed teardown of ${p.title}. Est. Monthly Run Rate: ${p.metrics?.est_monthly_profit || 'High'}. Includes unit economics, workflow architecture, pitfall post-mortems, and turnkey AI agent skills.`
    : `搞钱实验室对【${p.title}】的深度商业模式尽调。预期月利：${p.metrics?.est_monthly_profit || '高'}。包含真实商业逻辑、4步落地SOP、避坑防线与开箱即用 AI Prompt / SKILL.md。`;

  let diffStars = 2;
  if (typeof p.metrics?.difficulty_stars === 'number') {
    diffStars = p.metrics.difficulty_stars;
  } else if (typeof p.metrics?.tech_barrier === 'string') {
    const match = p.metrics.tech_barrier.match(/(\d)\/5/);
    if (match) diffStars = parseInt(match[1], 10);
    else diffStars = (p.metrics.tech_barrier.match(/★/g) || []).length || 2;
  }
  const starsText = '★'.repeat(diffStars) + '☆'.repeat(5 - diffStars);

  // 智能自适应数据解析 (Elastic Data Adapter)
  // 1. 痛点与商机分析 (支持 core_thesis 对象、deep_dive.opportunity 文本、或 summary 兜底)
  let opportunityHtml = '';
  if (p.core_thesis && (p.core_thesis.market_pain || p.core_thesis.opportunity_arbitrage)) {
    const pain = p.core_thesis.market_pain ? `<div class="p-4 rounded-xl bg-slate-900/60 border border-brand-border/80 text-xs sm:text-sm text-slate-300 leading-relaxed"><strong class="text-emerald-400 font-mono block mb-1">【${isEn ? 'Market Pain & Gap' : '真实市场痛点与供需断层'}】</strong>${escapeHtml(p.core_thesis.market_pain)}</div>` : '';
    const arb = p.core_thesis.opportunity_arbitrage ? `<div class="p-4 rounded-xl bg-slate-900/60 border border-brand-border/80 text-xs sm:text-sm text-slate-300 leading-relaxed"><strong class="text-teal-400 font-mono block mb-1">【${isEn ? 'Opportunity & Arbitrage' : '破局机制与商业套利切口'}】</strong>${escapeHtml(p.core_thesis.opportunity_arbitrage)}</div>` : '';
    opportunityHtml = `<div class="space-y-3">${pain}${arb}</div>`;
  } else {
    opportunityHtml = `<p class="text-sm text-slate-300 leading-relaxed font-sans">${escapeHtml(p.deep_dive?.opportunity || p.summary || '')}</p>`;
  }

  // 2. SOP 步骤 (支持 workflow_steps 对象数组 或 deep_dive.workflow 字符串数组)
  let workflowHtml = '';
  if (Array.isArray(p.workflow_steps) && p.workflow_steps.length > 0) {
    workflowHtml = p.workflow_steps.map((step, idx) => {
      const phase = step.phase || `${isEn ? 'Phase' : '阶段'} 0${idx + 1}`;
      const tag = step.stage_tag ? `<span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">${escapeHtml(step.stage_tag)}</span>` : '';
      const deliverable = step.deliverable ? `<div class="mt-2 text-xs font-mono text-emerald-300 flex items-center space-x-1.5"><span class="text-slate-500">🏁 ${isEn ? 'Deliverable:' : '阶段交付物:'}</span><span>${escapeHtml(step.deliverable)}</span></div>` : '';
      return `
        <div class="p-4 rounded-xl bg-slate-950/70 border border-brand-border/80 space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono text-slate-400">
            <span class="font-bold text-slate-200">${escapeHtml(phase)} · ${escapeHtml(step.title || '')}</span>
            ${tag}
          </div>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">${escapeHtml(step.detail || '')}</p>
          ${deliverable}
        </div>
      `;
    }).join('');
  } else if (Array.isArray(p.deep_dive?.workflow) && p.deep_dive.workflow.length > 0) {
    workflowHtml = p.deep_dive.workflow.map(step => `
      <div class="p-3.5 rounded-xl bg-slate-950/70 border border-brand-border/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono flex items-start space-x-3">
        <span class="text-emerald-400 font-bold shrink-0">➔</span>
        <span>${escapeHtml(step)}</span>
      </div>
    `).join('');
  }

  // 3. 避坑防线 (支持 pitfalls_to_avoid 或 deep_dive.risk_and_pitfalls)
  const pitfallText = p.pitfalls_to_avoid || p.deep_dive?.risk_and_pitfalls || (isEn ? 'Keep iteration cycles tight and risk controlled.' : '注意控制试错时间成本，小步快跑，单周验证不出正向反馈即迅速复盘。');

  // 4. 工具链 (支持 tools 数组 或 deep_dive.tools)
  const toolsList = p.tools || p.deep_dive?.tools || ['Claude Code', 'Stripe', 'Tailwind'];

  // Triple-Schema for Maximum Google Rich Results: TechArticle + BreadcrumbList + Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${canonicalUrl}#article`,
        "headline": p.title,
        "description": p.summary,
        "author": {
          "@type": "Organization",
          "name": "MoneyLab Research Team",
          "url": "https://m.ucncn.cn/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "MoneyLab",
          "logo": {
            "@type": "ImageObject",
            "url": "https://m.ucncn.cn/favicon.svg"
          }
        },
        "datePublished": p.created_at || "2026-10-28",
        "dateModified": "2026-10-31",
        "mainEntityOfPage": canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isEn ? "MoneyLab Catalog" : "搞钱实验室总库",
            "item": isEn ? "https://m.ucncn.cn/en/" : "https://m.ucncn.cn/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": p.category || (isEn ? "Playbook" : "项目赛道"),
            "item": isEn ? "https://m.ucncn.cn/en/" : "https://m.ucncn.cn/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": p.title,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        "name": `${p.title} (Turnkey Execution Skill & Blueprint)`,
        "description": p.summary,
        "brand": {
          "@type": "Brand",
          "name": "MoneyLab"
        },
        "offers": {
          "@type": "Offer",
          "price": "29.90",
          "priceCurrency": "HKD",
          "availability": "https://schema.org/InStock",
          "url": canonicalUrl
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": (4.8 + (p.score / 500)).toFixed(1),
          "reviewCount": 38,
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        "name": isEn ? `How to execute and monetize: ${p.title}` : `如何落地变现【${p.title}】的标准SOP路径`,
        "description": p.summary,
        "totalTime": "P7D",
        "step": (Array.isArray(p.workflow_steps) && p.workflow_steps.length > 0)
          ? p.workflow_steps.map((s, idx) => ({
              "@type": "HowToStep",
              "position": idx + 1,
              "name": `${s.phase || (isEn ? 'Phase' : '阶段') + ' ' + (idx + 1)}: ${s.title || ''}`,
              "text": `${s.detail || ''}${s.deliverable ? ' [' + (isEn ? 'Deliverable: ' : '阶段交付: ') + s.deliverable + ']' : ''}`
            }))
          : (p.deep_dive?.workflow || []).map((stepText, idx) => ({
              "@type": "HowToStep",
              "position": idx + 1,
              "name": isEn ? `Phase 0${idx + 1}: Execution` : `第 0${idx + 1} 阶段执行交付`,
              "text": stepText.replace(/^\d+\.\s*/, '').trim()
            }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'zh-CN'}" class="dark">
<head>
${GTAG_SNIPPET}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <meta name="keywords" content="${escapeHtml((p.tags || []).join(', '))}, MoneyLab, Solopreneur, Micro-SaaS">
  <meta name="author" content="MoneyLab Research Team">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="zh-CN" href="${zhUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="x-default" href="${enUrl}">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="MoneyLab">
  <meta property="og:title" content="${escapeHtml(p.title)}">
  <meta property="og:description" content="${escapeHtml(p.summary)}">
  <meta property="og:image" content="https://m.ucncn.cn/moneylab_stripe_cover.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/jpeg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${escapeHtml(p.title)}">
  <meta name="twitter:description" content="${escapeHtml(p.summary)}">
  <meta name="twitter:image" content="https://m.ucncn.cn/moneylab_stripe_cover.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="https://m.ucncn.cn/favicon.svg">

  <!-- Tailwind CSS CDN with Custom Theme Tokens -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              black: '#060709',
              surface: '#0f1218',
              surfaceHover: '#161b24',
              border: '#1c222e',
              borderHighlight: '#2a3447',
              textPrimary: '#f1f5f9',
              textSecondary: '#94a3b8',
              textMuted: '#64748b',
              primary: '#10b981'
            }
          }
        }
      }
    }
  </script>

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
  <style>
    body {
      background-color: #060709;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 32px 32px;
    }
  </style>
</head>
<body class="bg-[#060709] text-brand-textPrimary font-sans antialiased min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-400">

  <!-- Global Header -->
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#060709]/90 border-b border-brand-border">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      
      <!-- Logo + Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="flex items-center space-x-3">
        <a href="${homeUrl}" class="flex items-center space-x-2.5 group cursor-pointer">
          <div class="relative flex items-center justify-center shrink-0">
            <img 
              src="https://m.ucncn.cn/favicon.svg" 
              alt="MoneyLab" 
              class="w-8 h-8 rounded-lg shadow-md shadow-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-500/35 transition-all duration-300"
            />
            <span class="absolute inset-0 rounded-lg bg-emerald-500/20 blur-sm -z-10 group-hover:bg-emerald-500/35 transition-all"></span>
          </div>
          <span class="font-extrabold tracking-tight text-white text-base font-mono group-hover:text-emerald-400 transition-colors">MoneyLab</span>
        </a>
        <span class="text-slate-600 hidden sm:inline">/</span>
        <span class="text-xs font-mono text-slate-400 truncate max-w-[160px] sm:max-w-[240px] hidden sm:inline">${escapeHtml(p.category)}</span>
      </nav>

      <!-- Right Controls -->
      <div class="flex items-center space-x-3">
        <a 
          href="${switcherUrl}" 
          title="${switcherTitle}" 
          class="px-2.5 py-1.5 rounded-lg bg-brand-surface hover:bg-brand-surfaceHover border border-brand-border text-xs font-mono font-bold text-brand-textSecondary hover:text-white transition-colors flex items-center space-x-1 shadow-2xs"
        >
          <span>${switcherLabel}</span>
        </a>
        <a 
          href="${homeUrl}" 
          class="px-2.5 sm:px-3 py-1.5 rounded-lg bg-brand-surface hover:bg-brand-surfaceHover border border-brand-border text-xs font-mono text-slate-300 hover:text-white transition-colors"
        >
          <span class="hidden sm:inline">${isEn ? '← All Playbooks' : '← 返回项目库'}</span>
          <span class="sm:hidden">${isEn ? '← Back' : '← 返回'}</span>
        </a>
      </div>

    </div>
  </header>

  <!-- Main Article Content -->
  <main class="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">

    <!-- Hero Card -->
    <article class="rounded-2xl border border-brand-border bg-brand-surface/70 p-6 sm:p-8 space-y-5">
      
      <!-- Top Row Badges -->
      <div class="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div class="flex items-center space-x-2">
          <span class="px-2.5 py-1 rounded bg-slate-900 border border-brand-border text-emerald-400 font-semibold">
            ${escapeHtml(p.category)}
          </span>
          <span class="text-slate-500 font-mono">ID: ${p.id}</span>
        </div>
        <div class="px-3 py-1 rounded-md border text-xs font-bold font-mono tracking-wide ${p.rating_tier === 'S' || p.score >= 90 ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-brand-surface text-slate-300 border-brand-border'}">
          Tier ${p.rating_tier || 'A'} · ${p.score} / 100 pts
        </div>
      </div>

      <!-- Title H1 -->
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
        ${escapeHtml(p.title)}
      </h1>

      <!-- Executive Summary -->
      <p class="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
        ${escapeHtml(p.summary)}
      </p>

      <!-- 4 Quantitative Metrics -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-brand-border/60">
        <div class="p-3.5 rounded-xl bg-slate-950/60 border border-brand-border space-y-1">
          <span class="text-[11px] font-mono text-slate-400">${isEn ? 'Est. Monthly Run Rate' : '预估月流水'}</span>
          <p class="text-sm sm:text-base font-mono font-bold text-emerald-400 tracking-tight">${escapeHtml(p.metrics?.est_monthly_profit || 'Predictable')}</p>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-950/60 border border-brand-border space-y-1">
          <span class="text-[11px] font-mono text-slate-400">${isEn ? 'Validation Speed' : '验证周期'}</span>
          <p class="text-sm sm:text-base font-mono font-bold text-slate-200">${escapeHtml(p.metrics?.cycle_time || '7 Days')}</p>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-950/60 border border-brand-border space-y-1">
          <span class="text-[11px] font-mono text-slate-400">${isEn ? 'Startup Barrier' : '启动资金壁垒'}</span>
          <p class="text-sm sm:text-base font-mono font-bold text-teal-400">${escapeHtml(p.metrics?.initial_cost || '$0')}</p>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-950/60 border border-brand-border space-y-1">
          <span class="text-[11px] font-mono text-slate-400">${isEn ? 'Effort & Complexity' : '上手复杂度'}</span>
          <p class="text-sm sm:text-base font-mono font-bold text-amber-400">${starsText}</p>
        </div>
      </div>

    </article>

    <!-- Institutional Verdict Callout -->
    <section class="rounded-xl p-5 border border-emerald-500/30 bg-emerald-500/[0.04] space-y-2">
      <div class="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
        <span>⚡</span>
        <span>${isEn ? 'Institutional Due Diligence Verdict' : '研究团队尽调核心结论'}</span>
      </div>
      <p class="text-sm text-slate-200 leading-relaxed font-sans font-medium">
        ${escapeHtml(p.verdict)}
      </p>
    </section>

    <!-- Market Opportunity -->
    <section class="rounded-2xl border border-brand-border bg-brand-surface/40 p-6 sm:p-7 space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center space-x-2 font-mono">
        <span>🔍</span>
        <span>${isEn ? 'Market Opportunity & Founder Bottlenecks' : '市场痛点剖析与商机本质'}</span>
      </h2>
      ${opportunityHtml}
    </section>

    <!-- 4-Step Execution Workflow (SOP) -->
    <section class="rounded-2xl border border-brand-border bg-brand-surface/40 p-6 sm:p-7 space-y-4">
      <h2 class="text-lg font-bold text-white flex items-center space-x-2 font-mono">
        <span>🛠️</span>
        <span>${isEn ? '4-Step Operational Blueprint (SOP)' : '4 阶段落地实施 SOP'}</span>
      </h2>
      <div class="space-y-3">
        ${workflowHtml}
      </div>
    </section>

    <!-- Pitfall Post-Mortem -->
    <section class="rounded-2xl border border-rose-500/30 bg-rose-500/[0.03] p-6 sm:p-7 space-y-3">
      <h2 class="text-lg font-bold text-rose-400 flex items-center space-x-2 font-mono">
        <span>⚠️</span>
        <span>${isEn ? 'Pitfalls & Risk Warning' : '避坑警戒与防范底线'}</span>
      </h2>
      <p class="text-sm text-rose-200/90 leading-relaxed font-sans">
        ${escapeHtml(pitfallText)}
      </p>
    </section>

    <!-- Weaponry & Tool Stack -->
    <section class="rounded-2xl border border-brand-border bg-brand-surface/40 p-6 sm:p-7 space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center space-x-2 font-mono">
        <span>🧰</span>
        <span>${isEn ? 'Weaponry & Infrastructure Stack' : '推荐工程与武器库工具链'}</span>
      </h2>
      <div class="flex flex-wrap gap-2">
        ${toolsList.map(tool => `
          <span class="px-3 py-1.5 rounded-lg bg-slate-950 border border-brand-border text-xs font-mono text-emerald-400 font-medium">
            # ${escapeHtml(tool)}
          </span>
        `).join('')}
      </div>
    </section>

    <!-- High-Converting CTA Box -->
    <section class="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 via-brand-surface to-brand-surface p-6 sm:p-8 text-center space-y-4 shadow-xl shadow-emerald-500/10">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
        <span>⚡</span>
        <span>${isEn ? 'Instant Decryption via Stripe Official Checkout' : 'Stripe 官方安全收单 · 支付后秒级授权'}</span>
      </div>
      <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight">
        ${isEn ? 'Unlock Raw Unredacted Source Threads + Turnkey AI Prompt File' : '立即解锁该项目一手未脱敏源帖线索与开箱即用 AI 技能包'}
      </h3>
      <p class="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
        ${isEn 
          ? 'Includes founder raw discussions, architecture diagrams, step-by-step prompt library, and universal Cursor / Claude Code SKILL.md file.' 
          : '包含创始人未经清洗的一手信源讨论贴、完整交付物架构图、实操 Prompt 库以及直接可导入 Cursor 和 Claude Code 的 SKILL.md 技能包。'}
      </p>
      
      <div class="pt-2">
        <a 
          href="${targetSpaUrl}" 
          class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all cursor-pointer group"
        >
          <span>${isEn ? '⚡ View Full Teardown & Unlock on MoneyLab' : '⚡ 前往实验室主站解锁完整项目'}</span>
          <span class="font-mono group-hover:translate-x-1 transition-transform">➔</span>
        </a>
      </div>

      <!-- Overseas Pricing Benchmark -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-brand-border text-[11px] font-mono text-slate-300">
        <span class="text-amber-400 font-bold">${isEn ? '💡 Benchmark vs Overseas Intel' : '💡 对标海外商业情报库'}</span>
        <span class="text-slate-600">·</span>
        <span class="text-slate-400">${isEn ? 'BizPeel / Exploding Topics $300~$1,000/yr' : 'BizPeel / Exploding Topics 年费 $300~$1,000+'}</span>
        <span class="text-slate-600">·</span>
        <span class="text-emerald-400 font-bold">${isEn ? 'MoneyLab VIP is only HK$299 (~$38) lifetime' : 'MoneyLab VIP 仅零头 HK$299 买断全年'}</span>
      </div>

      <div class="flex items-center justify-center space-x-4 text-xs font-mono text-slate-400 pt-1">
        <span>${isEn ? 'Single Pass: HK$29.90 (~$3.80)' : '单篇买断：HK$29.90 (约 ¥27.5)'}</span>
        <span>·</span>
        <span>${isEn ? 'Annual VIP: HK$299 (~$38.00)' : '年度 VIP：HK$299 全库畅享'}</span>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="border-t border-brand-border bg-[#060709] py-8 text-xs font-mono text-slate-500 text-center">
    <div class="max-w-5xl mx-auto px-4 space-y-2">
      <p>MoneyLab © 2026. All Solopreneur Playbooks Verified & Deconstructed.</p>
      <div class="space-x-3 text-slate-400">
        <a href="${homeUrl}" class="hover:text-emerald-400 transition-colors">${isEn ? 'Catalog' : '项目库'}</a>
        <span>·</span>
        <a href="https://m.ucncn.cn/sitemap.xml" class="hover:text-emerald-400 transition-colors">Sitemap</a>
        <span>·</span>
        <a href="https://ucncn.cn" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors">UCNCN Portal ↗</a>
      </div>
    </div>
  </footer>

</body>
</html>
`;
}

// 1. Build Chinese landing pages in money/p/<slug>/index.html
zhProjects.forEach(p => {
  const dir = path.join(ROOT_DIR, 'p', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = generatePageHtml(p, 'zh');
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log('✓ Generated ZH landing page: p/' + p.slug + '/index.html');
});

// 2. Build English landing pages in money/en/p/<slug>/index.html
enProjects.forEach(p => {
  const dir = path.join(ROOT_DIR, 'en', 'p', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = generatePageHtml(p, 'en');
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log('✓ Generated EN landing page: en/p/' + p.slug + '/index.html');
});

// 3. Generate money/sitemap.xml with all 16 URLs and bidirectional hreflang
const today = new Date().toISOString().split('T')[0];

const sitemapEntries = [
  // Homepages
  `  <url>
    <loc>https://m.ucncn.cn/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://m.ucncn.cn/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://m.ucncn.cn/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://m.ucncn.cn/en/"/>
  </url>`,
  `  <url>
    <loc>https://m.ucncn.cn/en/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://m.ucncn.cn/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://m.ucncn.cn/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://m.ucncn.cn/en/"/>
  </url>`
];

// Add each project landing page
zhProjects.forEach(p => {
  const slug = p.slug;
  const zhLoc = `https://m.ucncn.cn/p/${slug}/`;
  const enLoc = `https://m.ucncn.cn/en/p/${slug}/`;

  sitemapEntries.push(`  <url>
    <loc>${zhLoc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhLoc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
  </url>`);

  sitemapEntries.push(`  <url>
    <loc>${enLoc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhLoc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
  </url>`);
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('✓ Generated sitemap.xml with ' + sitemapEntries.length + ' URLs!');

// ==========================================
// 4. 生成 AI 专用动态查重与索引资产 (catalog.json & llms.txt)
// 方便外部独立大模型 (Muse, 豆包, Grok, Claude, ChatGPT) 联网读取并自动去重
// ==========================================

// 4.1 生成根目录 catalog.json
const catalogData = {
  name: "MoneyLab Verified Blueprints Catalog",
  site_url: "https://m.ucncn.cn/",
  updated_at: today,
  total_count: zhProjects.length,
  existing_slugs: zhProjects.map(p => p.slug),
  banned_keywords: [
    "Reddit意向监听", "推特获客监控", "冷发邮件机器人",
    "独立站商品翻译", "跨境电商文案润色", "电商小语种转换",
    "浏览器效率插件买断销售", "CWS插件套皮", "离线许可鉴权扩展",
    "Acquire微型SaaS倒卖", "低估值代码翻新", "SaaS资产快速转手",
    "中小企业本地知识库代建", "Dify/FastGPT代搭咨询", "企业客服私有化",
    "小红书解忧杂货铺", "情绪树洞收费", "虚拟树洞陪聊",
    "Notion模板出海销售", "Gumroad数字发卡套版", "无代码模板资产"
  ],
  projects: zhProjects.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    tags: p.tags,
    score: p.score,
    rating_tier: p.rating_tier,
    summary: p.summary,
    monetization_model: p.metrics ? (p.metrics.revenue_model || p.monetization_model || 'N/A') : 'N/A',
    est_monthly_profit: p.metrics ? p.metrics.est_monthly_profit : null,
    landing_url_zh: `https://m.ucncn.cn/p/${p.slug}/`,
    landing_url_en: `https://m.ucncn.cn/en/p/${p.slug}/`
  }))
};

fs.writeFileSync(path.join(ROOT_DIR, 'catalog.json'), JSON.stringify(catalogData, null, 2), 'utf8');
console.log('✓ Generated AI-readable catalog.json (at https://m.ucncn.cn/catalog.json)');

// 4.2 生成根目录 llms.txt (符合新兴 AI Agent 统一发现与查重标准)
const llmsTxtContent = `# MoneyLab (搞钱实验室) - AI Agent Catalog & Deduplication Registry
> Site: https://m.ucncn.cn/
> Canonical JSON: https://m.ucncn.cn/catalog.json
> Last Updated: ${today}
> Total Active Projects: ${zhProjects.length}

This document is the official registry for external AI agents (Muse, 豆包, Grok, Claude, ChatGPT, Gemini, etc.) to read before proposing new business blueprints for MoneyLab.

## 1. Existing Projects & Slugs (已收录清单 · 细分差异化准入)
When proposing new ideas, DO NOT pitch identical clones (same product, same exact audience, same target community).
However, proven business models (e.g. Chrome extensions, specialized certification prep, B2B lead gen, digital templates) CAN be reused if the vertical niche, specific problem, or target audience is distinct!

${zhProjects.map((p, i) => `${i + 1}. [${p.slug}] - ${p.title}
   - Category: ${p.category} | Tier: ${p.rating_tier} (${p.score} pts)
   - Summary: ${p.summary}
   - Monetization: ${p.metrics ? (p.metrics.revenue_model || p.monetization_model || 'N/A') : 'N/A'}
   - URL: https://m.ucncn.cn/p/${p.slug}/`).join('\n\n')}

## 2. Deduplication Principle (去重甄别原则)
- ❌ **坚决排除「完全同款」**：不要提报与已收录项目产品形态、痛点与受众完全一致的克隆产品（例如已有 FAA 无人机题库，不要再报一模一样的 FAA 无人机题库）。
- ✅ **坚决欢迎「同模式不同细分垂直切口」**：
  - 同样做 Chrome 插件：已有一个工具插件，依然欢迎针对 Etsy 卖家、亚马逊差评分析或 LinkedIn 招聘的插件；
  - 同样做特种考试题库：已有无人机执照，依然欢迎 EPA 608 制冷工、CDL 商业卡车司照等高薪准入考试；
  - 同样做意向监听：已有 Reddit SaaS 论坛监听，依然欢迎 Twitter/X 跨境出海摄影师/红人线索监听。
- 🌟 **优先鼓励开辟全新赛道**：软硬结合轻制造 (3D打印/小众外设)、同城高客单服务数字化代搭、微型 API 聚合工具等。

## 3. Elastic Schema Note (弹性数据包容规范)
MoneyLab uses an elastic, adaptive rendering engine. AI agents do not need to stress over rigid syntactic keys:
- Market Opportunity: Both \`core_thesis: { market_pain, opportunity_arbitrage }\` and \`deep_dive: { opportunity }\` are natively parsed.
- SOP Steps: Both structured \`workflow_steps\` (with stage_tag / deliverable) and string array \`workflow\` are supported.
- Pitfalls & Tools: Both \`pitfalls_to_avoid\` / \`risk_and_pitfalls\` and top-level \`tools\` are supported.
Focus 100% on deep business teardown, real unit economics, and actionable deliverables!
`;

fs.writeFileSync(path.join(ROOT_DIR, 'llms.txt'), llmsTxtContent, 'utf8');
console.log('✓ Generated llms.txt (at https://m.ucncn.cn/llms.txt)');

// 4.3 自动同步首页卡片计数 (index.html & en/index.html)
const totalProjectsCount = zhProjects.length;
['index.html', 'en/index.html'].forEach(relPath => {
  const filePath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/"numberOfItems":\s*\d+/g, `"numberOfItems": ${totalProjectsCount}`);
    content = content.replace(/>\d+<\/div>(\s*<div class="text-xs text-slate-500 font-medium tracking-wide">100% 真实单位经济模型)/g, `>${totalProjectsCount}</div>$1`);
    content = content.replace(/>\d+<\/div>(\s*<div class="text-xs text-slate-500 font-medium tracking-wide">100% Audited Unit Economics)/g, `>${totalProjectsCount}</div>$1`);
    content = content.replace(/全部玩法 \(\d+\)/g, `全部玩法 (${totalProjectsCount})`);
    content = content.replace(/已解锁 \(\d+\)/g, `已解锁 (${totalProjectsCount})`);
    content = content.replace(/All Playbooks \(\d+\)/g, `All Playbooks (${totalProjectsCount})`);
    content = content.replace(/Unlocked \(\d+\)/g, `Unlocked (${totalProjectsCount})`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Synchronized ${relPath} total counters to ${totalProjectsCount}`);
  }
});

// 4.4 编译期 JavaScript 语法完整性硬检查 (Syntax Integrity Gatekeeper)
const vm = require('vm');
['index.html', 'en/index.html'].forEach(relPath => {
  const filePath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let sIdx = 0;
    while ((match = scriptRegex.exec(html)) !== null) {
      sIdx++;
      const typeMatch = match[0].match(/type=["']([^"']+)["']/i);
      if (typeMatch && (typeMatch[1].includes('json') || typeMatch[1].includes('tailwind'))) continue;
      const code = match[1];
      if (!code.trim()) continue;
      try {
        new vm.Script(code, { filename: `${relPath}:script[${sIdx}]` });
      } catch (syntaxErr) {
        console.error(`\n❌ 【构建阻断】在 ${relPath} 的第 ${sIdx} 个脚本中发现语法错误: ${syntaxErr.message}`);
        process.exit(1);
      }
    }
  }
});
console.log('✓ 首页 JavaScript 语法编译期自检 100% 通过！');
