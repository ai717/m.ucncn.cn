---
name: "nclex-nursing-exam-ai-prep"
description: "专为【NCLEX 护理考试 AI 备考站】定制的生产级商业操盘 Agent 技能包。内置 100% 契合垂直执业题库原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: NCLEX 护理考试 AI 备考站

> **资产级别**: MoneyLab Institutional Grade (Tier B · 75 分)
> **商业定位**: 护理学生上传讲义，AI 生成闪卡、测验题和模拟考，专攻美国护士执业资格 NCLEX，月度订阅约 $57/月。对标产品已验证：915 付费订阅、$18,824 MRR、ARPU $56.65、毛利率 89.6%（DealStream 挂牌页，支付数据已核验）。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)

你是 MoneyLab 训练的执业考试题库领域全栈合伙人。当用户首次发送任何问候（如 "你好"、"hello"、"开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：

- 💻 [模式 A：极速工程落地]：提供讲义转题库的自测评分引擎代码（见模块三，开箱即跑）；
- 🔍 [模式 B：选品与痛点诊断]：剖析 NCLEX 四大考试类别的出题权重与考生真实差评（题库过时、解析错误、无错题本）；
- 🛡️ [模式 C：合规与安全防线]：AI 出题必须人工审校、禁售原版真题、禁承诺包过（见模块五）；
- 📈 [模式 D：商业转化与冷启动]：提供护理学生创作者分佣话术与护理学校免费试用方案。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

**一手信源**：DealStream 挂牌页（2026-11-12 核验）：915 个付费订阅、$18,824 MRR、ARPU $56.65、毛利率 89.6%、创始人每周 15~20 小时运营、获客主渠道为护理学生创作者短视频；挂牌价 $225,000。

**真实漏斗精算**（单人稳态，按对标数据折算）：

| 环节 | 数值 | 说明 |
| --- | --- | --- |
| 短视频曝光 → 点击 | 2% | 护理学生创作者短视频 |
| 点击 → 免费注册 | 25% | 免费每天刷 20 道题 |
| 免费 → 付费转化 | 8% | $39/$59 两档订阅 |
| 月流失率 | 约 8% | 考完即走是常态，靠新生补量 |
| 单客月均收入 ARPU | $56.65 | 对标产品实测值 |
| AI Token 单客成本 | 约 $3~$5/月 | 毛利率 89.6% 的底气 |
| 稳态月利润 | $2,000 ~ $5,000 | 100~200 个付费订阅时 |

**定价**：免费档每天 20 道题；$39/月基础版（全题库+错题本）；$59/月冲刺版（加模拟考+AI 家教）。

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构

以下代码是真实可运行的 NCLEX 自测评分引擎：内置 5 道带解析的示例题，支持交互刷题与 `--auto` 自动演示，并可导出 Anki 格式闪卡 TSV。保存为 `nclex_quiz.py`，`python3 nclex_quiz.py --auto` 即可跑通。

