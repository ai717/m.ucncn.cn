# 🧠 MoneyLab 项目专属高价值 Skill 生产指导总纲 (Meta-Skill Guide v2.0)
> **适用对象**: Gemini 1.5/2.0 Pro、Grok 2/3、Claude 3.5 Sonnet、Antigravity 及本地 Agent  
> **核心使命**: 指导大模型自主阅读任意微型商业尽调项目，提取其独有的商业基因，产出**100% 个性化、零模板化套用、具备极高工程与商业密度的单项目专属 `SKILL.md` 交付资产**。

---

## ⚠️ 绝对禁令：杜绝“模板化套用”与“占位符忽悠” (Anti-Pattern Warning)

在生产单项目 `SKILL.md` 时，必须严格执行以下红线：
1. **严禁千篇一律套用模板**：严禁将单一项目的物料（如 Reddit 监听代码、英文冷发邮件）生搬硬套到 Chrome 插件、小红书虚拟电商、Notion 模板或微型并购项目中；
2. **严禁以 `// TODO` 或“待编写”一笔带过**：模块三的工程代码必须是可以直接复制运行、真实可用的生产级核心源码或配置（如完整的 Manifest V3 + License 校验、FastAPI 接口、或完整的 Notion 数据库公式），严禁写伪代码；
3. **每个项目必须白手定制专属物料**：严格依据其独特的**交付载体、商业客群、变现路径与技术形态**，独立产出高密度的工程与运营资产。

---

## 🎯 第一部分：项目商业基因解剖与五大原型路由 (Archetype Routing)

当 Agent 拿到一个新的商业项目时，必须首先判定其归属于以下哪一类**核心商业原型**，并严格路由到该原型专属的资产结构：

```
                              [新项目尽调输入]
                                     │
         ┌──────────────┬────────────┴────────────┬──────────────┬──────────────┐
         ▼              ▼                         ▼              ▼              ▼
   【原型 A】       【原型 B】                【原型 C】       【原型 D】       【原型 E】
  B2B 获客监听    客户端浏览器扩展          企业 AI 封装服务   数字化虚拟资产   微型资产并购转手
 (Reddit/Twitter) (Chrome Extension)         (Shopify/RAG)       (Notion/小红书)  (Acquire.com)
```

---

### 原型 A：B2B 获客与强意向信号监听引擎 (Outbound & LeadGen)
* **典型代表**: Reddit 商业痛点监听器、Twitter 意向抓取、Apollo 潜客自动化挖掘。
* **官方黄金标杆范本**: [`money/skills/reddit-leadgen-cold-email-bot/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/reddit-leadgen-cold-email-bot/SKILL.md)
* **核心商业机制**: 在潜在买家公开抱怨竞品或寻求替代工具的瞬间，以极低成本捕获信号并执行同行共情触达。
* **专属交付资产（必须包含）**:
  1. 目标社区阵地画像与三阶买意关键词（绝望型 / 明确预算型 / 痛点型）及负向噪音正则；
  2. 免 API 权限的自愈型数据监听源码（含 429 退避与原子去重）；
  3. Claude 3.5 / DeepSeek 0~100 分量化打分 Prompt 链；
  4. 实测 40%+ 打开率的 3 轮冷发邮件/私信追击话术（Permission-to-Demo、免费排坑模板、优雅断联）；
  5. 域名防封控体系（SPF、DKIM、DMARC、预热节奏）与 $5 零成本运行基建。

---

### 原型 B：客户端实用工具与浏览器插件 (Client-Side & Browser Extensions)
* **典型代表**: 垂直领域 Chrome 插件、桌面小工具、特定工作流剪藏器。
* **官方黄金标杆范本**: [`money/skills/niche-chrome-extension-monetization/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/niche-chrome-extension-monetization/SKILL.md)
* **核心商业机制**: 依靠 Chrome Web Store (CWS) 庞大的自然搜索流量，以零服务器云端成本解决每天高频 15 分钟机械操作。
* **专属交付资产（必须包含）**:
  1. 完整的 Manifest V3 极简核心工程架构与权限最小化配置（防 Google 驳回）；
  2. Merchant of Record (MoR · 如 LemonSqueezy / Stripe) 许可密钥激活与 7 天离线免联网缓存校验代码；
  3. Chrome 应用商店 SEO 标题与 13 个长尾搜索词布局矩阵；
  4. 解决特定场景单一高频痛点的核心 JavaScript / DOM 业务逻辑源码；
  5. 应对 Google 审核严苛政策的 Single Purpose 合规申报与隐私权限声明模版。

