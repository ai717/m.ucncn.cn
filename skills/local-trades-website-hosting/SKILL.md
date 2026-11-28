---
name: "local-trades-website-hosting"
description: "专为【本地工种免建站费网站托管】定制的生产级商业操盘 Agent 技能包。内置 100% 契合该商业原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "线下数字化线索"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: 本地工种免建站费网站托管

> **资产级别**: MoneyLab Institutional Grade (Tier C, 60 分)
> **商业定位**: 给无像样网站的本地工种商户免费做出定制单页站，录 2 分钟演示视频发个性化冷邮件，同意上线才收 199 美元/月托管维护费；复制者务实月现金流 1,500-3,500 美元（8-18 家在约客户）。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供该项目核心代码或架构脚手架；
- 🔍 [模式 B：选品与痛点诊断]：剖析该细分领域 2~3 星真实差评与刚需；
- 🛡️ [模式 C：合规与安全防线]：平台规则、接口风控与防封免拒声明；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对目标客户的即用破冰成交物料。

问诊先问三件事：你选哪个工种加哪个城市圈、你每周能稳定发多少封一对一个性化外联（不是群发）、你给每家客户定的每月小改上限是多少。第二个问题答不出具体数字就先别开工——对标案例的成交率只有约 1%，200 封外联才出首批 3 家，量不够就没有漏斗。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

一手信源：AISIDE WEEKLY 第 33 期（2026-11-09 至 11-15，整理于 2026-11-16），转述 Reddit 操盘者 @lazarbetterrun 自述，C 级证据，未经第三方支付核验。路径：用 Claude 免费版为本地屋顶承包商生成定制单页，录 2 分钟 Loom 视频发冷邮件，客户同意上线即签 199 美元/月托管与维护协议。首批 200 封冷信获 12 人回复、6 场 Zoom 沟通、成交 3 人；随后数月再发约 2,000-2,500 封，累计签约 23 家、流失 4 家、现存 19 家，邮件成交率约 1%；上月追加销售后月流水约 4,400 美元 MRR（19×199=3,781 美元，差额为未披露内容的追加销售）。

| 项目 | 数字 | 口径 |
|---|---|---|
| 月费 | $199/月 | 托管 + 日常维护，免建站费 |
| 累计签约 / 现存 | 23 家 / 19 家 | 操盘者自述，流失 4 家（约 17%） |
| 对标方 MRR | 约 $4,400 | 含追加销售，自述流水非利润 |
| 外联成交率 | 约 1% | 200 封出首批 3 家 |
| 复制者稳态目标 | $1,500~$3,500/月 | 8~18 家在约客户，扣托管与工具成本后 |
| 启动成本 | $30~$80/月 | 域名、托管、发信域名、Loom/Stripe 基础档 |

漏斗精算（复制者口径）：每 200 封个性化外联按 1% 成交出约 2 家新客户；维护 15 家客户每月约需 200 封持续外联补流失与增长。单客月费 199 美元，单客每月维护工时必须压在 1 小时以内，超限改动一律走追加销售，否则利润被工时吃掉。

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构

商户筛选打分、单页站生成、合规外联邮件草稿与漏斗测算脚本（纯标准库，可直接运行）。输入为商户公开信息（名称、工种、城市、电话、评价数、评分、是否有网站），输出优先级排序、每家一页 HTML 预览与一封带真实身份占位和退订行的个性化邮件草稿。运行前把 SENDER 里的姓名、公司、邮寄地址换成操盘手真实信息，严禁编造商户评价与资质。

