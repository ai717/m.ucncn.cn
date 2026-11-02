const fs = require('fs');
const path = require('path');

const enIndexPath = path.join(__dirname, '../en/index.html');
let html = fs.readFileSync(enIndexPath, 'utf8');

// Rich English data for all 7 projects
const enEnrichments = {
  "ml-cloud-test-001": {
    opportunity: "Early-stage B2B founders and solo developers face one critical bottleneck: getting their first paying customers. Founders waste 2-3 hours daily manually sifting through Reddit and Twitter, or pay $100-$300/mo for bloated social listening tools filled with irrelevant noise (job seekers, tutorials, memes).\n\nCore Thesis & Value Arbitrage: When a buyer posts on Reddit asking for 'alternatives to expensive competitor X' or 'recommend a tool for bottleneck Y', their purchase intent is at its peak. By building a zero-cost, self-healing Python listener using public JSON endpoints, coupled with Claude 3.5 / DeepSeek 4-dimensional intent scoring (filtering 95% noise), you deliver high-converting, non-spammy warm outreach. A solo founder can offer 'Done-For-You Lead Generation' at $299-$499/mo or sell real-time webhook alerts at $29-$49/mo with >90% net margins.",
    workflow: [
      "Phase 01 · Target Community Mapping & Intent Regex: Audit 10 high-intent subreddits (r/SaaS, r/startups, r/automation). Configure 3-tier regex patterns for Competitor Frustration ('alternative to', 'tired of paying'), Explicit Budget ('recommend a tool', 'willing to pay'), and negative keyword filters to weed out job posts and spam.",
      "Phase 02 · Zero-Cost Self-Healing Ingestion Engine: Build a lightweight Python listener streaming public JSON endpoints with randomized User-Agent rotation, exponential 429 backoff, and atomic deduplication via local seen_ids, achieving resilient 24/7 autonomous monitoring.",
      "Phase 03 · 4-Dimensional AI Scoring Protocol: Pipe ingested threads into Claude 3.5 / DeepSeek evaluating Pain Severity (30), Budget Intent (30), Solution Fit (20), and Decision Maker Authority (20). High-conviction leads (score >= 70) yield structured buyer personas and hyper-personalized icebreakers.",
      "Phase 04 · Value-First 3-Touch Cold Outreach Playbook: Source verified founder emails via Apollo or GitHub. Execute a 3-touch sequence: Day 1 Permission-to-Demo (no hard pitching) + Day 3 Frictionless Value Drop (free template) + Day 7 Graceful Break-up, achieving a verified 42%+ open rate."
    ]
  },
  "ml-20261028-006": {
    opportunity: "Over 70% of non-English shoppers (Spanish, German, Arabic, Southeast Asia) abandon cross-border e-commerce carts when encountering robotic machine-translated copy. Standard agency translation costs $0.08-$0.15/word—prohibitive for independent merchants—while Google Translate lacks e-commerce conversion psychology, local slang, and trust-building cues.\n\nCore Thesis & Value Arbitrage: Open-source DeepSeek and lightweight LLM API costs have dropped to pennies per million tokens while delivering human-grade cultural copywriting. By packaging this into a native Shopify embedded app focused purely on 'cart abandonment recovery via cultural localization', merchants see a measurable 15%-25% lift in checkout conversion. Merchants gladly pay $19-$49/mo recurring subscriptions for quantifiable ROI.",
    workflow: [
      "Phase 01 · Niche & Drop-Off Research: Audit the Shopify Community and cross-border seller forums for high-AOV stores with heavy non-English checkout abandonment. Collect poorly translated competitor storefronts as testing baselines.",
      "Phase 02 · Conversion-Engineered Prompt Chains & API Pipeline: Build tailored DeepSeek prompt sequences that adapt idiomatic expressions, regional slang, and local currency reassurance badges, caching outputs via Redis to keep unit translation costs under $0.05 per store.",
      "Phase 03 · Shopify App Store Listing & Frictionless Onboarding: Package the solution using Shopify App Bridge. Launch with a generous 14-day free trial and 50,000 complimentary translated words to capture organic search traffic from the App Store.",
      "Phase 04 · Retention Engine & Multi-Store Expansion: Provide an analytics dashboard highlighting 'Estimated Revenue Saved via Localization'. Trigger automated upgrade emails as store catalog volume scales, securing predictable recurring MRR."
    ]
  },
  "ml-20261028-001": {
    opportunity: "The Chrome Web Store is one of the highest-leverage discovery channels for solo developers. Modern knowledge workers (sales reps, recruiters, SEO analysts, e-commerce managers) spend over 80% of their workday inside browser tabs and readily pay $4.99/mo or $29 for lifetime access to tools that eliminate 15 minutes of repetitive daily clicking.\n\nCore Thesis & Value Arbitrage: Browser extensions execute client-side on the user's machine, resulting in virtually zero server infrastructure overhead. Unlike standalone web apps that demand heavy paid acquisition, the Chrome Web Store provides high-intent organic search volume. A solo builder can deploy single-utility extensions with LemonSqueezy/Stripe billing, amassing 200-500 subscribers for a reliable $1,000-$4,500/mo passive income stream.",
    workflow: [
      "Phase 01 · Chrome Web Store 3-Star Review Mining: Audit mid-tier competitor extensions on the Chrome Web Store and ProductHunt. Pinpoint recurring user complaints ('bloated features', 'sluggish UI', 'missing single-click export') to define a hyper-focused MVP scope.",
      "Phase 02 · Manifest V3 Lean Development: Build the extension within 48-72 hours using Cursor and Claude, strictly adhering to minimal permission requests to guarantee rapid Google Web Store review approval.",
      "Phase 03 · Merchant-of-Record (MoR) License Key Architecture: Integrate LemonSqueezy or Stripe checkout within the extension options popup. Validate encrypted license keys with local cache fallback for seamless offline functionality.",
      "Phase 04 · Storefront SEO & Organic Community Seeding: Optimize the listing title and description with targeted high-volume search phrases. Produce an 800x600 preview video, and seed the tool authentically on Reddit (r/sales, r/productivity) as an indie solution to a shared frustration."
    ]
  },
  "ml-20261028-002": {
    opportunity: "Many technical founders excel at building MVPs in 1-2 weeks but suffer burnout when faced with multi-year customer support, content marketing, and enterprise sales. Meanwhile, micro-private equity buyers and non-technical entrepreneurs on Acquire.com and Microns actively hunt for clean, operational micro-SaaS assets with verified cash flow ($300-$1,500 MRR).\n\nCore Thesis & Value Arbitrage: Rather than grinding a single product for years, solo builders can operate a high-velocity studio model: build single-utility tools using modern boilerplates (Next.js + Supabase + Stripe), bootstrap initial traction to 15-30 paying customers, and flip the asset on Acquire.com at 2.5x-3.5x ARR multiples. Each exit nets $5,000-$25,000 in upfront cash with 3-4 liquidity events per year.",
    workflow: [
      "Phase 01 · 72-Hour Rapid MVP Sprint: Leverage open-source full-stack boilerplates to solve a single, acute workflow need (e.g. niche webhook backup, automated invoice PDF parsing), launching a functional product in under 3 days.",
      "Phase 02 · Seed Traction & Stripe Audit Proof: Secure the first 10-20 paying users via targeted ProductHunt launch, BetaList, and 50 direct cold emails, establishing 30 days of clean, unrefunded Stripe transaction history.",
      "Phase 03 · Standardized Asset Packaging & Due Diligence Dossier: Consolidate comprehensive code documentation, API credentials, Google Analytics cohort retention, and an unredacted P&L statement to ensure zero friction during buyer audits.",
      "Phase 04 · Acquire.com Listing & Escrow Settlement: List at a realistic 2.5x-3x ARR valuation multiple. Screen qualified buyers under NDA, and execute domain, GitHub repo, and Stripe account transfer smoothly through Escrow.com."
    ]
  },
  "ml-20261028-003": {
    opportunity: "Young demographics across urban centers face unprecedented workplace burnout, lifestyle fatigue, and social isolation. Traditional therapy carries a steep barrier ($100-$200/hr), and friends often feel uncomfortable discussing deep personal insecurities. Consumers display high impulse purchasing intent for low-ticket ($4.90-$19.90), high-empathy digital wellness and affirmation assets.\n\nCore Thesis & Value Arbitrage: Platforms like TikTok, Instagram Reels, and Xiaohongshu drive massive emotional resonance. By coupling cinematic aesthetic visual imagery with deeply relatable, minimalist reflections on modern life, traffic converts frictionlessly into automated digital downloads (Notion life-design planners, AI-curated reflection letters, mindfulness audio files). With zero physical inventory, instant webhook delivery, and 98% gross margins, a single creator generates steady daily cashflow.",
    workflow: [
      "Phase 01 · Aesthetic Visual Asset & Copywriting Architecture: Batch-generate cinematic, nostalgic photography or film-grain backgrounds using Midjourney / NanoBanana. Craft micro-essays targeting universal pain points (imposter syndrome, emotional fatigue, quiet ambition).",
      "Phase 02 · High-Converting Engagement Hooks: Include subtle calls-to-action in comments ('Comment 1 for the free 7-day evening reflection guide') to distribute lead-magnet templates via compliant automated DMs.",
      "Phase 03 · Instant Digital Delivery Engine: Deploy a zero-friction Gumroad or lightweight digital checkout page. Upon purchase, buyers instantly receive formatted, personalized wellness reflection prompts and interactive Notion operating systems.",
      "Phase 04 · Owned Audience & High-Ticket Expansion: Funnel digital buyers into a private email newsletter or community channel, introducing monthly wellness subscriptions and bespoke digital life audits to maximize customer lifetime value (LTV)."
    ]
  },
  "ml-20261028-004": {
    opportunity: "Traditional small businesses (law practices, training academies, accounting firms, dental clinics) lose up to 70% of inbound website and social media leads due to slow, delayed response times outside business hours. While business owners recognize AI's potential, they lack in-house technical engineering to deploy proprietary knowledge bases, and generic SaaS platforms fail to ensure data confidentiality.\n\nCore Thesis & Value Arbitrage: This represents a high-ticket, high-retention AI consulting service. By orchestrating open-source RAG engines (Dify, FastGPT, Ollama) with a client's proprietary FAQs, service catalog, and sales objection playbooks, you deploy a 24/7 autonomous digital consultant. Solo operators charge an initial setup fee of $800-$2,500 plus a recurring $200-$500/mo maintenance retainer, yielding an exceptionally profitable boutique agency.",
    workflow: [
      "Phase 01 · Local SMB Lead Leakage Audit: Identify local businesses in high-AOV verticals (legal, vocational training, specialized healthcare) with static inquiry forms or unmonitored live chats to build an irresistible cold pitch.",
      "Phase 02 · 3-Minute Interactive Prototype Build: Ingest the prospect's public website and customer FAQs into Dify to construct a working demo. Record a 60-second Loom showing the AI accurately answering niche questions and booking consultations.",
      "Phase 03 · Executive Pitch & Retainer Agreement: Demonstrate the stark contrast between traditional staff costs and an always-on AI assistant. Offer a 7-day risk-free pilot and close with a standard service agreement covering setup and monthly hosting.",
      "Phase 04 · Private Deployment & Prompt Fine-Tuning: Host the knowledge base on secure cloud instances, enforce strict hallucination guardrails and objection-handling rules, and deliver monthly conversion reports to guarantee perpetual client retention."
    ]
  },
  "ml-20261028-005": {
    opportunity: "Western consumers possess high purchasing power and willingness to pay ($15-$35) for aesthetic digital operating systems (ADHD productivity dashboards, zero-based personal budget spreadsheets, freelance business hubs). Etsy is a mature, high-converting marketplace with millions of buyers searching with immediate checkout intent.\n\nCore Thesis & Value Arbitrage: Digital templates embody the ultimate business model: create once, sell infinitely with zero marginal production cost. Because Western buyers prioritize minimalist Scandinavian aesthetics and clean functional hierarchies, pairing automated Notion formulas with photorealistic iPad/desktop mockups creates overwhelming competitive advantage over amateur listings. At $12-$29 per bundle, a collection of 5-10 listings delivers hundreds of pure profit monthly sales.",
    workflow: [
      "Phase 01 · Etsy Search Mining & Negative Review Audits: Mine autocomplete search terms ('Notion budget template 2026', 'Notion ADHD planner'). Audit 1-3 star reviews on bestseller listings to pinpoint user frustrations (broken formulas, confusing onboarding, lack of mobile views).",
      "Phase 02 · Ergonomic Dashboard Architecture: Engineer a frictionless Notion workspace with automated progress tracking, linked relational databases, and quick-capture mobile widgets, accompanied by step-by-step GIF setup walkthroughs.",
      "Phase 03 · Studio-Grade Mockup Rendering & 13 SEO Tags: Design 10 high-resolution iPad and desktop lifestyle mockups using Figma and Canva, highlighting tangible value callouts. Maximize all 13 Etsy SEO tag slots with high-intent keywords to capture page-one organic search.",
      "Phase 04 · Instant Fulfillment & 5-Star Review Stacking: Configure Etsy's native instant digital delivery, providing a polished PDF containing the one-click template duplicate link. Offer a free companion bonus widget inside the onboarding guide to incentivize 5-star photo reviews."
    ]
  }
};

// Match EMBEDDED_PROJECTS in html and update deep_dive
const regex = /const EMBEDDED_PROJECTS = (\[[\s\S]*?\]);/;
const match = html.match(regex);
if (match) {
  const currentProjects = JSON.parse(match[1]);
  currentProjects.forEach(p => {
    if (enEnrichments[p.id]) {
      p.deep_dive.opportunity = enEnrichments[p.id].opportunity;
      p.deep_dive.workflow = enEnrichments[p.id].workflow;
    }
  });
  html = html.replace(regex, `const EMBEDDED_PROJECTS = ${JSON.stringify(currentProjects)};`);
  fs.writeFileSync(enIndexPath, html, 'utf8');
  console.log('✓ Successfully enriched EMBEDDED_PROJECTS in money/en/index.html!');
} else {
  console.error('Could not find EMBEDDED_PROJECTS in money/en/index.html');
}