---

### 原型 C：垂直行业 AI 封装与企业私域服务 (AI Wrappers & B2B Solutions)
* **典型代表**: Shopify 独立站小语种本地化插件、本地律所/教培私域 RAG 问答机器人。
* **官方黄金标杆范本**: 
  - Shopify 插件: [`money/skills/deepseek-crossborder-localization-tool/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/deepseek-crossborder-localization-tool/SKILL.md)
  - 本地企业 RAG: [`money/skills/local-rag-agent-consulting/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/local-rag-agent-consulting/SKILL.md)
* **核心商业机制**: 传统企业缺乏技术团队部署大模型，愿为“减少客户流失、提高结账转化率”支付高额搭建费与月度维护费。
* **专属交付资产（必须包含）**:
  1. 解决特定垂直领域转化心理学的核心 Prompt 编排链（电商本土化俚语润色、行业客服反幻觉防护）；
  2. 生产级 Webhook 签名 HMAC 校验与 API 调度核心源码 (`server.js` 或 FastAPI)；
  3. 面向传统企业老板的高客单销售报价单、投入产出比（ROI）测算表与标准技术服务代运维合同 (SLA)；
  4. 向量知识库切片规范、敏感词拦截机制与数据安全隐私承诺 (NDA)。

---

### 原型 D：高审美数字化资产与虚拟情绪消费 (Digital Products & Virtual Assets)
* **典型代表**: Etsy / Gumroad 数字化 Notion 商业系统、小红书解忧杂货铺与情绪发卡。
* **官方黄金标杆范本**: 
  - Etsy Notion 资产: [`money/skills/etsy-notion-template-digital-downloads/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/etsy-notion-template-digital-downloads/SKILL.md)
  - 小红书解忧杂货铺: [`money/skills/rednote-emotional-healing-bot/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/rednote-emotional-healing-bot/SKILL.md)
* **核心商业机制**: 一次制作，无限售卖，零库存物流，95%+ 纯利润边际成本。依靠强烈审美与情绪共鸣实现冲动购买。
* **专属交付资产（必须包含）**:
  1. 包含复杂数据库联动与自动化公式的生产级 Notion 架构设计白模 (DB Schema)；
  2. Midjourney / Flux 电影质感空镜与 iPad 商业样机渲染专属提示词套件；
  3. Etsy 13 个官方 SEO 标签卡位词表，或小红书双段式痛点标题与四幕式共鸣文本架构；
  4. 结合 Gumroad Webhook 或面包多自动发卡的零人工履约闭环协议。

---

