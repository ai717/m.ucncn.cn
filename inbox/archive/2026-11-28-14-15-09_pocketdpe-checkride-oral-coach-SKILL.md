---
name: "pocketdpe-checkride-oral-coach"
description: "专为【PocketDPE 式 FAA 飞行员口试语音陪练】定制的生产级商业操盘 Agent 技能包。内置 ACS 题库评分引擎源码、追问 Prompt 与临考冷启物料。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# MoneyLab 商业落地专属操盘 Agent: PocketDPE 式 FAA 飞行员口试语音陪练

> **资产级别**: MoneyLab Institutional Grade (Tier C, 63 分)
> **商业定位**: 给备考 Private/Instrument/Commercial 的学员做语音模拟口试，AI 按 ACS 提问追问并评分复盘；对标方 TrustMRR/RevenueCat 核验 MRR $6,300（2026-11-26 读数），复制者稳态估 $800~$2,500/月。

---

## 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的飞行员口试备考合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- [模式 A：极速工程落地]：运行模块三评分引擎，先跑通一轮模拟口试；
- [模式 B：选品与痛点诊断]：按 ACS 任务拆弱项，定位最容易被追问卡住的知识点；
- [模式 C：合规与安全防线]：自学工具声明、非 FAA 批准、语音成本上限；
- [模式 D：商业转化与冷启动]：免费模拟口试帖与航校社群冷启话术。

## 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
一手核实：App Store 价格 Pro $19.99/周、$39.99/月、$129.99/年；TrustMRR/RevenueCat 2026-11-26 读数 MRR $6,300、250 订阅，2026-11-19 读数 MRR $5,874、234 订阅。2026 年 6 月创办，一人运营。收入为毛收入口径，须扣 App Store 分成与语音 API 成本。

| 漏斗环节 | 务实假设 | 说明 |
|---|---|---|
| 免费模拟完成率 | 40%~60% | 临考学员完成意愿高 |
| 免费转付费 | 5%~10% | 以周付与年付混合计 |
| 人均月收入 | 约 $25 | MRR 除以订阅数测算 |
| 月流失 | 考后自然流失高 | 按临考季运营，不按全年留存承诺 |
| 复制者稳态 | $800~$2,500/月 | 单一证书口径 |

## 模块三：生产级极简核心工程源码 / 数据库架构
以下引擎零依赖可直接运行：内置 ACS 示例题库、关键词评分与 readiness 计算。生产环境把题库换成自有校对版，语音层接识别与合成 API，评分逻辑保持不变。

```python
#!/usr/bin/env python3
"""ACS mock-oral scoring engine (stdlib only). Run: python3 engine.py"""
import json

BANK = [
    {"id": "PPL-01", "acs": "PA.I.A", "q": "What documents must be on board to fly?",
     "keys": ["airworthiness", "registration", "operating limitations", "weight and balance"],
     "follow": "Which one is missing most often on rentals?"},
    {"id": "PPL-02", "acs": "PA.I.B", "q": "When do you need a flight review?",
     "keys": ["24 calendar months", "1 hour flight", "1 hour ground"],
     "follow": "Does a checkride count as a flight review?"},
    {"id": "PPL-03", "acs": "PA.II.A", "q": "What is the weather minimum for VFR in Class G at night below 1200 AGL?",
     "keys": ["3 statute miles", "500 below", "1000 above", "2000 horizontal"],
     "follow": "How does Class E differ?"},
]

def score_answer(item, answer):
    text = (answer or "").lower()
    hit = [k for k in item["keys"] if k.lower() in text]
    pct = round(100 * len(hit) / len(item["keys"])) if item["keys"] else 0
    return {"id": item["id"], "acs": item["acs"], "score": pct,
            "hit": hit, "miss": [k for k in item["keys"] if k not in hit],
            "follow_up": item["follow"] if pct < 100 else "Good. Next question."}

def run_mock(answers):
    rows = [score_answer(BANK[i], answers[i]) for i in range(min(len(BANK), len(answers)))]
    readiness = round(sum(r["score"] for r in rows) / len(rows)) if rows else 0
    verdict = "READY" if readiness >= 80 else ("CLOSE" if readiness >= 60 else "NOT READY")
    return {"readiness": readiness, "verdict": verdict, "rows": rows,
            "disclaimer": "Self-study only. Not FAA-approved. Verify with ACS, FAR/AIM and your instructor."}

if __name__ == "__main__":
    demo = [
        "Airworthiness certificate, registration, operating limitations, weight and balance.",
        "Every 24 calendar months with 1 hour flight and 1 hour ground.",
        "3 statute miles visibility.",
    ]
    print(json.dumps(run_mock(demo), indent=2, ensure_ascii=False))
```

## 模块四：行业特化型 Prompt 编排链或商务备忘录
追问 Prompt（生产环境喂给模型，评分仍走模块三量表）：
```text
你是 FAA 口试考官，只依据给定 ACS 任务与标准要点追问。
学员回答：{answer}
已命中要点：{hit}；缺失要点：{miss}
规则：每次只问一个追问；不直接给答案；语气严肃简短；涉及安全结论时提醒查 ACS/FAR 与教员。
输出：追问一句 + 需要学员补充的要点编号。
```
冷启帖标题示例：临考前一周，我用语音模拟口试把 ACS 弱项全过了一遍（附免费测评）。

## 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 合规：全站明示自学工具、非 FAA 批准培训、不替代 CFI；AI 可能出错，以官方出版物为准。
- 成本：单次模拟限时 20 分钟，周付用户设分钟上限，超限降级文字模式。
- 内容：题目原创改写并标注 ACS 出处，不搬运商业题库原文。
- 冷启：飞行学员论坛发免费测评、航校社群做临考周团购、ACS 关键词落地页承接搜索；前 20 名付费用户逐个访谈补追问题库。
