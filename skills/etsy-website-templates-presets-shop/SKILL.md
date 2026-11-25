---
name: "etsy-website-templates-presets-shop"
description: "专为【Etsy 网站模板与预设包数字下载店】定制的生产级商业操盘 Agent 技能包。内置 100% 契合该商业原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "跨境与电商"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Etsy 网站模板与预设包数字下载店

> **资产级别**: MoneyLab Institutional Grade (Tier C, 60 分)
> **商业定位**: 给时尚、美妆、健康类小商家卖现成网站模板（60-160 美元）与 Lightroom 预设包（14 美元），Etsy 数字下载自动交付；复制者新店冷启动务实月现金流 500-1,500 美元。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供该项目核心代码或架构脚手架；
- 🔍 [模式 B：选品与痛点诊断]：剖析该细分领域 2~3 星真实差评与刚需；
- 🛡️ [模式 C：合规与安全防线]：平台规则、接口风控与防封免拒声明；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对目标客户的即用破冰成交物料。

问诊先问三件事：你选哪个商家品类（美妆/婚礼/瑜伽/时尚）、你会不会 Figma 与基础 Liquid/HTML、你每月能稳定上几个新模板。第三个问题答不上来就先别开店——对标店 2026 年只上 3 个新品，收入就从 2022 年的 6.26 万英镑跌到 2026 年前十个月的 1.24 万英镑。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

一手信源：Microns 挂牌页（2026-11-20 发布，已售出，B 级证据，挂牌方自述 + 截图供买家核对）。对标店 2022 年开店，89 个模板（43 个 Shopify 主题、19 个 Wix 模板、18 个 Squarespace 模板、8 个 Lightroom 预设包、1 个 Instagram 模板包），5,815 个订单，累计收入约 29.7 万美元（约 22 万英镑），近 12 个月约 1.55 万英镑（约 2.08 万美元），挂牌价 9,700 美元。定价：网站模板 60-160 美元、预设包 14 美元。日常维护每天不到 5 分钟，全部销售来自 Etsy 搜索与 Etsy Ads。逐年收入（英镑）：2022 年 62,615、2023 年 56,979、2024 年 50,541、2025 年 37,948、2026 年 1-10 月 12,395。Etsy 店铺账号不随售转让，买家须新店冷启动。

| 项目 | 数字 | 口径 |
|---|---|---|
| 模板客单价 | $60~$160 | 对标店挂牌价 |
| 预设包客单价 | $14 | 对标店挂牌价 |
| 对标店累计订单 | 5,815 单 | 2022 年至今 |
| 对标店近 12 个月收入 | 约 $20,800 | 成熟店流水，非复制者预期 |
| 复制者稳态目标 | $500~$1,500/月 | 新店冷启动，单品类目录口径 |
| 边际成本 | 约为零 | 数字下载，成本只有 Etsy 费与广告 |
| 维护节奏 | 每月上新 2~3 个 | 停更即下滑，见逐年收入 |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构

上架前检查脚本：校验 Etsy 标题长度、13 个标签（每个不超过 55 字符）、标签重复，并按费率假设算到手价。费率是可调参数，发布前按 Etsy 当期费率表核对后改参数再跑。

