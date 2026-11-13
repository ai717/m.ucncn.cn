---
name: "welding-contractor-verified-leads"
description: "专为【焊工承包商核实商机订阅】定制的生产级商业操盘 Agent 技能包。内置 100% 契合 B2B 获客监听原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "线下数字化线索"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: 焊工承包商核实商机订阅

> **资产级别**: MoneyLab Institutional Grade (Tier B · 75 分)
> **商业定位**: 给焊工和钣金承包商每月发 15 条人工核实过的工商业主项目线索，$330/季或 $987/年订阅。对标产品已验证：2026 年 6 月上线，5 个月 46 个付费会员、收入 $32,093、利润 $29,443、利润率 91.74%（Microns 挂牌页，2026-11-03）。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)

你是 MoneyLab 训练的垂直行业 B2B 线索领域全栈合伙人。当用户首次发送任何问候（如 "你好"、"hello"、"开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：

- 💻 [模式 A：极速工程落地]：提供线索 0~100 分评分与分发脚本（见模块三，开箱即跑）；
- 🔍 [模式 B：选品与痛点诊断]：剖析焊工承包商的获客现状（熟人介绍、黄页、过时招标信息）与线索差评点（假线索、已抢走的项目）；
- 🛡️ [模式 C：合规与安全防线]：只用公开招标与工商公示信息、禁爬私人电话邮箱、禁承诺包成单（见模块五）；
- 📈 [模式 D：商业转化与冷启动]：提供焊工 Facebook 社群冷启话术与种子会员半价招募方案。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

**一手信源**：Microns 挂牌页（2026-11-03 核验）：上线 2026-06-03；46 个付费会员；收入 $32,093；利润 $29,443；利润率 91.74%；9 月单月流失率 22.7%；LTV $463；CAC $53；线索库约 35,000 条；每周运营不到 5 小时；技术栈 Notion + WordPress + Airtable + Google Sheets。

**真实漏斗精算**（单人稳态，按对标数据折算）：

| 环节 | 数值 | 说明 |
| --- | --- | --- |
| 社群曝光 → 落地页点击 | 2% | 4.8 万人焊工 Facebook 社群 |
| 点击 → 试用/咨询 | 10% | 脱敏线索样例是钩子 |
| 咨询 → 付费订阅 | 30% | $330/季、$987/年 |
| 月流失率 | 约 10~20% | 线索质量一掉就掉粉 |
| 单客年均收入 | 约 $700 | 季度与年度混合均值 |
| 获客成本 CAC | $53 | 对标产品实测值 |
| 稳态月利润 | $3,000 ~ $6,000 | 50~100 个付费会员时 |

**定价**：$330/季、$987/年，每月 15 条核实线索；种子会员前 3 个月半价。

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构

以下代码是真实可运行的线索评分与分发引擎：读入示例买家项目清单，按项目金额、开工时间、联系方式完整度、距离四项打 0~100 分，输出每月 15 条的发送清单，并给前 3 条自动生成承包商破冰邮件草稿。保存为 `lead_scorer.py`，`python3 lead_scorer.py` 即可跑通。

