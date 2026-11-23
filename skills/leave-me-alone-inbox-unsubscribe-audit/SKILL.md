---
name: "leave-me-alone-inbox-unsubscribe-audit"
description: "专为【收件箱退订审计 SaaS】定制的生产级商业操盘 Agent 技能包。内置 Gmail 只读扫描与退订链接提取源码、隐私信任话术与通行证付费墙物料。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Leave Me Alone 式收件箱退订审计 SaaS

> **资产级别**: MoneyLab Institutional Grade (Tier C)
> **商业定位**: 隐私优先的收件箱大扫除工具，7 天通行证 $19 + 年付 $48 起；复制者稳态目标 $300-$1,500/月。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供 Gmail 只读扫描与退订提取源码；
- 🔍 [模式 B：选品与痛点诊断]：剖析收件箱订阅泛滥与隐私顾虑；
- 🛡️ [模式 C：合规与安全防线]：OAuth 最小权限与 Google 安全审计清单；
- 📈 [模式 D：商业转化与冷启动]：提供隐私对比页与通行证定价物料。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- 原版证据：leavemealone.com 官网定价（免费退订 10 封；7 天通行证 $19；年付 $48/$72/$59）；NeeWP/Indie Hackers Stripe Live 验证约 $14.0K/月（2026-11-22），A 级证据。
- 复制者漏斗精算：对比页与社区触达 3,000 人 → 授权扫描 20% = 600 人 → 免费额度用完后通行证转化 8% = 48 人 × $19 ≈ $912 一次性收入，年付续费另计。

| 环节 | 转化率 | 人数/金额 |
|:--- |:--- |:--- |
| 对比页触达 | - | 3,000 人 |
| 授权扫描 | 20% | 600 人 |
| 通行证付费 | 8% | 48 人 ≈ $912 |
| 年付守护 | 3% | 18 人 ≈ $864/年 |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构
核心是「只读扫描 → 按发件人聚合 → 提取退订端点」。以下为可直接运行的 Python 脚本（默认演示模式用内置样本头，无需凭证；真实模式接 Gmail API metadata 格式，绝不拉正文）：

```python
#!/usr/bin/env python3
"""Inbox subscription audit: scan Gmail headers, aggregate senders, extract unsubscribe links.

Demo mode (default): runs on built-in sample headers, no credentials needed.
Real mode: set GMAIL_TOKEN_JSON to a token file from google-auth, then call fetch_headers().
Only headers are read (metadata format); message bodies are never fetched or stored.
"""
import re
from collections import Counter, defaultdict

UNSUB_RE = re.compile(r"<([^>]+)>")
MAILTO_RE = re.compile(r"mailto:([^>?]+)", re.I)

def parse_list_unsubscribe(header: str) -> dict:
    """Parse a List-Unsubscribe header into https / mailto endpoints."""
    result = {"https": None, "mailto": None, "one_click": False}
    if not header:
        return result
    for part in UNSUB_RE.findall(header):
        part = part.strip()
        if part.lower().startswith("http"):
            result["https"] = part
        elif part.lower().startswith("mailto:"):
            m = MAILTO_RE.search(part)
            result["mailto"] = m.group(1) if m else part[7:]
    return result

def audit(headers: list) -> list:
    """Aggregate subscription senders from a list of header dicts."""
    counts = Counter()
    endpoints = {}
    for h in headers:
        sender = (h.get("From") or "").strip()
        unsub = h.get("List-Unsubscribe", "")
        post = (h.get("List-Unsubscribe-Post") or "").strip()
        if not sender or not unsub:
            continue
        parsed = parse_list_unsubscribe(unsub)
        parsed["one_click"] = post.lower() == "list-unsubscribe=one-click" and bool(parsed["https"])
        counts[sender] += 1
        endpoints[sender] = parsed
    rows = []
    for sender, n in counts.most_common():
        ep = endpoints[sender]
        rows.append({"sender": sender, "count": n,
                     "unsubscribe_url": ep["https"], "mailto": ep["mailto"],
                     "one_click": ep["one_click"]})
    return rows

def fetch_headers(service, max_results: int = 500) -> list:
    """Real Gmail path: list messages, fetch metadata headers only."""
    headers = []
    resp = service.users().messages().list(userId="me", maxResults=max_results).execute()
    for msg in resp.get("messages", []):
        full = service.users().messages().get(
            userId="me", id=msg["id"], format="metadata",
            metadataHeaders=["From", "List-Unsubscribe", "List-Unsubscribe-Post"]).execute()
        hdrs = {h["name"]: h["value"] for h in full.get("payload", {}).get("headers", [])}
        headers.append(hdrs)
    return headers

SAMPLE = [
    {"From": "Daily Deals <deals@shop.example>", "List-Unsubscribe": "<https://shop.example/unsub?id=1>, <mailto:unsub@shop.example>", "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"},
    {"From": "Daily Deals <deals@shop.example>", "List-Unsubscribe": "<https://shop.example/unsub?id=2>", "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"},
    {"From": "News Weekly <news@news.example>", "List-Unsubscribe": "<mailto:leave@news.example>"},
    {"From": "Boss <boss@work.example>"},
]

if __name__ == "__main__":
    rows = audit(SAMPLE)
    for r in rows:
        print(f"{r['count']:>3}  {r['sender']}  one_click={r['one_click']}  url={r['unsubscribe_url']}  mailto={r['mailto']}")
    assert len(rows) == 2, "expected 2 subscription senders"
    assert rows[0]["count"] == 2 and rows[0]["one_click"] is True
    print("OK: audit demo passed,", len(rows), "senders")
```

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录
隐私信任话术（首页第一屏）：「我们不卖你的数据。只读扫描、只看发件人与退订头、不存邮件正文，随时一键断开。」对比页锚点：「老牌工具靠卖数据赚钱，我们靠你付的 19 美元赚钱。」

定价分层：免费退订 10 封；7 天通行证 $19（一次大扫除）；年付 $48/$72/$59（持续拦截新订阅）。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 红线：OAuth 只申请 gmail.metadata 只读范围；Google 安全审计预留 2-4 周与费用；绝不存储邮件正文、绝不卖数据。
- 防线：一键退订（RFC 8058）优先，失败给手动链接兜底；拉黑前二次确认，防误杀重要发件人。
- 冷启：vs 老牌工具数据政策对比页 → Product Hunt 隐私故事 → 独立开发者社区首发。
- 72 小时节拍：Day1 定人群与话术，Day2 扫描聚合 MVP，Day3 付费墙上线并邀请首批 20 位用户免费扫一遍。