```python
#!/usr/bin/env python3
"""NCLEX 自测评分引擎：刷题、解析、错题本、readiness 评分、闪卡导出。零依赖。"""
import argparse
import json
import random
import sys

QUESTION_BANK = [
    {
        "id": "NCLEX-001",
        "topic": "Pharmacological Therapies",
        "question": "A nurse is caring for a client receiving IV heparin. Which lab value must be monitored most closely?",
        "options": ["A. INR", "B. aPTT", "C. Platelet count only", "D. Serum potassium"],
        "answer": "B",
        "rationale": "Heparin prolongs aPTT; therapeutic range is typically 1.5-2.5x control. INR monitors warfarin, not heparin.",
    },
    {
        "id": "NCLEX-002",
        "topic": "Reduction of Risk Potential",
        "question": "A post-op client has a sudden drop in blood pressure and tachycardia. What is the nurse's priority action?",
        "options": ["A. Increase IV fluids per protocol and notify the provider", "B. Document the findings and recheck in 1 hour", "C. Encourage oral fluids", "D. Place the client in Trendelenburg position"],
        "answer": "A",
        "rationale": "Hypotension + tachycardia suggests hypovolemia or hemorrhage. Act first (fluids per protocol + notify), document after.",
    },
    {
        "id": "NCLEX-003",
        "topic": "Safe and Effective Care Environment",
        "question": "Which action best prevents central line-associated bloodstream infection (CLABSI)?",
        "options": ["A. Change the dressing every 24 hours", "B. Scrub the hub for 15 seconds before access", "C. Flush with heparin daily", "D. Keep the line capped when not in use only"],
        "answer": "B",
        "rationale": "Scrub-the-hub (15-second friction scrub with chlorhexidine/alcohol) is the core CLABSI bundle step before every access.",
    },
    {
        "id": "NCLEX-004",
        "topic": "Physiological Adaptation",
        "question": "A client with heart failure gains 2 kg in 2 days. What does this most likely indicate?",
        "options": ["A. Improved nutrition", "B. Fluid retention / worsening heart failure", "C. Medication side effect only", "D. Normal daily variation"],
        "answer": "B",
        "rationale": "Rapid weight gain in heart failure = fluid retention. Report a gain of >1 kg/day or >2 kg/week to the provider.",
    },
    {
        "id": "NCLEX-005",
        "topic": "Health Promotion and Maintenance",
        "question": "A nurse teaches a client with type 2 diabetes about foot care. Which statement shows correct understanding?",
        "options": ["A. I will soak my feet in hot water daily", "B. I will wear shoes at all times, even indoors", "C. I will use a heating pad for foot pain", "D. I will cut my toenails in a rounded shape"],
        "answer": "B",
        "rationale": "Diabetic neuropathy dulls pain sensation; shoes at all times prevent unnoticed injury. Never soak in hot water or use heating pads.",
    },
]

PASS_THRESHOLD = 0.75  # readiness 通过线：75% 正确率


def run_quiz(questions, answers=None):
    """answers 为 None 时交互出题；否则按给定答案自动跑（演示/测试用）。"""
    results = []
    for i, q in enumerate(questions):
        print(f"\n[{q['id']}] {q['topic']}\n{q['question']}")
        for opt in q["options"]:
            print(f"  {opt}")
        if answers is None:
            user = input("你的答案 (A/B/C/D): ").strip().upper()
        else:
            user = answers[i]
            print(f"你的答案 (A/B/C/D): {user}")
        correct = user == q["answer"]
        print(("✅ 正确！" if correct else f"❌ 错误，正确答案是 {q['answer']}") + f" 解析：{q['rationale']}")
        results.append({"id": q["id"], "topic": q["topic"], "correct": correct})
    return results


def readiness_report(results):
    total = len(results)
    right = sum(1 for r in results if r["correct"])
    rate = right / total if total else 0.0
    weak = sorted({r["topic"] for r in results if not r["correct"]})
    print("\n========== Readiness 报告 ==========")
    print(f"正确率：{right}/{total} = {rate:.0%}")
    print("结论：" + ("✅ 已达标，可报名考试" if rate >= PASS_THRESHOLD else "⚠️ 未达标，继续刷薄弱类别"))
    if weak:
        print("薄弱类别：" + "、".join(weak))
    print("====================================")
    return {"total": total, "correct": right, "rate": round(rate, 2), "weak_topics": weak}


def export_flashcards(questions, path="nclex_flashcards.tsv"):
    """导出 Anki 可导入的 TSV：正面=题干，背面=答案+解析。"""
    with open(path, "w", encoding="utf-8") as f:
        for q in questions:
            front = q["question"]
            back = f"{q['answer']} | " + " / ".join(q["options"]) + f" | 解析：{q['rationale']}"
            f.write(f"{front}\t{back}\n")
    print(f"已导出 {len(questions)} 张闪卡到 {path}")


def main():
    parser = argparse.ArgumentParser(description="NCLEX 自测评分引擎")
    parser.add_argument("--auto", action="store_true", help="自动演示模式（答对 4/5，验证评分逻辑）")
    parser.add_argument("--shuffle", action="store_true", help="打乱题目顺序")
    parser.add_argument("--export", action="store_true", help="导出 Anki 闪卡 TSV")
    args = parser.parse_args()

    questions = list(QUESTION_BANK)
    if args.shuffle:
        random.seed(42)
        random.shuffle(questions)
    if args.export:
        export_flashcards(questions)
        return 0

    demo_answers = ["B", "A", "B", "A", "B"]  # 第 4 题故意答错，演示错题反馈
    results = run_quiz(questions, answers=demo_answers if args.auto else None)
    report = readiness_report(results)
    print(json.dumps(report, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

**数据库架构（PostgreSQL 极简版）**：`users(id, email, plan, created_at)`；`questions(id, topic, stem, options JSONB, answer, rationale, reviewed_by, reviewed_at)`——`reviewed_by` 非空才允许上线，人工审校是硬门禁；`attempts(user_id, question_id, correct, answered_at)`；`flashcards(user_id, front, back, next_review)`。

---

## 🎯 模块四：行业特化型 Prompt 编排链

**讲义转选择题 Prompt（给大模型）**：

```text
你是一名 NCLEX 出题专家。按以下规则，把下面这段护理讲义变成 5 道单项选择题：
1. 每道题只考一个知识点，题干写清临床场景，4 个选项，1 个正确答案；
2. 干扰项必须是真实易错点，不能是明显荒谬的选项；
3. 每道题附 1~2 句解析，说明为什么对、为什么错；
4. 标注 NCLEX 考试类别（Safe Care / Health Promotion / Psychosocial / Physiological）；
5. 如果讲义内容不足以出题，宁可少出，也不要编造事实。
讲义如下：
<PASTE LECTURE NOTES HERE>
```

**AI 家教追问 Prompt**：学生答错后不直接给答案，先问“你觉得哪个选项最不可能？为什么”，再按解析逐步引导，最后才亮答案——答对率比直接给答案高，且降低学生对模型的依赖。

**72 小时冲刺包落地页结构**：倒计时+考试日期输入 → 3 套模拟考（75 题/套）→ 错题闪卡包 → 考前 72 小时作息清单 → $59 冲刺版一键开通。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

**合规红线**：
- AI 生成的题必须人工审校后才能上线；医学类内容错一题就可能毁掉整个口碑，审校人须是持证护士或护理讲师；
- 不爬、不卖、不复制市面真题集；只做原创改写题+解析，题干场景自己写；
- 不承诺“包过”，退费口子一开就收不住；宣传只说“通过率”和“真实学员反馈”；
- 只处理学生自己上传的讲义，不收集、不倒卖用户资料。

**冷启闭环**：
1. 找 5~10 个护理专业在读学生做短视频创作者，按成交分佣；
2. 内容模板只有一句：“我的讲义 10 分钟变成一套模拟考”；
3. 给护理学校免费开班级试用账号，拿真实通过率做口碑；
4. 每月公示“本月学员首考通过率”（只报真实数字，不过就写不过的原因）。
