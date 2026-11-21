---
name: "vendplacer-vending-location-marketplace"
description: "专为【VendPlacer 式自动售货机点位撮合市场】定制的生产级商业操盘 Agent 技能包。内置双边市场冷启 SOP、联系方式付费墙与程序化 SEO 页生成源码、单位经济测算与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "线下数字化线索"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: VendPlacer 式自动售货机点位撮合市场

> **资产级别**: MoneyLab Institutional Grade (Tier C, 68 分)
> **商业定位**: 业主免费挂点位、运营商免费浏览，249 美元年费解锁直联业主，平台零抽成。原版 BizPeel 公开渠道数据：MRR 4,480 美元、187 个活跃订阅、近 30 天收入 1.37 万美元，官网挂 22,876 个点位、覆盖 420 城。复制者单国/单城市群稳态目标 1,500~4,000 美元/月。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的点位撮合市场全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供点位库、付费墙与 SEO 页生成的核心代码脚手架；
- 🔍 [模式 B：选品与痛点诊断]：剖析目标城市的点位供给密度与运营商付费意愿；
- 🛡️ [模式 C：合规与安全防线]：假点位治理、联系方式防爬与不经手租金的资金边界；
- 📈 [模式 D：商业转化与冷启动]：提供一份给本地运营商社群的即用招募物料。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
一手信源：BizPeel 报告（https://bizpeel.com/project/vendplacer，数据截至 2026-10-25，收入同步至 2026-11-21）与官网 vendplacer.com（22,876 个点位、420 城，2026-11-21 实测）。收费：业主免费发布、运营商免费浏览，249 美元/年解锁不限次直联，租金 48~150 美元/月双方直结。

| 指标 | 原版实测 | 复制者稳态假设 |
| --- | --- | --- |
| 年费价格 | $249/年 | $199~$299/年 |
| 活跃订阅 | 187 | 70~190（单城市群） |
| MRR（年费折算） | $4,480 | $1,500~$4,000 |
| 近 30 天收入 | $13.7K | 随年费续费季节波动 |
| 点位供给 | 22,876 个 / 420 城 | 一城 200+ 才算做透 |
| 平台抽成 | 0（租金直结） | 0（不经手资金） |

漏斗测算（复制者单城）：SEO 与社群月访 3,000 → 注册运营商 150 → 付费年费 12~20 单/月 → 12 个月滚存 150~240 个订阅 → 年费折算 MRR 约 2,500~4,000 美元。扣 Stripe 手续费约 3% 与服务器约 50 美元/月后，毛利率约 90%。

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构
以下 Python 脚本实现撮合站核心：点位发布与核实、免费浏览脱敏、付费解锁联系方式、按城市/场所生成 SEO 落地页数据。直接运行即可看到完整演示输出。

```python
import sqlite3

DB = sqlite3.connect(":memory:")
DB.row_factory = sqlite3.Row
DB.executescript("""
CREATE TABLE listings (id INTEGER PRIMARY KEY, city TEXT, venue TEXT, area TEXT,
  rent_usd INTEGER, contact_name TEXT, contact_phone TEXT, verified INTEGER DEFAULT 0, placed INTEGER DEFAULT 0);
CREATE TABLE members (id INTEGER PRIMARY KEY, email TEXT, plan TEXT, paid_until TEXT);
""")

def add_listing(city, venue, area, rent, name, phone, verified=True):
    cur = DB.execute("INSERT INTO listings(city,venue,area,rent_usd,contact_name,contact_phone,verified) VALUES(?,?,?,?,?,?,?)",
                     (city, venue, area, rent, name, phone, int(verified)))
    DB.commit()
    return cur.lastrowid

def add_member(email, plan, paid_until):
    cur = DB.execute("INSERT INTO members(email,plan,paid_until) VALUES(?,?,?)", (email, plan, paid_until))
    DB.commit()
    return cur.lastrowid

def is_paid(member_id, today):
    row = DB.execute("SELECT paid_until FROM members WHERE id=?", (member_id,)).fetchone()
    return bool(row and row["paid_until"] >= today)

def browse(member_id, city, today):
    rows = DB.execute("SELECT * FROM listings WHERE city=? AND verified=1 AND placed=0", (city,)).fetchall()
    paid = is_paid(member_id, today)
    out = []
    for r in rows:
        item = {"id": r["id"], "venue": r["venue"], "area": r["area"], "rent_usd": r["rent_usd"]}
        if paid:
            item["contact"] = f'{r["contact_name"]} {r["contact_phone"]}'
        else:
            item["contact"] = "LOCKED: upgrade to $249/yr to contact the owner"
        out.append(item)
    return out

def seo_pages():
    rows = DB.execute("SELECT city, venue, COUNT(*) n FROM listings WHERE verified=1 GROUP BY city, venue").fetchall()
    return [{"url": f'/locations/{r["city"].lower().replace(" ","-")}/{r["venue"].lower()}',
             "title": f'Vending Machine Locations in {r["city"]} - {r["venue"]} ({r["n"]} spots)'} for r in rows]

if __name__ == "__main__":
    add_listing("Austin", "Gym", "Downtown", 120, "Maria", "+1-512-555-0101")
    add_listing("Austin", "Office", "North Loop", 90, "James", "+1-512-555-0102")
    add_listing("Dallas", "Mall", "Uptown", 150, "Priya", "+1-214-555-0103")
    free_user = add_member("free@example.com", "free", "2026-01-01")
    paid_user = add_member("op@example.com", "annual-249", "2027-11-21")
    print("FREE VIEW:", browse(free_user, "Austin", "2026-11-21"))
    print("PAID VIEW:", browse(paid_user, "Austin", "2026-11-21"))
    print("SEO PAGES:", seo_pages())
    assert "LOCKED" in browse(free_user, "Austin", "2026-11-21")[0]["contact"]
    assert "+1-512" in browse(paid_user, "Austin", "2026-11-21")[0]["contact"]
    print("OK: paywall and SEO page generation verified")
```

生产部署要点：把内存库换成 PostgreSQL；联系方式接口加登录态、限流（每会员每小时最多解锁 30 条）与验证码；点位发布后人工电话核实才置 verified=1；成交后业主一键置 placed=1 下架。

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录
运营商社群招募帖（即用版）：
「同城点位更新：本月新核实 X 个可放机点位（健身房/写字楼/商场），租金 48~150 美元/月，业主直联、平台不抽成。免费看概况，249 美元年费解锁全部联系方式。已有 Y 位本地运营商在用，点位先到先得，成交即下架。」

业主邀约话术（即用版）：
「您店里闲置的角落可以放一台自动售货机，每月收 48~150 美元租金，机器和补货都由运营商负责，您只提供电源和位置。免费挂到我们平台，运营商主动联系您谈条件，不成交不收费。」

点位核实清单（每条必走）：地址真实 → 场所类型与面积 → 月租期望 → 电源可用 → 业主确认可放机 → 成交后下架回访。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 假点位是生死线：每条点位人工核实、成交下架、过期点位 60 天复核，宁可供给少也不能有假。
- 资金边界：平台只收年费，租金押金双方直结并在页面明示，避免资金纠纷与监管风险。
- 联系方式防爬：登录后可见、限流、联系方式分段展示、异常批量解锁封号。
- 冷启顺序：一城供给 30+ → 社群招募首批付费运营商 → 成交案例回帖 → 供给滚到 200+ 再扩第二城。
- 续费运营：年费到期前 30 天提醒并附本年新增点位清单，第二年续费率是核心指标。
