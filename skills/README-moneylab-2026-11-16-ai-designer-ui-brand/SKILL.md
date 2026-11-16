# MoneyLab 2026-11-16 · AI Designer 式一句话生成 UI 与品牌设计 SaaS

- 结论：**65 分 C 级（60~69，值得观察），入选**。过 60 分线，未过 70 分线（旧口径）。
- id：ml-20261116-002｜slug：ai-designer-ui-brand｜原型 C｜来源：搞钱看板第 6 期

## 四维打分（65 = (6+6+7+7)×2.5）

- 门槛友好度 6：完整 AI SaaS（提示词→UI 生成、品牌套件、代码导出、MCP、SEO 获客），创始人单人用 Cursor/Claude Code 做出来；但要做到“能直接发布”的出图质量 + MCP + SEO 排名，需要真实工程与持续打磨，不是 2–3 天的东西。
- 见效速度 6：创始人 46 天到 $1,500 MRR；复制者 2–4 周出 MVP，首笔现金流现实要 1–2 个月。
- 收益天花板 7：原案 $8,103 MRR、283 订阅、累计 $86,981，ARPU 约 $28.6；但 MRR 轻微下滑且 v0/Bolt/Lovable/Figma/Canva 直接竞争，复制者稳态 $1,500–$4,000/月。
- 抗风险稳定性 7：生意干净合法、Stripe 验证收入、无政策风险；风险是竞争拥挤 + 依赖底层模型 + MRR 下滑。

## 核实结论（一手打开信源原文，2026-11-16）

- MissumAI 原文（2026-11-15 更新）逐项核对一致：近 30 天 $8,056、MRR $8,103、283 订阅、累计 $86,981，TrustMRR Stripe 验证；创始人自述 46 天达 $1,500 MRR 已标注 founder-reported。
- 交叉核对 Aiolum（同源 TrustMRR）：2026-10-16 MRR $8,563、293 订阅；MRR 30 天下滑约 5.3%，趋势一致，数字可信。
- 定价多方交叉核对一致：免费 5 个终身额度（不绑卡）；Pro $25/月（100 次生成）起，阶梯涨至 $2,250/月；年付约 10 个月价；联盟佣金 20%。
- 未核实处：TrustMRR 原站页面打不开（403），数字以 MissumAI 的 TrustMRR 核对框 + Aiolum 交叉核对为准，未直接读到 TrustMRR 原站。
- 三问全过；四大一票否决全通过（竞争压力记在天花板与稳定性分里，不构成“3 个月内被大厂原生覆盖”否决）。

## 去重

- 在线索引 17 条（2026-11-16 更新）无 AI Designer、无 AI 设计生成 SaaS；最接近的 #09 Skillry（卖给 Agent 用的设计技能包）产品与客群都不同，不撞车。去重放行。

## 交付物

- moneylab-2026-11-16-ai-designer-ui-brand.json（标准 JSON）
- ai-designer-ui-brand-SKILL.md（五模块金标准，含实测脚手架 design_kit.py）
- 本 README

## 脚手架实测

- design_kit.py（brief → 设计 tokens → 单文件 HTML + brand-kit.json + logo SVG，本地可跑、无需 API Key）：3 条样例全部跑通，逐项校验通过；修过一处真 bug（pick_preset 误把 preset 对象赋给 best_hits 导致 TypeError）。
- 从已交付 SKILL.md 里把代码原样抽出重跑：与实测文件逐字节一致，9 个输出文件全部 identical。
