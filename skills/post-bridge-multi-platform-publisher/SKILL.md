---
name: "post-bridge-multi-platform-publisher"
description: "专为【Post Bridge 式一键多平台分发】定制的生产级商业操盘 Agent 技能包。内置 100% 契合该商业原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Post Bridge 式一键多平台分发

> **资产级别**: MoneyLab Institutional Grade (Tier C · 63 分，值得观察)
> **商业定位**: 写一次内容，一键发到 Instagram、TikTok、YouTube、X 等多平台多账号，按账号数收订阅费（Marketer 39 美元/月起，15 个账号）；REST API、CLI 与 MCP 服务器让 AI 代发。原版 TrustMRR Stripe 验证 MRR 约 48,500 美元、累计收入约 58.2 万美元、约 1,600 订阅，一人运营，毛利 90% 以上。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)

你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：

- 💻 [模式 A：极速工程落地]：提供多平台 OAuth 接入 + 一键分发核心代码（本包 `postbridge_publish.py` 可直接跑通文案适配与发布队列校验）；
- 🔍 [模式 B：选品与痛点诊断]：剖析创作者多平台分发的真实耗时与现有排期工具的差评（贵、臃肿、按发帖量计费）；
- 🛡️ [模式 C：合规与安全防线]：各平台 API 政策、OAuth 授权范围、发帖失败降级与重试队列；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对短视频创作者的即用破冰成交物料（X 公开开发帖模板 + 创始价邀约）。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

**一手信源**：IndieFounder 原文（2026-11-14 发布）逐项核对一致。TrustMRR 直连 Stripe：MRR 约 48,500 美元、累计收入约 582,000 美元、约 1,600 订阅。Marketer 套餐 39 美元/月起（15 个账号），付费档不限发帖量。创始人 Jack Friks 一人运营，基建（Supabase、Vercel、Trigger.dev、Unkey、X API 等）低于 2,000 美元/月，毛利 90% 以上。2025 年春拒绝 100 万美元收购；2026 年 9 月上线 ChatGPT 插件与 Claude 连接器后注册量连创新高。获客几乎全靠 X 公开开发 + 短视频自带流量。

**复制者稳态漏斗精算**（按 300 个付费账号测算，Marketer 档为主）：

| 环节 | 数字 | 说明 |
| --- | --- | --- |
| 月订阅收入 | $11,700 | 300 账号 × $39/月 |
| 基建与 API 成本 | -$1,200 | Supabase/Vercel/Trigger.dev/各平台 API |
| 支付手续费（约 3%） | -$351 | Stripe |
| 月毛利 | 约 $10,149 | 毛利率约 87% |
| 获客成本 | $0~$30/人 | X 公开开发 + 短视频自然流为主 |
| 回本周期 | 首月 | 硬付费墙，无免费档烧钱 |
| 稳态月净利 | $2,000 ~ $6,000 | 扣掉创始人时间成本后的保守口径 |

**注意**：约 1,600 订阅与 29,000+ 注册为创始人自述快照数，引用时注明口径与日期；MRR 以 TrustMRR 实时数为准。

---

## 💻 模块三：生产级极简核心工程源码

以下为真实可运行代码（仅用 Python 标准库），已从本文件原样抽出实测通过：`python3 postbridge_publish.py` 输出 2 条内容、7 条待发布、0 个问题，并写出 `publish_plan.json`。