```python
"""Etsy template listing checker: title, tags, and net payout estimate."""

ETSY_RULES = {
    "title_max_chars": 140,
    "max_tags": 13,
    "tag_max_chars": 55,
}

# Fee assumptions in USD. Re-check against Etsy's current fee table before use.
FEES = {
    "listing_fee": 0.20,          # per listing, renews every 4 months or on sale
    "transaction_rate": 0.065,    # 6.5% of item price + shipping charged
    "payment_rate": 0.03,         # payment processing percentage (varies by country)
    "payment_fixed": 0.25,        # payment processing fixed fee
}


def check_listing(title, tags, price_usd):
    problems = []
    if not title.strip():
        problems.append("title is empty")
    if len(title) > ETSY_RULES["title_max_chars"]:
        problems.append(f"title is {len(title)} chars, max {ETSY_RULES['title_max_chars']}")
    if len(tags) > ETSY_RULES["max_tags"]:
        problems.append(f"{len(tags)} tags, max {ETSY_RULES['max_tags']}")
    seen = set()
    for tag in tags:
        t = tag.strip().lower()
        if len(tag) > ETSY_RULES["tag_max_chars"]:
            problems.append(f"tag over {ETSY_RULES['tag_max_chars']} chars: {tag!r}")
        if t in seen:
            problems.append(f"duplicate tag: {tag!r}")
        seen.add(t)
    if price_usd <= 0:
        problems.append("price must be positive")
    return problems


def net_payout(price_usd, fees=FEES):
    """Net amount for one digital-download sale (no shipping charged)."""
    total_fees = (
        fees["listing_fee"]
        + price_usd * fees["transaction_rate"]
        + price_usd * fees["payment_rate"]
        + fees["payment_fixed"]
    )
    return round(price_usd - total_fees, 2)


def monthly_estimate(units_per_month, price_usd, fees=FEES):
    return round(units_per_month * net_payout(price_usd, fees), 2)


if __name__ == "__main__":
    title = "Beauty Salon Shopify Theme - Skincare Website Template, Wix and Squarespace Ready"
    tags = [
        "beauty salon website", "skincare shopify theme", "spa website template",
        "wix beauty template", "squarespace salon", "esthetician website",
        "med spa template", "skincare ecommerce", "beauty business site",
        "salon booking website", "cosmetics shop theme", "wellness website",
        "makeup artist site",
    ]
    problems = check_listing(title, tags, 99.0)
    print("problems:", problems)
    print("net payout at $99:", net_payout(99.0))
    print("net payout at $14 preset pack:", net_payout(14.0))
    print("monthly estimate, 12 template sales at $99:", monthly_estimate(12, 99.0))
    bad = check_listing("x" * 200, tags + ["extra tag"], 99.0)
    print("bad listing problems:", bad)
```

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录

模板选题 Prompt（把品类换成你的）：

```text
你是 Etsy 数字下载店的选品分析师。品类：美妆护肤小商家。
任务：给我 5 个网站模板选题，每个选题包含：
1) 目标商家一句话画像（谁在开店、卖什么、客单价多少）；
2) 这个商家现在的网站最痛的 3 个问题（从同类模板的差评逻辑推导，不要编造具体店铺数据）；
3) 模板必须包含的 5 个页面区块；
4) Etsy 长尾搜索词 13 个，每个不超过 55 个字符；
5) 建议定价（60-160 美元区间内）与定价理由。
约束：不要推荐通用万能主题；每个选题必须能在一个品类里做出视觉差异。
```

商品页文案结构（每个模板固定四段）：第一段一句话说清给谁、解决什么；第二段列包含内容（主题文件、安装指南、预览素材）；第三段写安装步骤与预计耗时；第四段写清授权范围（单店使用、不可转售模板本身）与售后范围（安装答疑，不含定制开发）。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

- 素材合规：预览图、字体、图标只用自有或明确可商用的，侵权投诉是数字下载店最常见的下架与封店原因；每个模板留一份素材来源清单。
- 平台规范：Shopify 主题按 Online Store 2.0 现行规范交付，平台改版后及时更新已售主题的兼容版本，差评多半来自装不上。
- 账号预期：Etsy 店铺评价与搜索排名不可转让，新店前几个月可能零单；先上 5~8 个模板验证品类，有自然单再扩到 20 个以上。
- 上新节奏：每月至少 2~3 个新模板或变体并复盘搜索词数据；对标店停更后收入连跌四年，这是本模式最大的运营风险。
- 冷启通道：Etsy 搜索长尾词为主，Pinterest 发模板预览图、自有网站挂目录、Creative Market 等模板市场同步上架；前 10 单靠品类社群里真诚分享建站前后对比，不刷单、不买评价。
