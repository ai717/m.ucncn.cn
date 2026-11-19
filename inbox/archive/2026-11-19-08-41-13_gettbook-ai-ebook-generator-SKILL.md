---
name: "gettbook-ai-ebook-generator"
description: "专为【gettbook.ai 式 AI 电子书生成器】定制的生产级商业操盘 Agent 技能包。内置 100% 契合该商业原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: gettbook.ai 式 AI 电子书生成器

> **资产级别**: MoneyLab Institutional Grade (Tier C · 60 分，压线入选，值得观察)
> **商业定位**: 输入一个想法，AI 自动完成选题调研、大纲生成、正文写作、排版设计、导出成品电子书的全流程；订阅制 29 美元/月起，叠加按量额度包与教程加购；增长全靠大量测试 Meta 广告创意与漏斗优化。原版创始人自述：4 个月收入超 13 万美元、1,700 多名付费客户、约 5,000 注册用户（C级证据，未见 TrustMRR/Stripe 直连核验）。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)

你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：

- 💻 [模式 A：极速工程落地]：提供电子书生成管线核心代码（本包 `ebook_builder.py` 可直接跑通大纲生成与样章导出）；
- 🔍 [模式 B：选品与痛点诊断]：剖析想出书的人卡在哪一步，以及通用 AI 写作工具"只给段落、不给成品"的缺口；
- 🛡️ [模式 C：合规与安全防线]：AI 生成内容同质化、版权与人工审校、广告账户风险；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对营销人与小生意主的即用破冰成交物料（Meta 广告创意测试表 + 免费样章引流帖）。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

**一手信源**：Yedapo 摘要页（Starter Story 2026 年 11 月访谈）逐项核对一致。创始人 Bogdan 自述：4 个月收入超 13 万美元、1,700 多名付费客户、约 5,000 名注册用户、每月 Meta 广告投入 2~3 万美元、利润率 40~50%。增长引擎是大量测试 Meta 广告创意与漏斗优化；额度包与教程加购抬客单；Vibe coding（Lovable + Claude Code）出 MVP，但代码乱到重构过一次。

**⚠️ 证据等级提醒**：全部收入数字均为创始人自述，未见 TrustMRR/Stripe 直连核验标识，按自述口径评分，引用时必须注明"创始人自述"，不得当审计数用。

**复制者稳态漏斗精算**（按每月 100 个新增付费客户测算）：

| 环节 | 数字 | 说明 |
| --- | --- | --- |
| 月订阅收入 | $2,900 | 100 人 × $29/月（首月口径） |
| 额度包与教程加购 | +$600 | 约 20% 客户加购，客单约 $30 |
| 广告支出 | -$1,800 | 小步快测口径，约为原版的 1/10 |
| API 与服务器成本 | -$250 | 模型调用 + 存储导出 |
| 支付手续费（约 3%） | -$105 | Stripe |
| 月毛利 | 约 $1,345 | 须把广告费占比压在 60% 以下 |
| 稳态月净利 | $1,500 ~ $4,000 | 规模上来、漏斗跑顺后的保守口径 |

**注意**：原版每月 2~3 万美元广告费换 40~50% 毛利，净利很薄；复制者切忌一上来就大额投放，先用 500 美元测出正向 ROI 的创意再放大。

---

## 💻 模块三：生产级极简核心工程源码

以下为真实可运行代码（仅用 Python 标准库），已从本文件原样抽出实测通过：`python3 ebook_builder.py` 生成大纲 6 章、样章 2 章，导出 `gettbook-demo-ebook.md`（532 词）。

