---
name: "play-designer-pro-football-playbook-quiz"
description: "专为【Play Designer Pro 式美式橄榄球战术板】定制的生产级商业操盘 Agent 技能包。内置战术校验与测验生成源码、球队冷启物料。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# MoneyLab 商业落地专属操盘 Agent: Play Designer Pro 式美式橄榄球战术板

> **资产级别**: MoneyLab Institutional Grade (Tier C, 65 分)
> **商业定位**: 给美式橄榄球教练画战术并自动生成球员测验；对标方 TrustMRR/Stripe 核验 MRR $4,848、220 订阅，复制者稳态估 $500~$1,800/月。

---

## 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的橄榄球战术板合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- [模式 A：极速工程落地]：运行模块三校验与测验生成器，先出一套测验；
- [模式 B：选品与痛点诊断]：按阵型拆球员最易记错的职责；
- [模式 C：合规与安全防线]：战术版权、球员隐私、休赛期留存；
- [模式 D：商业转化与冷启动]：免费战术模板包与赛季前球队团购话术。

## 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
一手核实：官网口径 $20/月或 $120/年、14 天试用；TrustMRR/Stripe 核验 MRR $4,848、220 订阅（人均约 $22/月，与 $20 月付口径吻合）。2025 年 6 月创办。另有 iOS 内购口径（月付与赛季包），交付时以 Web 订阅为主口径并注明渠道差异。

| 漏斗环节 | 务实假设 | 说明 |
|---|---|---|
| 试用转付费 | 15%~30% | 教练试用后带队迁移成本高 |
| 人均月收入 | 约 $22 | MRR 除以订阅数测算 |
| 球队传播 | 1 教练带 1 队 | 分享链接免费给球员 |
| 月流失 | 休赛期升高 | 需休赛期模板与预售 |
| 复制者稳态 | $500~$1,800/月 | 单地区教练口径 |

## 模块三：生产级极简核心工程源码 / 数据库架构
以下引擎零依赖可直接运行：校验战术数据完整性，并由职责字段自动生成球员测验与判分。生产环境把画板输出接同一 JSON 结构即可。

```python
#!/usr/bin/env python3
"""Playbook validator + quiz generator (stdlib only). Run: python3 engine.py"""
import json

PLAY = {
    "name": "Trips Right Flood",
    "formation": "Trips Right",
    "assignments": {
        "X": "Go route, clear corner",
        "Z": "Corner route at 12 yards",
        "Y": "Flat route, check release",
        "RB": "Swing right, pass protect first",
        "QB": "Read safety, flood progression",
    },
}

def validate(play):
    errors = []
    if not play.get("name"):
        errors.append("missing name")
    if not play.get("formation"):
        errors.append("missing formation")
    a = play.get("assignments") or {}
    if len(a) < 5:
        errors.append("need at least 5 assignments")
    for pos, duty in a.items():
        if len((duty or "").strip()) < 8:
            errors.append(f"duty too short: {pos}")
    return errors

def make_quiz(play):
    duties = list(play["assignments"].values())
    quiz = []
    for pos, duty in play["assignments"].items():
        distractors = [d for d in duties if d != duty][:2]
        options = [duty] + distractors
        quiz.append({"position": pos, "question": f"What is {pos} assignment in {play['name']}?",
                     "options": options, "answer_index": 0})
    return quiz

def grade(quiz, picks):
    correct = sum(1 for q, p in zip(quiz, picks) if p == q["answer_index"])
    return {"correct": correct, "total": len(quiz),
            "score": round(100 * correct / len(quiz)) if quiz else 0}

if __name__ == "__main__":
    errs = validate(PLAY)
    quiz = make_quiz(PLAY)
    print(json.dumps({"errors": errs, "quiz_count": len(quiz),
                      "sample": quiz[0], "demo_grade": grade(quiz, [0, 0, 1, 0, 0])},
                     indent=2, ensure_ascii=False))
```

## 模块四：行业特化型 Prompt 编排链或商务备忘录
战术讲解 Prompt（生产环境喂给模型，测验判分仍走模块三）：
```text
你是进攻组助教。战术：{play_name}，阵型：{formation}
职责表：{assignments}
规则：用教练口吻讲清每个位置的第一步与读法；不编造未给定的路线；最后提醒最容易记错的一个位置。
输出：讲解 5 句 + 易错提醒一句。
```
冷启物料示例：免费模板包《Trips 阵型 10 个基础战术》附球员测验链接，教练领包即带队试用。

## 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 版权：战术模板原创或授权，不搬运付费 playbook 原文与图片。
- 隐私：球员只收位置与测验成绩等最小信息；未成年场景按当地要求取得监护同意。
- 留存：休赛期推新赛季模板预售与历史战术归档，降低赛季外流失。
- 冷启：教练论坛发免费模板、赛季前球队团购、分享链接承接整队测验；前 20 支付费球队逐个收集战术补模板库。