```python
#!/usr/bin/env python3
"""Post Bridge core engine: per-platform caption adaptation + publish queue.

Usage:
    python3 postbridge_publish.py [--manifest posts.json] [--out publish_plan.json]
With no arguments it runs on the built-in demo manifest and prints the plan.
Only the Python standard library is used.
"""

import argparse
import json
import sys
from pathlib import Path

PLATFORM_RULES = {
    "x": {"caption_max": 280, "media": ["image", "video"], "label": "X"},
    "instagram": {"caption_max": 2200, "media": ["image", "video", "reel"], "label": "Instagram"},
    "tiktok": {"caption_max": 2200, "media": ["video"], "label": "TikTok"},
    "youtube": {"caption_max": 5000, "media": ["video", "short"], "label": "YouTube"},
    "threads": {"caption_max": 500, "media": ["image", "video"], "label": "Threads"},
}

DEFAULT_MANIFEST = {
    "posts": [
        {
            "id": "demo-001",
            "title": "How I plan a week of content in 20 minutes",
            "body": "I batch my content every Sunday: one idea, one script, then Post Bridge sends it to X, Instagram, TikTok and YouTube while I get on with my day. The trick is writing once and letting each platform get its own caption length and cover.",
            "media_type": "video",
            "targets": ["x", "instagram", "tiktok", "youtube", "threads"],
        },
        {
            "id": "demo-002",
            "title": "New: schedule from Claude",
            "body": "Post Bridge now ships an MCP server, so Claude can schedule and publish for you. Connect once, say what to post and when, and it handles the rest.",
            "media_type": "image",
            "targets": ["x", "threads"],
        },
    ]
}


def adapt_caption(platform, text):
    """Trim text to the platform caption limit, keeping whole words."""
    limit = PLATFORM_RULES[platform]["caption_max"]
    if len(text) <= limit:
        return text
    cut = text[: limit - 1].rsplit(" ", 1)[0]
    return cut + "..."


def validate_post(post):
    """Return a list of blocking problems for one post, empty when valid."""
    errors = []
    if not post.get("id"):
        errors.append("missing id")
    if not post.get("body"):
        errors.append("missing body")
    media = post.get("media_type")
    for platform in post.get("targets", []):
        if platform not in PLATFORM_RULES:
            errors.append("unknown platform: %s" % platform)
            continue
        if media not in PLATFORM_RULES[platform]["media"]:
            errors.append(
                "%s does not accept media type %r"
                % (PLATFORM_RULES[platform]["label"], media)
            )
    if not post.get("targets"):
        errors.append("no target platforms")
    return errors


def build_queue(manifest):
    """Turn a manifest into an ordered publish plan with adapted captions."""
    plan = []
    problems = []
    for post in manifest.get("posts", []):
        errors = validate_post(post)
        if errors:
            problems.append({"id": post.get("id", "?"), "errors": errors})
            continue
        for platform in post["targets"]:
            caption = adapt_caption(platform, post["body"])
            plan.append(
                {
                    "post_id": post["id"],
                    "platform": platform,
                    "caption": caption,
                    "caption_chars": len(caption),
                    "media_type": post["media_type"],
                    "status": "queued",
                }
            )
    return {"plan": plan, "problems": problems}


def main(argv=None):
    parser = argparse.ArgumentParser(description="Post Bridge publish planner (dry run)")
    parser.add_argument("--manifest", default=None, help="JSON manifest path")
    parser.add_argument("--out", default="publish_plan.json", help="Output plan path")
    args = parser.parse_args(argv)

    if args.manifest:
        manifest = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    else:
        manifest = DEFAULT_MANIFEST

    result = build_queue(manifest)
    Path(args.out).write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print("posts in manifest: %d" % len(manifest.get("posts", [])))
    print("queued publishes: %d" % len(result["plan"]))
    print("problem posts: %d" % len(result["problems"]))
    for item in result["plan"]:
        print(
            " - [%s] %s (%d chars, %s)"
            % (item["platform"], item["post_id"], item["caption_chars"], item["media_type"])
        )
    for problem in result["problems"]:
        print(" ! %s: %s" % (problem["id"], "; ".join(problem["errors"])))
    print("plan written to %s" % args.out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

**运行实测**（本文件交付前原样抽出跑通）：

```text
$ python3 postbridge_publish.py
posts in manifest: 2
queued publishes: 7
problem posts: 0
 - [x] demo-001 (234 chars, video)
 - [instagram] demo-001 (234 chars, video)
 - [tiktok] demo-001 (234 chars, video)
 - [youtube] demo-001 (234 chars, video)
 - [threads] demo-001 (234 chars, video)
 - [x] demo-002 (146 chars, image)
 - [threads] demo-002 (146 chars, image)
