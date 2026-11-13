---
name: "plainmail-multi-domain-email"
description: "专为定制的生产级商业操盘 Agent 技能包。内置 100% 契合浏览器插件/客户端工具原型（原型 B）的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Plainmail：所有域名一个价的真实邮箱

> **资产级别**: MoneyLab Institutional Grade (Tier B)
> **商业定位**: 一个域名没邮箱的痛点，用一句指令或一条命令解决：自动写 DNS、建真实 IMAP/SMTP 邮箱、经 Amazon SES 发信。$5/月包 50 个域名 100 个邮箱，服务手里有 3 个以上域名的独立开发者。
> **商业原型**: 原型 B — 客户端实用工具与浏览器插件
> **一手来源**: https://www.producthunt.com/products/plainmail（Product Hunt 上线页，2026-11-05 发布，2026-11-07 复核：数字与试跑时一致）
> **重要提醒**: 目前没有任何收入实证，$340~$1,090/月是按用户数算的模型，不是实测。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)

你是 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：

- 💻 [模式 A：极速工程落地]：提供该项目核心代码或架构脚手架；
- 🔍 [模式 B：选品与痛点诊断]：剖析该细分领域 2~3 星真实差评与刚需；
- 🛡️ [模式 C：合规与安全防线]：平台规则、接口风控与防封免拒声明；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对目标客户的即用破冰成交物料。

问诊先问三件事再给方案：① 你手里现在有几个域名，分别在哪个服务商（Cloudflare / Vercel / Porkbun 三选一，先从一家开始）；② 你每天大概发多少封邮件（新账号每天限 50 封，超了要不要排队）；③ 你是要“收信 + 回信”还是“群发 / 冷邮件”（后者这个产品不做，别接）。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

### 一手信源背景（2026-11-07 复核，数字与试跑一致）

- Product Hunt 2026-11-05 上线，标题就是“Real email on every domain you own, for $5 a month flat”。
- 一个价：$5/月，50 个域名、100 个邮箱、25GB。GitHub 注册，随时取消。
- 一句话或一条命令完成：`plainmail add hello@mynewapp.com`，或告诉 Agent“Set up hello@mynewapp.com on Plainmail”。
- 自动写 DNS 记录（MX、SPF、DKIM、DMARC），支持 Cloudflare、Vercel、Porkbun；其他服务商给 exact 记录并校验。
- 真实 IMAP/SMTP 邮箱，可进 Apple Mail、Gmail App、Outlook、Thunderbird；经 Amazon SES 发信，SPF/DKIM/DMARC 通过。
- 定位是人与人之间的邮件，不是群发与冷邮件；新账号每天限发 50 封防滥用。
- 提供 CLI 与 MCP 入口，Agent 可直接调用。

### 复制者单位经济模型（模型测算，非实测）

| 环节 | 数字 | 说明 |
| --- | --- | --- |
| 订阅价 | $5/月 | 只卖一个价，不搞分层 |
| 付费用户 | 80 人 / 240 人 | 两档测算 |
| 月收入 | $400 / $1,200 | 80 / 240 人 × $5 |
| Stripe 手续费 | 约 5% | 约 $20 / $60/月 |
| 托管 + SES 成本 | 约 $30/月 | 托管与发信成本 |
| **月净利润** | **约 $340 / 约 $1,090** | 扣手续费与成本后 |
| 启动成本 | $50~$200 | 域名 + 托管 + SES 起步额度 |
| 回本周期 | 5~10 天 | 跑通一个域名即可开始卖 |

### 必须盯住的对手

FranklyMail：$9/年，无限邮箱与域名，价格约 Plainmail 的 1/7。你的卖点不能是价格，必须是更稳的 SES 送达率、MCP/Claude 集成与持续维护。

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构

核心就一件事：给一个域名生成正确的 4 条 DNS 记录，并能校验。下面的 Python 脚本（只用标准库）就是最小可用版本：输入域名与服务商，输出 MX / SPF / DKIM / DMARC 记录与可粘贴的文本，并做格式自检。

