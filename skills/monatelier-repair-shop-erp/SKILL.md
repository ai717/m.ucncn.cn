---
name: "monatelier-repair-shop-erp"
description: "专为【Mon Atelier 式维修店一体化 ERP】定制的生产级商业操盘 Agent 技能包。内置工单状态机、报价确认、合规开票与库存扣减的真实代码、单位经济测算与跑店冷启 SOP。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Mon Atelier 式维修店一体化 ERP

> **资产级别**: MoneyLab Institutional Grade (Tier C, 65 分)
> **商业定位**: 维修工单、报价、发票、库存、POS、预约与客户通知一站式，本地合规内置做护城河。原版 BizPeel/TrustMRR 数据：MRR 约 2,931 美元、近 30 天约 3,600 美元、累计约 2.2 万美元、70 家店、19 欧元/月起。复制者单国单品类稳态目标 1,500~4,000 美元/月。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的维修行业数字化全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供工单状态机、报价确认与库存扣减的核心代码脚手架；
- 🔍 [模式 B：选品与痛点诊断]：剖析目标国家维修店的工单流程与合规要求；
- 🛡️ [模式 C：合规与安全防线]：开票台账法规、客户数据隔离与备份策略；
- 📈 [模式 D：商业转化与冷启动]：提供一份上门演示的即用话术与试用转化物料。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
一手信源：BizPeel 报告（https://bizpeel.com/project/mon-atelier，数据截至 2026-10-28）与 TrustMRR 条目（MRR 约 2.9K 美元、70 家店、19 欧元/月起，含 NF525、2026 电子发票、二手货警方台账、FEC 导出等法国合规）。

| 指标 | 原版实测 | 复制者稳态假设 |
| --- | --- | --- |
| 起步价 | 19 欧元/月 | 19~39 欧元/月（按门店分档） |
| 在用门店 | 70 家 | 30~80 家（单国单品类） |
| MRR | 约 $2,931 | $1,500~$4,000 |
| 近 30 天收入 | 约 $3,600 | 随门店数线性增长 |
| 累计收入 | 约 $22K | - |
| 试用 | 14 天免费 | 14 天 + 数据导入锁定 |

漏斗测算（复制者）：上门演示 40 家 → 试用 20 家 → 付费 12 家/季度 → 4 个季度滚存约 48 家 → 按单店平均 35 欧元/月计 MRR 约 1,680 欧元，叠加多店版与短信包后可达 2,500~4,000 美元/月。工单与库存数据沉淀后，月流失可压到 2% 以下。

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构
以下 Python 脚本实现维修 ERP 核心：工单状态流转（接机→报价→维修→待取→完成）、报价客户确认、配件库存扣减、合规发票生成与取机通知队列。直接运行即可看到完整演示输出。

