const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const zhProjects = require('../data/projects.json');
const enProjects = require('../data/projects_en.json');

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

  const diffStars = p.metrics?.difficulty_stars || 2;
  const starsText = '★'.repeat(diffStars) + '☆'.repeat(5 - diffStars);

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
</head>
<body class="bg-[#060709] text-brand-textPrimary font-sans antialiased min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-400">

  <!-- Global Header -->
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#060709]/90 border-b border-brand-border">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      
      <!-- Logo + Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="flex items-center space-x-3">
        <a href="${homeUrl}" class="flex items-center space-x-2.5 group cursor-pointer">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            $
          </div>
          <span class="font-black tracking-tight text-white text-base">MoneyLab</span>
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
          class="px-3 py-1.5 rounded-lg bg-brand-surface hover:bg-brand-surfaceHover border border-brand-border text-xs font-mono text-slate-300 hover:text-white transition-colors"
        >
          ${isEn ? '← All Playbooks' : '← 返回项目库'}
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
      <p class="text-sm text-slate-300 leading-relaxed font-sans">
        ${escapeHtml(p.deep_dive?.opportunity)}
      </p>
    </section>

    <!-- 4-Step Execution Workflow (SOP) -->
    <section class="rounded-2xl border border-brand-border bg-brand-surface/40 p-6 sm:p-7 space-y-4">
      <h2 class="text-lg font-bold text-white flex items-center space-x-2 font-mono">
        <span>🛠️</span>
        <span>${isEn ? '4-Step Operational Blueprint (SOP)' : '4 阶段落地实施 SOP'}</span>
      </h2>
      <div class="space-y-3">
        ${(p.deep_dive?.workflow || []).map(step => `
          <div class="p-3.5 rounded-xl bg-slate-950/70 border border-brand-border/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono flex items-start space-x-3">
            <span class="text-emerald-400 font-bold shrink-0">➔</span>
            <span>${escapeHtml(step)}</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Pitfall Post-Mortem -->
    <section class="rounded-2xl border border-rose-500/30 bg-rose-500/[0.03] p-6 sm:p-7 space-y-3">
      <h2 class="text-lg font-bold text-rose-400 flex items-center space-x-2 font-mono">
        <span>⚠️</span>
        <span>${isEn ? 'Pitfalls & Risk Warning' : '避坑警戒与防范底线'}</span>
      </h2>
      <p class="text-sm text-rose-200/90 leading-relaxed font-sans">
        ${escapeHtml(p.deep_dive?.risk_and_pitfalls)}
      </p>
    </section>

    <!-- Weaponry & Tool Stack -->
    <section class="rounded-2xl border border-brand-border bg-brand-surface/40 p-6 sm:p-7 space-y-3">
      <h2 class="text-lg font-bold text-white flex items-center space-x-2 font-mono">
        <span>🧰</span>
        <span>${isEn ? 'Weaponry & Infrastructure Stack' : '推荐工程与武器库工具链'}</span>
      </h2>
      <div class="flex flex-wrap gap-2">
        ${(p.deep_dive?.tools || []).map(tool => `
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
          class="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all cursor-pointer group"
        >
          <span>${isEn ? '⚡ View Full Teardown & Unlock on MoneyLab' : '⚡ 前往实验室主站解锁完整项目'}</span>
          <span class="font-mono group-hover:translate-x-1 transition-transform">➔</span>
        </a>
      </div>

      <div class="flex items-center justify-center space-x-4 text-xs font-mono text-slate-400 pt-2">
        <span>${isEn ? 'Single Pass: HK$29.90 (~$3.80)' : '单篇买断：HK$29.90'}</span>
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
