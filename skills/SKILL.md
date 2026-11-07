---
name: moneylab-collector
description: 「搞钱实验室」全域商业情报深度采集、客观尽调与【单项目个性化落地 SKILL.md 资产自动生成】二合一超级工坊。专为 Grok、Gemini、Claude、Muse/豆包 与本地 Agent 打造。融合 BizPeel 的 Agent-Native 商业资产标准与 MoneyLab 真实购买力校准法则。输入巡航指令或粗略线索，端到端产出：①符合最新前端契约的标准项目 JSON（含 3 层 Core Thesis、带交付物的 SOP 阶段管线、量化打分）；②100% 依据五大商业原型（B2B获客监听/浏览器插件/企业AI封装/数字化资产/微型资产并购）白手定制的单项目专属生产级 SKILL.md 技能包。彻底杜绝千篇一律套版，直接为付费用户交付真材实料源码、Prompt 与变现物料。触发词：搞钱采集、搞钱实验室、moneylab、项目采集、商业入库、生成项目skill、采集搞钱项目。
---

# ⚡ 搞钱实验室全域商业情报与专属技能工坊 (MoneyLab Collector v4.0 · Agent-Native)

> 全局主技能定义位于：`C:\Users\everg\.gemini\config\skills\moneylab-collector\SKILL.md`  
> 详细单项目元技能架构指导总纲参见：[`money/docs/PROJECT_SKILL_META_GUIDE.md`](file:///g:/work/code/website/ucncn/money/docs/PROJECT_SKILL_META_GUIDE.md)

---

## 核心设计要点

1. **打破狭隘思维禁锢**：搞钱不仅是软件或虚拟商品，覆盖【纯数字资产】、【软硬结合与轻制造】、【线下实体数字化线索】、【跨境地理套利与撮合】四大跨界板块；
2. **严守真实性与防夸大红线**：紧扣中国市场真实购买力与客单价（C端虚拟资料多为 ¥9.9~¥49，单月稳态多在 ¥1.5k~¥6k），严禁营销号“月入十万”式吹嘘画饼；
3. **三级差异化去重法则 (Smart Dedup & Micro-Innovation)**：
   - **严查同款克隆 (Zero-Tolerance Clones)**：严禁 1:1 照搬库内已有的同款产品、同款对标或完全重合的细分痛点；
   - **允许同模式微创新 (Welcome Model Reuse with Different Niches)**：经典商业原型（如浏览器插件、特种题库、B2B外发、微型并购）允许复用，只要目标客群、细分痛点、产品实现有明确差异，坚决予以采纳；
   - **动态在线清单与自动门禁**：外部大模型联网读取 `https://m.ucncn.cn/llms.txt`（或 `catalog.json`）动态甄别细分差异；构建脚本拦截技术重复（同 ID / 同 Slug）；
4. **11 大真实可靠信源（重点纳入 BizPeel 升维工作流）**：
   - **核心前哨：BizPeel（bizpeel.com / bizpeel.com/zh/）**：捕捉海外微型出海业务、一人公司、自动化工具的高信噪比商业命题；
   - **4 步升维法则**：命题提取 ➔ 一手源交叉验真（CWS差评/Reddit原贴/Acquire交易） ➔ 生产级交付物注入（补齐 Python 爬虫/V3扩展/开箱即用 Prompt，落实 5 模块标准） ➔ MoneyLab 独立四维尽调；
   - **其他全网源**：Acquire微型收购、Etsy/3D打印轻制造、Reddit痛点社区、sweatystartup线下数字化案例、GitHub黑马、X实名公开构建者、国内高复购合规轻资产、垂直冷门执业题库等；
4. **四维客观量化打分**：AI 测算门槛友好度、见效速度、收益天花板与抗风险稳定性，按权重输出 0~100 综合推荐指数与 S/A/B 评级；
5. **模型能力最大化路由**：Grok 专攻推特实名晒单并过滤炒作、Gemini 专攻多语言开源与微型并购、Muse/豆包 专攻本土真实生态落地、Claude/Cursor 专攻落地代码工程；
6. **双轨交付输出与弹性自适应规范 (Dual-Rail & Elastic Schema)**：
   - **轨道一（弹性自适应数据 JSON）**：全面兼容 `core_thesis` 与 `deep_dive`，步骤兼容 `workflow_steps` 与 `workflow`，指标兼容 `tech_barrier` / `difficulty_stars` 与 `startup_cost` / `initial_cost`，顺带附带极简 `title_en` 与 `summary_en` 供独立站双语自动收录；
   - **轨道二（专属落地 SKILL.md）**：必须遵循【五模块金标准架构】，白手编写真实代码与专属变现物料，严禁使用 `// TODO` 占位符或缩水代码！

---

## 🏛️ 单项目 SKILL.md 强制五模块标准架构 (The 5-Module Standard)

- **模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)**：包含 [模式 A：极速工程落地]、[模式 B：选品与痛点诊断]、[模式 C：合规与安全防线]、[模式 D：商业转化与冷启动] 四维专属菜单；
- **模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)**：以 Markdown 表格呈现真实漏斗转化率、客单价、月度流失与净利润率；
- **模块三：生产级极简核心工程源码 / 数据库架构**：必须提供可直接复制运行的真实代码（严禁伪代码）；
- **模块四：行业特化型 Prompt 编排链或商务备忘录**：提供针对该商业原型的专业物料；
- **模块五：安全合规、防封防踩坑与冷启闭环 SOP**：平台风控底线与首批种子客户获取通道。

---

## 💡 全站 7 大原型黄金标杆参考切片（存放在 `money/skills/`）

- **浏览器插件原型** ➔ 参考 [`niche-chrome-extension-monetization/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/niche-chrome-extension-monetization/SKILL.md)
- **企业级 AI 封装** ➔ 参考 [`deepseek-crossborder-localization-tool/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/deepseek-crossborder-localization-tool/SKILL.md)
- **数字化资产模板** ➔ 参考 [`etsy-notion-template-digital-downloads/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/etsy-notion-template-digital-downloads/SKILL.md)
- **虚拟电商与情绪消费** ➔ 参考 [`rednote-emotional-healing-bot/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/rednote-emotional-healing-bot/SKILL.md)
- **微型并购快速退出** ➔ 参考 [`acquire-micro-saas-flipping/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/acquire-micro-saas-flipping/SKILL.md)
- **本地企业知识库咨询** ➔ 参考 [`local-rag-agent-consulting/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/local-rag-agent-consulting/SKILL.md)
- **B2B 意向获客引擎** ➔ 参考 [`reddit-leadgen-cold-email-bot/SKILL.md`](file:///g:/work/code/website/ucncn/money/skills/reddit-leadgen-cold-email-bot/SKILL.md)
