---
name: "road-to-offer-case-interview-coach"
description: "专为【Road to Offer 式咨询案例面试陪练】定制的生产级商业操盘 Agent 技能包。内置案例三维评分引擎源码、追问 Prompt 与招聘季冷启物料。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# MoneyLab 商业落地专属操盘 Agent: Road to Offer 式咨询案例面试陪练

> **资产级别**: MoneyLab Institutional Grade (Tier C, 60 分)
> **商业定位**: 给咨询候选人无限案例练习加 AI 复盘，首案免费、季票收费；对标方 TrustMRR/Stripe 核验 MRR $4,199（2026-11-11 读数），复制者稳态估 $600~$2,000/月（招聘季口径）。

---

## 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的咨询案例面试合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- [模式 A：极速工程落地]：运行模块三评分引擎，先完整练一案；
- [模式 B：选品与痛点诊断]：拆结构、计算、沟通三维弱项；
- [模式 C：合规与安全防线]：原创案例、非官方隶属、商标使用边界；
- [模式 D：商业转化与冷启动]：咨询社团案例夜与季票转化话术。

## 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
一手核实：官网价格 Monthly $49/月、90-Day Sprint $120、Annual $249/年，测评包 $29~$79；TrustMRR 2026-11-11 读数 MRR $4,199、94 订阅、累计 $21,644。2026 年 1 月上线。官网称 14,000+ 候选人为平台自述口径，不作核验收入使用。

| 漏斗环节 | 务实假设 | 说明 |
|---|---|---|
| 首案完成率 | 30%~50% | 免费首案做获客 |
| 免费转付费 | 3%~8% | 招聘季窗口更高 |
| 人均月收入 | 约 $45 | MRR 除以订阅数测算 |
| 月流失 | 拿到 offer 后陡升 | 按季运营，淡季降本 |
| 复制者稳态 | $600~$2,000/月 | 招聘季口径，淡季更低 |

## 模块三：生产级极简核心工程源码 / 数据库架构
以下引擎零依赖可直接运行：对案例回答做结构、计算、沟通三维评分并给出复盘。生产环境把案例库换成自有原创库，量表逻辑保持不变。

```python
#!/usr/bin/env python3
"""Case-interview rubric engine (stdlib only). Run: python3 engine.py"""
import json, re

CASE = {
    "prompt": "A coffee chain sees profit fall 20% while revenue grows 5%. Diagnose and recommend.",
    "structure_keys": ["revenue", "cost", "price", "volume", "mix"],
    "math_keys": ["margin", "per store", "break-even"],
    "comms_keys": ["recommend", "because", "risk", "next step"],
}

def dim_score(keys, text):
    hits = [k for k in keys if k.lower() in text]
    return round(100 * len(hits) / len(keys)) if keys else 0, hits

def grade(answer):
    text = (answer or "").lower()
    s, sh = dim_score(CASE["structure_keys"], text)
    m, mh = dim_score(CASE["math_keys"], text)
    c, ch = dim_score(CASE["comms_keys"], text)
    nums = len(re.findall(r"\d", text))
    if nums == 0:
        m = min(m, 40)
    total = round((s + m + c) / 3)
    band = "STRONG" if total >= 75 else ("PASSING" if total >= 55 else "NEEDS WORK")
    return {"total": total, "band": band,
            "structure": {"score": s, "hit": sh},
            "math": {"score": m, "hit": mh, "numbers_seen": nums},
            "communication": {"score": c, "hit": ch},
            "next_drill": "Math drill: unit economics" if m <= s and m <= c else "Structure drill: MECE tree"}

if __name__ == "__main__":
    demo = ("I would split revenue into price, volume and mix, then cost per store. "
            "Margin fell because labor cost rose faster than price. I recommend a price test "
            "because volume is stable, with risk on churn. Next step: pilot in 10 stores and check break-even.")
    print(json.dumps(grade(demo), indent=2, ensure_ascii=False))
```

## 模块四：行业特化型 Prompt 编排链或商务备忘录
复盘 Prompt（生产环境喂给模型，分数仍走模块三量表）：
```text
你是案例面试复盘教练。案例：{prompt}
学员回答：{answer}
量表得分：结构 {structure} / 计算 {math} / 沟通 {communication}
规则：先肯定一个具体亮点，再指出最伤分的一处，最后给一个 10 分钟 drill；不编造公司真题；全程中文或英文与学员一致。
输出：亮点一句 + 最大问题一句 + drill 任务一句。
```
季票话术示例：招聘季只剩 90 天：首案免费测分，季票无限练到面试前一天。

## 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 合规：案例全部原创，全站明示与目标公司无隶属关系；公司名只作指向性提及，不用其 logo 与真题。
- 季节：按招聘季排案例更新与投放，淡季切团购与下季预售，不按旺季收入承诺全年。
- 冷启：大学咨询社团免费案例夜、求职社区错题帖、团购价锁社团；前 30 名付费用户错题全部回流 drills。