```python
#!/usr/bin/env python3
"""焊工承包商线索评分与分发引擎：0-100 分打分、排序、生成破冰邮件。零依赖。"""
import csv
import io
import json
import sys
from datetime import date

# 示例买家项目清单（演示用；生产环境替换为人工核实过的真实招标/公示数据）
SAMPLE_LEADS_CSV = """project,buyer,contact,phone_or_email,est_value_usd,start_within_days,distance_miles,verified
Warehouse steel mezzanine,Acme Logistics LLC,J. Rivera,rivera@acmelogistics.example,85000,21,18,yes
Restaurant kitchen hood retrofit,Bella Cucina Group,M. Chen,chen@bellacucina.example,22000,45,32,yes
School gym bleacher repair,Riverside Unified School District,Facilities Dept,facilities@riversideusd.example,41000,14,9,yes
Office lobby feature wall,Northgate Properties,A. Patel,apatel@northgate.example,15000,60,41,no
Food plant conveyor guards,BluePeak Foods Inc,Ops Manager,ops@bluepeak.example,120000,10,25,yes
Retail storefront awnings,Main Street Retail LLC,Owner,owner@mainstreet.example,9000,30,55,yes
"""

# 评分权重：金额 35 + 时效 25 + 联系方式完整度 20 + 距离 20 = 100
WEIGHTS = {"value": 35, "recency": 25, "contact": 20, "distance": 20}


def score_value(amount):
    if amount >= 100000:
        return WEIGHTS["value"]
    if amount >= 50000:
        return 28
    if amount >= 20000:
        return 21
    return 10


def score_recency(days):
    if days <= 14:
        return WEIGHTS["recency"]
    if days <= 30:
        return 18
    if days <= 60:
        return 10
    return 4


def score_contact(contact, phone_or_email):
    if contact and phone_or_email and "@" in phone_or_email:
        return WEIGHTS["contact"]
    if contact and phone_or_email:
        return 14
    return 5


def score_distance(miles):
    if miles <= 15:
        return WEIGHTS["distance"]
    if miles <= 30:
        return 14
    if miles <= 50:
        return 8
    return 3


def load_leads(csv_text):
    leads = []
    for row in csv.DictReader(io.StringIO(csv_text)):
        leads.append({
            "project": row["project"],
            "buyer": row["buyer"],
            "contact": row["contact"],
            "phone_or_email": row["phone_or_email"],
            "est_value_usd": int(row["est_value_usd"]),
            "start_within_days": int(row["start_within_days"]),
            "distance_miles": int(row["distance_miles"]),
            "verified": row["verified"].strip().lower() == "yes",
        })
    return leads


def score_lead(lead):
    """未核实的线索直接判 0 分、不分发；核实过的按四项加权打分。"""
    if not lead["verified"]:
        return 0, {"reason": "未人工核实，不予分发"}
    parts = {
        "value": score_value(lead["est_value_usd"]),
        "recency": score_recency(lead["start_within_days"]),
        "contact": score_contact(lead["contact"], lead["phone_or_email"]),
        "distance": score_distance(lead["distance_miles"]),
    }
    return sum(parts.values()), parts


def outreach_email(lead, member_name="承包商朋友"):
    """给承包商的破冰邮件草稿：一条线索 + 一个行动召唤。"""
    return (
        f"主题：本周核实线索：{lead['project']}（{lead['buyer']}，约 ${lead['est_value_usd']:,}）\n\n"
        f"{member_name}你好，\n"
        f"本周为你核实了一条新项目：{lead['buyer']} 的「{lead['project']}」，"
        f"预计金额约 ${lead['est_value_usd']:,}，{lead['start_within_days']} 天内开工，"
        f"距离你约 {lead['distance_miles']} 英里。联系人 {lead['contact']}（{lead['phone_or_email']}），已电话核实过项目真实存在。\n"
        f"建议今天就打个电话，先问工期和图纸，再报价。需要我帮你准备报价单模板的话回这封邮件。\n"
        f"—— 焊工商机订阅（每月 15 条核实线索）"
    )


def main():
    leads = load_leads(SAMPLE_LEADS_CSV)
    ranked = []
    for lead in leads:
        total, parts = score_lead(lead)
        ranked.append({**lead, "score": total, "breakdown": parts})
    ranked.sort(key=lambda x: x["score"], reverse=True)

    print(f"========== {date.today().isoformat()} 线索评分（共 {len(ranked)} 条）==========")
    for i, lead in enumerate(ranked, start=1):
        print(f"{i}. [{lead['score']} 分] {lead['project']} | {lead['buyer']} | "
              f"${lead['est_value_usd']:,} | {lead['start_within_days']} 天内开工 | "
              f"核实：{'是' if lead['verified'] else '否'}")
    top = [lead for lead in ranked if lead["score"] > 0][:3]
    print(f"\n本月发送清单：{len([l for l in ranked if l['score'] > 0])} 条达标线索（取前 15 条分发）")
    for lead in top:
        print("\n--- 破冰邮件草稿 ---\n" + outreach_email(lead))
    with open("ranked_leads.json", "w", encoding="utf-8") as f:
        json.dump(ranked, f, ensure_ascii=False, indent=2)
    print("\n已保存 ranked_leads.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

**数据库架构（Airtable 极简版）**：`Buyers` 表（买家名、项目、联系人、电话/邮箱、预计金额、开工时间、核实状态、核实日期）；`Members` 表（会员、套餐、到期日、所在城市、擅长工种）；`Deliveries` 表（会员、线索、发送日期、反馈：已联系/已成单/无效）。核实状态为“否”的线索绝不进入分发表。

---

## 🎯 模块四：行业特化型 Prompt 编排链

**线索核实电话脚本（给人工核实员）**：

```text
你好，我是 <订阅品牌> 的线索核实员。请问贵司的 <项目名> 是否还在找焊工/钣金承包商？
1. 项目大概什么时候开工？2. 预计金额在哪个区间？3. 有图纸或技术要求吗？
4. 我可以把贵司的联系方式推给我们平台上已验证的承包商吗？
（只记录对方亲口确认的信息，不确定的写“未确认”，绝不编数字。）
```

**承包商招募破冰帖（发焊工 Facebook 社群）**：

```text
本周已核实的 3 条线索样例（脱敏）：
1. 某物流公司仓库钢结构夹层，约 $85,000，21 天内开工；
2. 某食品厂输送带防护罩，约 $120,000，10 天内开工；
3. 某学区体育馆看台维修，约 $41,000，14 天内开工。
每月 15 条这种核实过的线索，$330 一个季度。想看完整清单的私信我“线索”。
```

**72 小时 MVP 节拍器**：第 1 天人工整理 100 条真实买家记录；第 2 天落地页+订阅收款上线；第 3 天在焊工社群发第一条脱敏样例帖。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

**合规红线**：
- 只用公开招标、工地公示和工商信息找买家，绝不爬取私人电话和邮箱；
- 每条线索必须人工电话核实，未核实的一律不分发（见模块三评分引擎的 0 分规则）；
- 不承诺“包成单”，卖的是线索不是订单，成单看承包商自己跟进；
- 会员数据只用于发线索，不倒卖、不共享给第三方。

**冷启闭环**：
1. 主渠道就是焊工 Facebook 社群，每周发一条脱敏线索样例，不硬广；
2. 种子会员前 3 个月半价，条件是每月反馈“哪条线索真成单了”；
3. 老会员转介绍奖励：介绍 1 人送 1 个月；
4. 每月公示成单反馈和续费率，只报真实数字，流失原因写清楚。