plan written to publish_plan.json
```

**接线说明**：把 `PLATFORM_RULES` 换成各平台 OAuth 发帖接口的真实调用，把 `status: queued` 的条目逐条发出去即可；发帖失败必须进重试队列并给用户可见提示，绝不能静默丢帖。

---

## 🎯 模块四：行业特化型 Prompt 编排链

**1. 多平台文案适配 Prompt（给 LLM 用）**：

```text
你是一名短视频创作者的文案助手。下面是一条原始内容，请为 X、Instagram、TikTok、YouTube、Threads 各写一版适配文案：
- X：不超过 280 字符，保留核心钩子，结尾加 1 个相关话题标签；
- Instagram：可展开到 300 字以内，开头 2 行必须留住人，结尾加行动号召；
- TikTok：口语化，150 字以内，第一句就是冲突或结果；
- YouTube：标题 + 200 字以内简介，含 3 个关键词；
- Threads：不超过 500 字符，像跟朋友聊天一样写。
只输出五个版本，不要解释。原始内容：【粘贴内容】
```

**2. X 公开开发周报 Prompt**：

```text
根据以下本周数据，写一条 X 公开开发帖（280 字符以内）：MRR 变化、新增订阅数、流失数、本周上线的一个功能、一个真实踩坑。语气诚实、不吹牛，结尾问读者一个问题。数据：【粘贴数据】
```

**3. 创始价邀约私信模板**：

```text
嗨，我是 [名字]，在做一款叫 Post Bridge 的小工具：写一次内容，一键发到 X/IG/TikTok/YouTube 多个号。看你每天多平台发内容，想请你免费试用一个月，条件是告诉我 3 个最烦的地方。创始价 $19/月（正式价 $39），名额 100 个。有兴趣我发你链接？
```

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

**平台政策红线**：

- 各平台 OAuth 授权只申请发帖必需的最小权限，不要贪读私信与好友列表；授权过期要引导用户重新授权，不要用缓存 token 硬刷。
- 发帖频率遵守各平台限流：同一账号短时间内不要连发多条，队列里加随机间隔；被限流时自动降速并提示用户，不要重试轰炸。
- 素材版权：用户上传的视频/图片版权由用户负责，条款里写清楚；不要替用户从公开网络抓素材来发。

**防踩坑清单**：

- 获客不要只押 X 一个渠道：从第一天起同时经营短视频号与邮件列表，X 算法一变还有后手。
- 单人运营先补客服流程再扩功能：订阅量上来后，客服回复慢比少一个功能更伤续费。
- 定价按账号数，别按发帖量：用户最怕算不清账；用量异常（单个账号一天发 200 条）要限流并人工复核，防 API 被刷爆。
- 收入数字引用口径：MRR 与累计收入以 TrustMRR 实时数为准；订阅与注册数为创始人自述快照，引用时注明日期。

**72 小时 MVP 节拍器**：

| 时间 | 动作 | 交付物 |
| --- | --- | --- |
| 0~24h | 自己手动多平台发 3 天，记耗时与格式坑；访谈 5 个创作者 | 耗时记录 + 访谈纪要 |
| 24~48h | 跑通 `postbridge_publish.py`；接 X 与 Threads 两个平台 OAuth | 发布队列跑通 + 双平台发帖成功 |
| 48~72h | Stripe 按账号数计费上线；硬付费墙；X 发第一条公开开发帖 | 支付闭环 + 首条获客帖 |

**冷启前 10 个付费用户**：X 公开开发帖评论区里直接邀约 + 创作者社群真实分享使用截图（不发硬广）+ Product Hunt 上线当天给老用户发创始价续费邀请。