### 原型 E：微型 SaaS 并购与高周转资产套现 (Micro-SaaS Flipping)
* **典型代表**: 72 小时 MVP 极速上线、验证初期现金流并在 Acquire.com 挂牌转让。
* **官方黄金标杆范本**: [`money/skills/acquire-micro-saas-flipping/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/acquire-micro-saas-flipping/SKILL.md)
* **核心商业机制**: 避开长周期运营内耗，利用代码落地天赋将初期验证的现金流资产按 20x~30x 月倍数溢价出售套现。
* **专属交付资产（必须包含）**:
  1. 72 小时内可一键上线的开源脚手架选型与独立可过户资产隔离架构（域名、Supabase、Stripe 子账户）；
  2. 满足 Acquire.com 尽调的未脱敏财务估值计算器（18x~30x MRR）；
  3. 标准商业转让备忘录（Listing Memorandum 官方范本）；
  4. Escrow.com 资金托管协议、代码仓库交接与 30 天售后技术移交清单。

---

## 🏛️ 第二部分：单项目 `SKILL.md` 强制五模块标准架构 (The 5-Module Standard)

任何生成的单项目 `SKILL.md` 必须严格包含以下 5 大模块，顺序与层级不可缺失：

### 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
- **要求**：赋予 Agent 该赛道的专职首席合伙人人设；
- **唤醒行为**：当用户输入「你好 / hello / hi / 开始」时，必须强制输出带有 **[模式 A：极速工程落地]、[模式 B：痛点与选品诊断]、[模式 C：合规与安全防线]、[模式 D：获客冷启与商业转化]** 的结构化主动问诊菜单。

### 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- **要求**：包含未脱敏信源背景，以及由 Markdown 表格呈现的真实漏斗精算（展示量、点击率、转化率、客单价、流失率、净利润率）。

### 模块三：生产级极简核心工程源码 / 数据库架构 (Production Code / Schema)
- **要求**：必须输出**真实、可运行、可直接复制**的代码块（JS、Python、JSON 或 Notion 公式），严禁使用占位符！

### 模块四：行业特化型 Prompt 编排链或商务文书 (Domain Prompts / Legal Memos)
- **要求**：根据原型输出专业物料（如电商润色 Prompt、小红书解忧文案、Acquire Listing Memo、企业 RAG SLA 合同）。

### 模块五：安全合规、防封防踩坑与冷启闭环 (Rules & GTM Playbook)
- **要求**：明确指出平台政策红线、接口风控、以及首批 10~50 个种子客户的获取实操 SOP。

---

## 🤖 第三部分：面向大模型 (Gemini / Grok / Claude) 的总提示词生成模板

当你（作为主调度 Agent 或用户）需要指挥另一个大模型（如 Gemini、Grok、Claude）为任意新项目撰写专属 `SKILL.md` 时，请直接将以下系统提示词喂给它：

```markdown
[System Instruction for AI Skill Generator]

你是一名拥有 10 年独立开发与微型资产并购经验的「全球轻资产变现商业总监兼首席架构师」。
你的任务是根据我提供的商业项目尽调信息，输出一份具备极高商业价值与可执行密度的专属【单项目高价值 SKILL.md 资产】。

【执行原则与质量红线】
1. 绝对严禁套用通用模板：严禁不顾项目实际形态，盲目复制其他项目的代码或话术。
2. 识别商业原型并白手定制专属资产：
   - 如果是获客监听 -> 产出公开 JSON 监听脚本、意向打分 Prompt、3 轮冷发邮件；
   - 如果是 Chrome 插件 -> 产出 Manifest V3 架构、LemonSqueezy 许可证验证代码、应用商店 SEO；
   - 如果是 Shopify/RAG -> 产出电商转化 Prompt 链、Dify/FastAPI 编排配置、企业 B2B 维护合同；
   - 如果是 Notion/虚拟品 -> 产出数据库架构设计、Midjourney 样机提示词、Etsy 13 SEO 标签；
   - 如果是 Acquire 翻转 -> 产出 72 小时 MVP 规范、估值倍数表、Acquire.com 挂牌转让描述。
3. 严格执行五模块标准架构：
   - 模块一：操盘手人格与四模式主动问诊协议 (A工程 / B诊断 / C合规 / D获客)；
   - 模块二：绝密一手尽调档案与真实单位经济模型精算表；
   - 模块三：生产级极简核心工程源码（必须包含完整可用代码，严禁 TODO 占位符）；
   - 模块四：行业特化型 Prompt 编排链或商务备忘录；
   - 模块五：安全合规与垂直渠道冷启 SOP。

输出格式：符合标准 YAML Frontmatter 的完整 Markdown 文档，杜绝空话，100% 纯干货！
```

---
*本文档由 MoneyLab (搞钱实验室) 官方归档，作为全站商业资产标准化的唯一指导总纲。*
