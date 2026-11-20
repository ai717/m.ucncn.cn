---
name: "liinks-link-in-bio-saas"
description: "专为定制的生产级商业操盘 Agent 技能包。内置静态页面生成器源码、垂直模板结构、订阅分层与徽章裂变物料。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Liinks 式链接聚合页 SaaS

> **资产级别**: MoneyLab Institutional Grade (Tier C)
> **商业定位**: 垂直创作者链接聚合页，Starter $5 压龙头、Pro $12 卖多页面，复制者稳态目标 $1,000-$4,000/月。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供页面生成器与数据结构源码；
- 🔍 [模式 B：选品与痛点诊断]：剖析垂直创作者的页面刚需；
- 🛡️ [模式 C：合规与安全防线]：滥用治理与付费发布防线；
- 📈 [模式 D：商业转化与冷启动]：提供徽章裂变与对比页物料。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- 原版证据：TrustMRR 验证 MRR $31,654、5,534 订阅、累计 $1,801,190（2026-11-11 同步），A 级证据；定价 Starter $5/月、Pro $12/月起，官网与多源一致。创始人熬 4 年到 $27K MRR，靠徽章裂变 + Google 搜索广告。
- 复制者漏斗精算：垂直社群触达 5,000 人 → 建页率 6% = 300 页 → 付费发布转化 25% = 75 订阅 × $6 均价 ≈ $450/月起步，徽章带来每月 10-15% 自然新增。

| 环节 | 转化率 | 人数/金额 |
|:--- |:--- |:--- |
| 社群触达 | - | 5,000 人 |
| 免费建页 | 6% | 300 页 |
| 付费发布 | 25% | 75 订阅 ≈ $450/月 |
| 徽章自然新增 | 10-15%/月 | 滚雪球 |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构
核心是「配置 → 静态页面」生成器：每个用户一份 JSON 配置，渲染成移动优先的 HTML 页面，托管成本极低。以下为可直接运行的生成器（Python 标准库）：

```python

import html

def render_page(cfg: dict) -> str:
    name = html.escape(cfg.get("name", "Creator"))
    bio = html.escape(cfg.get("bio", ""))
    blocks = []
    for link in cfg.get("links", []):
        title = html.escape(link.get("title", "Link"))
        url = html.escape(link.get("url", "#"), quote=True)
        blocks.append(f'<a class="btn" href="{url}" rel="noopener">{title}</a>')
    badge = '<div class="badge">Made with LinkPage</div>' if cfg.get("badge", True) else ""
    head = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\">"
    style = "<style>body{font-family:system-ui;margin:0;background:#111;color:#fff}.wrap{max-width:480px;margin:0 auto;padding:32px 16px;text-align:center}.btn{display:block;margin:12px 0;padding:14px;border-radius:12px;background:#fff;color:#111;text-decoration:none;font-weight:600}.badge{margin-top:24px;font-size:12px;opacity:.6}</style></head>"
    body = f"<body><div class=\"wrap\"><h1>{name}</h1><p>{bio}</p>{''.join(blocks)}{badge}</div></body></html>"
    return head + f"<title>{name} - Links</title>" + style + body

if __name__ == "__main__":
    demo = {"name": "Demo Artist", "bio": "New single out now",
            "links": [{"title": "Listen on Spotify", "url": "https://open.spotify.com"},
                      {"title": "Tour Dates", "url": "https://example.com/tour"}]}
    out = render_page(demo)
    open("demo-page.html", "w", encoding="utf-8").write(out)
    print("rendered bytes:", len(out))
    print("has badge:", "Made with LinkPage" in out)
```

数据结构：users(id, slug, plan) + pages(id, user_id, config_json, custom_domain) + clicks(page_id, link_idx, ts)；点击统计用异步写，别阻塞页面打开。

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录
垂直模板示例（独立音乐人）：试听播放器、演出日程、周边商店、邮件订阅、EPK 下载。对比页文案锚点：「比 Linktree 便宜 1 美元、页面更好看、自定义域名不用升最高档。」

订阅分层：Starter $5/月单页面；Pro $12/月起 5 页面 + 自定义域名，多页面叠加收费（机构客户可到 $100+/月）；年付送两个月。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 红线：预览免费、发布付费，防垃圾页面；链接目标做恶意网址扫描。
- 防线：不做通用克隆，只打一个垂直人群，模板深度即壁垒。
- 冷启：徽章裂变 → vs 龙头对比 SEO 页 → 垂直社区首发；广告等转化验证后再小额测。
- 72 小时节拍：Day1 定人群与模板，Day2 生成器 + 编辑器 MVP，Day3 支付上线并邀请首批 20 位创作者免费建页。
