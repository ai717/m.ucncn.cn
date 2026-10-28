---
name: moneylab-collector
description: 「搞钱实验室」前沿变现项目深度采集、客观解剖与结构化入库技能。专为 Grok、Gemini、本地 Agent 打造。
---

# ⚡ 搞钱实验室专属采集与结构化分析引擎 (MoneyLab Collector)

> 详细规范与信源请见 `C:\Users\everg\.gemini\config\skills\moneylab-collector\SKILL.md`。

## 核心要点简述
1. **可靠来源**：锁定 Acquire.com、GitHub 飙升榜、Reddit 痛点求助贴、X 实名公开构建者与真实交易流水，坚决剔除虚假卖课与概念炒作。
2. **客观分析与评分**：由 AI 测算 4 维指标（门槛、见效周期、收益天花板、抗风险稳定性），加权计算出 0~100 综合推荐指数与 S/A/B 评级。
3. **结构化交付**：严格输出合法的 JSON 数组，方便直接通过 `node money/scripts/ingest.js --file=xxx.json --push` 一键入库并部署。