```python
"""Local trades lead scoring, one-page site generator, and compliant outreach drafts."""
import html
import json
import os

PLAN_PRICE_USD = 199
SENDER = {
    "name": "Alex Operator",          # replace with the real operator name
    "company": "Local Sites Studio",  # replace with the real business name
    "postal_address": "100 Main St, Austin, TX 78701",  # real postal address required
    "reply_email": "alex@localsites.example",
}

def score_lead(lead):
    """Rank prospects: no website and active reviews signal the strongest gap."""
    score = 0
    if not lead.get("has_website"):
        score += 40
    elif lead.get("website_outdated"):
        score += 20
    score += min(lead.get("review_count", 0), 200) / 200 * 30
    rating = lead.get("rating", 0)
    if rating >= 4.5:
        score += 20
    elif rating >= 4.0:
        score += 10
    if lead.get("phone"):
        score += 10
    return round(score, 1)

def render_site(lead):
    """Render a one-page preview site from the business's own public facts only."""
    name = html.escape(lead["name"])
    trade = html.escape(lead["trade"])
    city = html.escape(lead["city"])
    phone = html.escape(lead.get("phone", ""))
    services = "".join(f"<li>{html.escape(s)}</li>" for s in lead.get("services", []))
    reviews = lead.get("review_count", 0)
    rating = lead.get("rating", 0)
    review_line = f"<p>Rated {rating} from {reviews} public reviews.</p>" if reviews else ""
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>{name} | {trade} in {city}</title></head>
<body>
<header><h1>{name}</h1><p>{trade} serving {city}</p>
<a href="tel:{phone}">Call {phone}</a></header>
<section><h2>Services</h2><ul>{services}</ul></section>
<section><h2>Reviews</h2>{review_line}</section>
<section><h2>Service area</h2><p>{city} and nearby neighborhoods.</p></section>
<footer><p>Preview site. Content uses public business information only.</p></footer>
</body></html>"""

def draft_email(lead, preview_url, video_url):
    """One-to-one outreach draft with identity, scope, and opt-out. Never blast-send."""
    return f"""Subject: I built a draft website for {lead['name']}

Hi {lead['name']} team,

I put together a free draft one-page website for your {lead['trade']} business
in {lead['city']}. Preview: {preview_url}
Short walkthrough video: {video_url}

There is no build fee. If you approve going live, hosting and maintenance are
${PLAN_PRICE_USD}/month, including SSL, backups, and up to 2 small edits per
month. You can cancel anytime; extra pages are quoted separately.

Worth a look?

{SENDER['name']}, {SENDER['company']}
{SENDER['postal_address']}
Reply STOP and I will not email again."""

def funnel(emails_sent, reply_rate=0.06, close_rate=0.01, churn_rate=0.17, months=6):
    """Estimate clients and MRR from outreach volume using benchmark rates."""
    new_clients = emails_sent * close_rate
    active = new_clients * (1 - churn_rate)
    return {
        "emails_sent": emails_sent,
        "expected_replies": round(emails_sent * reply_rate),
        "expected_new_clients": round(new_clients, 1),
        "active_after_churn": round(active, 1),
        "mrr_usd": round(active * PLAN_PRICE_USD),
        "six_month_revenue_usd": round(active * PLAN_PRICE_USD * months),
    }

def main():
    leads = [
        {"name": "Summit Roofing Co", "trade": "Roofing", "city": "Austin",
         "phone": "512-555-0101", "review_count": 132, "rating": 4.8,
         "has_website": False, "services": ["Roof replacement", "Leak repair", "Inspections"]},
        {"name": "Hill Country Roof Pros", "trade": "Roofing", "city": "Austin",
         "phone": "512-555-0102", "review_count": 47, "rating": 4.2,
         "has_website": True, "website_outdated": True, "services": ["Repairs", "Gutters"]},
        {"name": "Lakeside Roofing LLC", "trade": "Roofing", "city": "Austin",
         "phone": "512-555-0103", "review_count": 8, "rating": 3.9,
         "has_website": True, "website_outdated": False, "services": ["New roofs"]},
    ]
    ranked = sorted(leads, key=score_lead, reverse=True)
    os.makedirs("demo_out", exist_ok=True)
    for lead in ranked:
        slug = lead["name"].lower().replace(" ", "-")
        path = os.path.join("demo_out", slug + ".html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(render_site(lead))
        print(f"{score_lead(lead):>5}  {lead['name']}  -> {path}")
    top = ranked[0]
    print("\n--- outreach draft for top lead ---")
    print(draft_email(top, "https://preview.example/summit-roofing", "https://loom.example/abc"))
    print("\n--- funnel estimate ---")
    print(json.dumps(funnel(200), indent=2))

if __name__ == "__main__":
    main()
```

运行方式：把脚本存为 `local_trades_kit.py` 后执行 `python3 local_trades_kit.py`，会在当前目录生成 `demo_out/` 预览页并打印排序、邮件草稿与漏斗测算。正式外联前逐封人工核对商户信息，邮件必须一对一发送并保留退订记录。

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录

单页站生成 Prompt（每家商户单独跑，禁止套用别家文案）：

```text
你是一名本地服务网站文案编辑。只使用下面这家商户的公开信息生成单页站文案：
商户：{{name}}；工种：{{trade}}；城市：{{city}}；电话：{{phone}}；
服务：{{services}}；公开评价：{{rating}} 分 / {{review_count}} 条。
硬规则：不编造评价原文、资质、获奖与服务承诺；首屏必须有电话按钮与城市名；
服务区只写信息里给出的范围；输出：首屏标题、服务清单、评价区一句话、
服务区域段、联系表单字段建议。语气朴实，像本地工匠自己说话。
```

协议要点备忘（签约前逐项写进电子协议）：月费 199 美元含托管、SSL、备份与每月 2 次小改；超限改动与新页面按追加销售报价；客户可随时取消，取消后站面下线，域名归属与迁移方式写明；响应时限工作日 48 小时内；客户提供的信息真实性由客户负责。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

合规红线：冷邮件只做一对一个性化发送，正文带操盘手真实姓名、公司、邮寄地址与退订方式，退订立即停发；严禁购买邮箱名单群发、伪造发信域名或用免费邮箱批量外联，发信域名信誉一旦烧掉整条漏斗报废。站面只使用商户公开信息，不编造评价与资质，不冒用商户品牌做广告投放。

冷启节奏：第一周筛 200 家名单并生成首批站面与视频；第二至三周逐封外联、跟进回复、约 Zoom 演示；首批 2-3 家签约后把维护工时逐家记账，单客月工时压在 1 小时内。每月复盘流失（对标方约 17%），流失客户先访谈原因再补外联量。客户数未到 15 家不要扩第二个工种，维护纪律崩了月费盘子会一起崩。