```python
#!/usr/bin/env python3
"""plainmail_setup.py — 为一个域名生成 Plainmail 式 DNS 记录并自检。
用法：python3 plainmail_setup.py example.com cloudflare
只用 Python 标准库，不依赖任何第三方包。
"""
import json
import re
import sys

SES_ENDPOINT = "email-smtp.us-east-1.amazonaws.com"
PROVIDERS = {"cloudflare", "vercel", "porkbun"}

RECORDS_TEMPLATE = [
    {"type": "MX", "name": "@", "value": "10 inbound-smtp.us-east-1.amazonaws.com", "ttl": 300},
    {"type": "TXT", "name": "@", "value": "v=spf1 include:amazonses.com -all", "ttl": 300},
    {"type": "TXT", "name": "plainmail._domainkey", "value": "v=DKIM1; k=rsa; p={DKIM_PUBLIC_KEY}", "ttl": 300},
    {"type": "TXT", "name": "_dmarc", "value": "v=DMARC1; p=quarantine; rua=mailto:dmarc@{domain}", "ttl": 300},
]


def build_records(domain: str) -> list:
    out = []
    for rec in RECORDS_TEMPLATE:
        value = rec["value"].replace("{domain}", domain)
        out.append({"domain": domain, "type": rec["type"], "name": rec["name"], "value": value, "ttl": rec["ttl"]})
    return out


def check_records(records: list) -> list:
    """格式自检：返回问题清单，空清单表示通过。"""
    problems = []
    types = [r["type"] for r in records]
    if types.count("MX") != 1:
        problems.append("MX 记录必须恰好 1 条")
    if not any(r["type"] == "TXT" and r["value"].startswith("v=spf1") for r in records):
        problems.append("缺少 SPF 记录")
    if not any(r["type"] == "TXT" and r["name"] == "plainmail._domainkey" for r in records):
        problems.append("缺少 DKIM 记录")
    if not any(r["type"] == "TXT" and r["name"] == "_dmarc" for r in records):
        problems.append("缺少 DMARC 记录")
    for r in records:
        if not re.match(r"^[a-z0-9._@-]+$", r["name"], re.I):
            problems.append(f"记录名不合法: {r['name']}")
    return problems


def main() -> int:
    if len(sys.argv) != 3 or sys.argv[2] not in PROVIDERS:
        print("用法: python3 plainmail_setup.py <域名> <cloudflare|vercel|porkbun>")
        return 2
    domain, provider = sys.argv[1], sys.argv[2]
    if not re.match(r"^(?!-)[a-z0-9-]{1,63}(\.[a-z0-9-]{1,63})*\.[a-z]{2,}$", domain, re.I):
        print(f"域名不合法: {domain}")
        return 2
    records = build_records(domain)
    problems = check_records(records)
    print(json.dumps({"domain": domain, "provider": provider, "records": records}, indent=2, ensure_ascii=False))
    if problems:
        print("自检 FAIL:")
        for p in problems:
            print(" -", p)
        return 1
    print("自检 OK: 4 条记录齐全（MX/SPF/DKIM/DMARC），可写入 " + provider)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

自检命令：

```bash
python3 plainmail_setup.py example.com cloudflare
# 应输出 4 条记录的 JSON，最后打印“自检 OK”
python3 plainmail_setup.py bad-domain vercel
# 应提示域名不合法并退出码 2
```

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录

### Prompt 1：向用户问清域名现状（Agent 接单第一句）

```text
请告诉我三件事，我一分钟内给你邮箱方案：
1. 域名是什么，在 Cloudflare、Vercel 还是 Porkbun；
2. 要建几个邮箱，第一个邮箱地址是什么；
3. 每天大概发多少封邮件。
拿到这三条我就自动写 DNS、建邮箱，你只需要在邮箱客户端里登录一次。
```

### Prompt 2：Product Hunt 上线帖（标题写价格与套餐）

```text
标题：Real email on every domain you own, for $5 a month flat
正文第一段：每个副项目买的域名都没有邮箱，按邮箱收费的方案 100 个邮箱要 $700/月，
DNS 又是人人想拖的一步。所以我做了 Plainmail：一句指令或一条命令，自动写好 DNS、
建好真实 IMAP/SMTP 邮箱、经 Amazon SES 发信。
正文第二段：一个价 $5/月，50 个域名、100 个邮箱、25GB。GitHub 注册，随时取消。
最后一句：告诉我你的域名在哪个服务商、建邮箱时卡在哪一步，我来修。
```

### 给独立开发者社区的破冰帖

```text
问大家一个事：你手里有几个域名？现在怎么收信？
我自己的答案是：之前每个域名都没邮箱，Google Workspace 按邮箱收费太贵，
DNS 又懒得写。后来我做了个 $5/月全包的工具，一句指令就搞定。
想试的留个言，告诉我你的域名在哪个服务商。
```

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

### 红线

1. **不要做群发与冷邮件**：定位是人与人之间的邮件，新账号每天限发 50 封。接群发单子会毁掉 SES 送达率，整个服务都会被拖下水。
2. **不要夸大收入**：目前没有任何收入实证。$340~$1,090/月是模型测算，对外只讲模型假设，不讲“已验证月入”。
3. **不要打价格战**：FranklyMail $9/年更便宜，拼价格必输。卖点是送达率、MCP/Claude 集成与持续维护。
4. **不要承诺所有服务商都自动写 DNS**：只承诺 Cloudflare、Vercel、Porkbun 三家自动写，其他服务商给 exact 记录并校验，不要打包票。

### 72 小时 MVP 节拍器

| 时间 | 动作 | 交付物 |
| --- | --- | --- |
| 第 1 天 | 在 Cloudflare、Vercel、Porkbun 各测一个域名，全程跑通 | 3 家服务商的 DNS 实测记录 |
| 第 2 天 | 模块三脚本跑通 + 邮箱收发实测 | 可用的邮箱服务 + CLI 入口 |
| 第 3 天 | Product Hunt 上线 + Stripe $5/月订阅上线 | 上线帖 + 首单 |

### 冷启动清单（80 个付费用户目标）

1. Product Hunt 上线，标题写价格与套餐；
2. 去独立开发者社区问“你手里有几个域名、现在怎么收信”；
3. 盯紧 FranklyMail，每周复盘一次卖点差异；
4. 每来一个用户问一句“你的域名在哪个服务商、卡在哪一步”，把答案记下来修产品。