```python
#!/usr/bin/env python3
"""gettbook.ai core engine: topic brief -> outline -> sample chapters -> Markdown export.

Usage:
    python3 ebook_builder.py [--topic TOPIC] [--audience AUDIENCE] [--out FILE]
With no arguments it runs on the built-in demo brief and prints the result.
Only the Python standard library is used.
"""

import argparse
import sys
from pathlib import Path

DEMO_BRIEF = {
    "topic": "How solopreneurs turn client work into a sellable ebook",
    "audience": "marketers and small business owners with expertise to share",
    "chapters": 6,
    "words_per_chapter": 300,
    "key_points": [
        "Pick one painful problem your clients already pay to solve",
        "Outline before writing: one promise per chapter",
        "Write in the reader's words, not in jargon",
        "End every chapter with a checklist the reader can do today",
        "Price the book by the outcome it delivers, not by page count",
        "Launch with a sample chapter and a pre-order page first",
    ],
}

CHAPTER_TITLES = [
    "Start With the Problem, Not the Book",
    "Outline First: One Promise per Chapter",
    "Write Like You Talk to One Reader",
    "Checklists Beat Chapters",
    "Price the Outcome, Not the Pages",
    "Launch Small: Sample Chapter, Then Pre-orders",
]


def build_outline(brief):
    """Build a chapter outline from the brief; one key point per chapter."""
    chapters = []
    for i, title in enumerate(CHAPTER_TITLES[: brief["chapters"]]):
        chapters.append(
            {
                "number": i + 1,
                "title": title,
                "key_point": brief["key_points"][i % len(brief["key_points"])],
                "target_words": brief["words_per_chapter"],
            }
        )
    return chapters


def draft_chapter(chapter, brief):
    """Draft one chapter as Markdown from the outline (skeleton + prompts)."""
    lines = [
        "## Chapter %d: %s" % (chapter["number"], chapter["title"]),
        "",
        "Audience: %s." % brief["audience"],
        "Key point: %s." % chapter["key_point"],
        "",
        "### What this chapter delivers",
        "",
        "This chapter shows the reader how to apply one idea: %s "
        "Lower the barrier to the first win, then build on it." % chapter["key_point"].lower(),
        "",
        "### Steps",
        "",
        "1. Name the reader's exact situation in one sentence.",
        "2. Show the smallest working version of the idea.",
        "3. Give one worked example from real client work.",
        "4. End with a checklist the reader can finish today.",
        "",
        "### Checklist",
        "",
        "- [ ] I can state the chapter's promise in one sentence.",
        "- [ ] I have one real example to include.",
        "- [ ] I know what the reader should do next.",
        "",
        "### LLM writing prompt for this chapter",
        "",
        "> Write %d words for a practical how-to ebook chapter titled "
        "'%s', for %s. Key point: %s. Tone: direct, plain, no jargon. "
        "Include one worked example and a closing checklist."
        % (
            chapter["target_words"],
            chapter["title"],
            brief["audience"],
            chapter["key_point"],
        ),
        "",
    ]
    return "\n".join(lines)


def build_ebook(brief, sample_chapters=2):
    """Return the full Markdown text for the outline plus sample chapters."""
    chapters = build_outline(brief)
    lines = [
        "# %s" % brief["topic"],
        "",
        "Audience: %s." % brief["audience"],
        "",
        "## Outline",
        "",
    ]
    for chapter in chapters:
        lines.append(
            "%d. %s (%d words) - %s"
            % (
                chapter["number"],
                chapter["title"],
                chapter["target_words"],
                chapter["key_point"],
            )
        )
    lines.append("")
    for chapter in chapters[:sample_chapters]:
        lines.append(draft_chapter(chapter, brief))
    return "\n".join(lines), chapters


def main(argv=None):
    parser = argparse.ArgumentParser(description="gettbook.ai ebook builder (demo)")
    parser.add_argument("--topic", default=DEMO_BRIEF["topic"])
    parser.add_argument("--audience", default=DEMO_BRIEF["audience"])
    parser.add_argument("--out", default="gettbook-demo-ebook.md")
    args = parser.parse_args(argv)

    brief = dict(DEMO_BRIEF)
    brief["topic"] = args.topic
    brief["audience"] = args.audience
    text, chapters = build_ebook(brief)
    Path(args.out).write_text(text, encoding="utf-8")
    print("topic: %s" % brief["topic"])
    print("chapters in outline: %d" % len(chapters))
    print("sample chapters drafted: 2")
    print("words exported: %d" % len(text.split()))
    print("ebook written to %s" % args.out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

**运行实测**（本文件交付前原样抽出跑通）：

```text
$ python3 ebook_builder.py
topic: How solopreneurs turn client work into a sellable ebook
chapters in outline: 6
sample chapters drafted: 2
words exported: 532
ebook written to gettbook-demo-ebook.md
```

**接线说明**：把每章的 "LLM writing prompt" 喂给模型写正文，人工审校后再拼成全书；`build_outline` 的大纲结构可直接对接 Stripe 订阅（按本导出）与额度包（按章计费）。

---

## 🎯 模块四：行业特化型 Prompt 编排链

**1. 选题调研 Prompt（给 LLM 用）**：

```text
我想写一本面向【目标读者】的实操电子书，主题是【主题】。请做三件事：
1. 列出这个读者群最常付费解决的 5 个具体问题（按付费意愿排序）；
2. 每个问题写一句话，说明读者现在是怎么解决的、哪里最费时间；
3. 推荐一个最值得先写的切口，并说明为什么它最容易卖。
不要写空话，每个问题都要具体到场景。
```

**2. 逐章写作 Prompt**：

```text
请为一本实操电子书写真章：第【N】章，标题【标题】，核心观点【观点】，目标读者【读者】。
要求：300~500 字，直接说人话，不用术语；开头一句话点出读者痛点；中间给一个真实工作场景的例子；结尾给 3 条今天就能做的清单。不要写正确的废话。
```

**3. Meta 广告创意测试表（每周填一次）**：

```text
本周测试创意：【创意A/B/C 各一句话】
每条创意：花费、点击、注册、试用、付费、获客成本
结论：放大哪条、砍掉哪条、下周新测什么
红线：获客成本超过客单价 1/3 的创意立刻停，不要恋战。
```

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

**平台与内容红线**：

- AI 生成的书必须人工审校再交付：事实错误、过时信息与同质化套话是差评重灾区，审校清单要写进流程。
- 广告账户是命脉：Meta 账户被封增长立刻断档，须留 YouTube/社群自然流量后手；广告素材每周换一批，防创意疲劳。
- 版权：不要让模型照搬他人书籍内容出书；引用案例要改写并注明来源；用户自己提供的素材版权由用户负责。

**防踩坑清单**：

- 收入数字引用口径：4 个月超 13 万美元、1,700 多付费客户均为创始人自述，未见第三方核验，写进任何材料都要注明。
- 广告费占比红线：广告支出一旦超过收入的 60%，立刻收紧，先堵漏斗再放量。
- Vibe coding 教训：MVP 阶段就要写测试与文档，别等代码乱到看不懂才重构；创始人自己就重构过一次。
- 护城河不在代码在漏斗：同类产品几天就能抄一个，真正的壁垒是广告素材库与漏斗的持续迭代。

**72 小时 MVP 节拍器**：

| 时间 | 动作 | 交付物 |
| --- | --- | --- |
| 0~24h | 访谈 5 个想出书的人；跑通 `ebook_builder.py` 出一本样书 | 访谈纪要 + 样书 Markdown |
| 24~48h | 接 LLM 写正文；人工审校；导出 PDF/EPUB | 一本可卖的成品电子书 |
| 48~72h | Stripe 订阅 + 额度包上线；500 美元测 10 条广告创意 | 支付闭环 + 首批广告数据 |

**冷启前 10 个付费用户**：免费样章换邮箱 + 样章读者里直接邀约首批订阅 + 营销人社群真实分享"写书前后对比"（不发硬广）+ 预售页先收订单再扩大投放。