```python
import sqlite3, json

DB = sqlite3.connect(":memory:")
DB.row_factory = sqlite3.Row
DB.executescript("""
CREATE TABLE parts (sku TEXT PRIMARY KEY, name TEXT, stock INTEGER, price_cents INTEGER);
CREATE TABLE tickets (id INTEGER PRIMARY KEY, customer TEXT, phone TEXT, device TEXT,
  issue TEXT, status TEXT DEFAULT 'intake', quote_cents INTEGER DEFAULT 0, quote_approved INTEGER DEFAULT 0);
CREATE TABLE ticket_parts (ticket_id INTEGER, sku TEXT, qty INTEGER);
CREATE TABLE invoices (id INTEGER PRIMARY KEY, ticket_id INTEGER, total_cents INTEGER, tax_cents INTEGER, payload TEXT);
CREATE TABLE sms_queue (id INTEGER PRIMARY KEY, phone TEXT, body TEXT, sent INTEGER DEFAULT 0);
""")
FLOW = ["intake", "quoted", "repairing", "ready", "done"]

def add_part(sku, name, stock, price_cents):
    DB.execute("INSERT INTO parts VALUES(?,?,?,?)", (sku, name, stock, price_cents)); DB.commit()

def create_ticket(customer, phone, device, issue):
    cur = DB.execute("INSERT INTO tickets(customer,phone,device,issue) VALUES(?,?,?,?)", (customer, phone, device, issue))
    DB.commit(); return cur.lastrowid

def set_quote(ticket_id, labor_cents, parts):
    total = labor_cents
    for sku, qty in parts:
        row = DB.execute("SELECT price_cents, stock FROM parts WHERE sku=?", (sku,)).fetchone()
        assert row and row["stock"] >= qty, f"insufficient stock for {sku}"
        total += row["price_cents"] * qty
        DB.execute("INSERT INTO ticket_parts VALUES(?,?,?)", (ticket_id, sku, qty))
    DB.execute("UPDATE tickets SET quote_cents=?, status='quoted' WHERE id=?", (total, ticket_id)); DB.commit()
    return total

def approve_quote(ticket_id):
    DB.execute("UPDATE tickets SET quote_approved=1, status='repairing' WHERE id=?", (ticket_id,))
    for tp in DB.execute("SELECT sku, qty FROM ticket_parts WHERE ticket_id=?", (ticket_id,)).fetchall():
        DB.execute("UPDATE parts SET stock=stock-? WHERE sku=?", (tp["qty"], tp["sku"]))
    DB.commit()

def mark_ready(ticket_id):
    t = DB.execute("SELECT * FROM tickets WHERE id=?", (ticket_id,)).fetchone()
    DB.execute("UPDATE tickets SET status='ready' WHERE id=?", (ticket_id,))
    DB.execute("INSERT INTO sms_queue(phone, body) VALUES(?,?)",
               (t["phone"], f"Your {t['device']} is ready for pickup. Ticket #{ticket_id}."))
    DB.commit()

def issue_invoice(ticket_id, tax_rate=0.20):
    t = DB.execute("SELECT * FROM tickets WHERE id=?", (ticket_id,)).fetchone()
    assert t["status"] == "ready", "invoice only after ready"
    tax = round(t["quote_cents"] * tax_rate / (1 + tax_rate))
    payload = json.dumps({"ticket": ticket_id, "customer": t["customer"], "device": t["device"],
                          "total_cents": t["quote_cents"], "tax_cents": tax, "ledger": "second-hand-police-ledger-entry"})
    cur = DB.execute("INSERT INTO invoices(ticket_id,total_cents,tax_cents,payload) VALUES(?,?,?,?)",
                     (ticket_id, t["quote_cents"], tax, payload))
    DB.execute("UPDATE tickets SET status='done' WHERE id=?", (ticket_id,)); DB.commit()
    return cur.lastrowid

if __name__ == "__main__":
    add_part("SCR-IP13", "iPhone 13 screen", 5, 8900)
    add_part("BAT-IP13", "iPhone 13 battery", 8, 3900)
    tid = create_ticket("Léa Martin", "+33612345678", "iPhone 13", "Cracked screen")
    total = set_quote(tid, labor_cents=4000, parts=[("SCR-IP13", 1)])
    print(f"QUOTE ticket #{tid}: {total} cents")
    approve_quote(tid)
    print("STOCK after approval:", DB.execute("SELECT stock FROM parts WHERE sku='SCR-IP13'").fetchone()[0])
    mark_ready(tid)
    print("SMS QUEUE:", [dict(r) for r in DB.execute("SELECT phone, body FROM sms_queue").fetchall()])
    inv = issue_invoice(tid)
    print("INVOICE:", dict(DB.execute("SELECT * FROM invoices WHERE id=?", (inv,)).fetchone()))
    assert DB.execute("SELECT stock FROM parts WHERE sku='SCR-IP13'").fetchone()[0] == 4
    assert DB.execute("SELECT status FROM tickets WHERE id=?", (tid,)).fetchone()[0] == "done"
    print("OK: ticket flow, stock deduction and invoice verified")
```

生产部署要点：内存库换 PostgreSQL 并按门店做行级隔离；报价确认走客户短信链接（免登录、带签名）；发票模块按目标国家法规生成合规格式并保留审计日志；短信走 Twilio 等通道并计入套餐额度。

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录
上门演示话术（即用版）：
「老板，我不卖软件，我帮您把接机本换掉：接机扫码建单、报价发客户手机确认、修好自动短信通知取机、开票一键出合规发票。14 天免费试用，我帮您把客户和配件数据导进来，不好用您删了就行，数据可以导出带走。」

试用转化清单：导入历史客户 → 导入配件库存 → 跑通第一张真实工单 → 开通短信通知 → 第 10 天回访看报表 → 第 14 天前确认订阅档位。

合规自检清单（按国家替换）：开票格式与税率 → 二手货台账字段 → 财务导出格式 → 数据保留年限 → 客户数据删除流程。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 合规跟进：指定专人跟踪当地开票与台账法规变化，法规生效前 60 天完成系统更新并通知门店。
- 数据安全：每店数据隔离、每日备份、员工分级权限，客户手机号脱敏展示。
- 冷启节奏：先同城 20 家标杆店（上门演示加批发商转介绍），再靠店主转介绍扩到 50~80 家，不投线上广告。
- 续费抓手：月度经营报表（接单量、平均客单、配件周转）让店主每月打开一次，报表即续费理由。
- 边界：不承诺代运营、不碰维修本身，系统只管流程与账目。
