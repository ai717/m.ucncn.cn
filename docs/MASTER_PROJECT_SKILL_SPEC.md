# 🏛️ MoneyLab 项目总 Skill 生成器规范 (Master Project Skill Generator Schema)

> 本规范定义了 MoneyLab (m.ucncn.cn) 如何将任意一个经过尽调核验的商业项目，自动化编译输出为价值 \$300+ 的单项目独立 `SKILL.md` 生产级智能体资产。

---

## 🎯 一、双螺旋交付哲学 (Dual-Engine Value Model)

每个付费解密的单项目 `SKILL.md`，必须同时承担两大职能：

1. **信息资产载体 (Information Dossier Engine)**:
   - 彻底脱水、剔除公关废话的原始商业内幕与未脱敏信源讨论帖；
   - 包含获客成本 (CAC)、真实客单价、转化漏斗损耗率、退款率与净毛利的**真实单位经济学模型 (Unit Economics)**；
   - 实战验证过的反封禁防线与月度成本 < \$5 的平替工具链。
2. **专属驻场 AI 操盘手 (Turnkey Co-Founder Agent)**:
   - 具备独立人格（出海技术合伙人 + B2B 增长总监），绝不等待用户盲目发问；
   - 用户输入任何问候语（"你好", "hello"），自动启动**全维主动问诊协议**，输出定制化落地方向（A/B/C/D 路径）；
   - 能根据用户现有的技术栈与业务目标，现场动态生成定制化爬虫、专属营销话术或针对用户输入帖子的实时打分。

---

## 📋 二、单项目 SKILL.md 八维标准化编译清单

每个自动生成的 `skills/<slug>/SKILL.md` 必须严格包含以下 8 大核心模块：

```markdown
---
name: [项目唯一小写标识，如 reddit-buying-signal-outreach-engine]
description: [高密度一句话商业定位，包含核心客群、自动化工具与变现模式]
author: MoneyLab (搞钱实验室 · m.ucncn.cn)
version: 2.0.0
category: [Micro-SaaS / 独立站插件 / Chrome扩展 / 数字资产 / B2B服务]
tags: [5个精准商业与技术标签]
tools_required: [python/node, web_search, llm_api]
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: [项目全称]

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Executive Diagnostic Protocol)
- 设定高阶身份（资深出海技术合伙人 / 垂直品类操盘手）
- 强制拦截首次问候：输出 A/B/C/D 四大交互路径：
  - 路径 A (已有产品): 专属定制切入词库与破冰营销话术
  - 路径 B (代客服务): 输出对机构客户的商务提案书与样品交付表格
  - 路径 C (纯技术执行): 输出开箱即用的自动化部署代码与定时任务配置
  - 路径 D (现场实操诊断): 用户丢来任何线索/素材，Agent 现场打分并输出草稿

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Raw Dossier & Unit Economics)
- 未脱敏原始讨论帖、创始人真实账号与踩坑复盘
- 完整转化漏斗基准表 (扫描量 -> 初筛率 -> 意向率 -> 触达量 -> 打开率 -> 回复率 -> 月成单)
- 现金流测算 (LTV, CAC, 净毛利率, 推荐定价梯度)

## 🎯 模块三：目标阵地拓扑与买意/商机嗅探公式 (Targeting Formula)
- 5~10 个最高价值的目标聚集地 (Subreddit, 论坛板块, 关键词榜单)
- 三阶高意向买点特征库 (替代绝望型 / 明确预算型 / 效率瘫痪型)
- 负向噪音过滤词库 (求职、学术、白嫖、教程等一键熔断词)

## 💻 模块四：开箱即用自愈型生产源码 (Turnkey Production Code)
- 完整可运行代码 (Python / Node.js / Chrome Extension MV3)
- 具备自动化频控、User-Agent 轮换、429 指数退避自愈、本地持久化去重
- 零额外高昂 API 门槛 (优先采用公开流或极低成本平替接口)

## 🧠 模块五：大模型商业意向精准打分 Chain (LLM Decision Matrix)
- 4 维量化评分标准 (痛点紧迫度 30分 + 预算意愿 30分 + 方案适配 20分 + 决策人权威 20分)
- 结构化 JSON 纯净输出契约 (包含合格布尔值、分数、画像、核心矛盾、客制化破冰语)

## ✉️ 模块六：实战检验的高转化销售与成交流水线 (Sales Playbook)
- 3 轮追击话术 SOP (Day 1 索取许可 -> Day 3 赠送价值半成品 -> Day 7 优雅断联)
- 异议处理清单 (价格高、正在用竞品、后续联系)
- 邮件送达率技术指南 (发信副域名配置、SPF/DKIM/DMARC 验证规范)

## 🛡️ 模块七：反封禁避坑红线与零成本平替基础设施 (Defensive Rules & Zero-Cost Stack)
- 平台风控算法红线 (请求间隔、单日发信上限、IP 隔离)
- 零成本云端部署指南 (Railway / Render 免费层, Resend, Supabase, DeepSeek)

## 🚀 模块八：Agent 自主进化与二次开发指南 (Autonomous Extension)
- 指导用户的 Agent 如何根据当前 Skill 进一步扩展：
  - 自动爬取竞品负面评价
  - 动态增加 Webhook 报警流水线
  - 针对指定用户生成个性化开发计划
```

---

## ⚙️ 三、项目总 Skill 自动化生成机制 (Batch Compilation Pipeline)

未来后台或 Agent 收到新的商业调研报告（来自 `cashflow-radar`、`novel-genre-research` 或人工录入）时，执行以下自动化编译流：

```
[原始项目数据 (projects.json)]
  │
  ├─ title, category, metrics, deep_dive, source_url
  │
  ▼
[调用项目总 Skill 编译 Prompt (Master Compiler)]
  │
  ├─ 自动提取核心痛点，推演 3 阶买意词与负向过滤词
  ├─ 自动编写适配该赛道的 Python / Node 轻量生产脚本
  ├─ 自动匹配该受众心理的 3 轮冷触达破冰话术
  ├─ 自动构建该赛道的 0-100 分量化打分 JSON Schema
  └─ 格式化注入操盘手主动问诊激活菜单 (A/B/C/D 路径)
  │
  ▼
[落盘至 money/skills/<slug>/SKILL.md & SKILL-EN.md]
  │
  ▼
[静态服务与弹窗解密流 0 延迟秒级读取交付]
```
