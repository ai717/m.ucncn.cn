---
name: "underpriced-ai-reseller-scanner"
description: "专为【Underpriced AI 式二手转卖拍照估价工具】定制的生产级商业操盘 Agent 技能包。内置 100% 契合该商业原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Underpriced AI 式二手转卖拍照估价工具

> **资产级别**: MoneyLab Institutional Grade (Tier B · 70 分)
> **商业定位**: 拍张照片，AI 认出商品并拉取 eBay 真实成交价，扣掉平台手续费和运费后告诉你净赚多少、买还是不买；$9.99/月起订阅。原版由 Frank Kratzer solo 6 个月做出来，Indie Hackers 显示 Stripe 核验月入 $5,156（2026 年 10 月 29 日），11 月 7 日复核为 $5,236.94/30 天；已上架网页、iOS、安卓与 Chrome/Firefox 插件。
> **原型**: B（客户端实用工具）——拍照识别 + 成交价锚 + 净利润计算器。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)

你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：

- 💻 [模式 A：极速工程落地]：提供拍照估价工具的核心代码与架构脚手架（视觉识别 + eBay 成交价 + 净利润计算）；
- 🔍 [模式 B：选品与痛点诊断]：剖析转卖卖家在旧货店现场决策、eBay 手续费测算、假货识别上的 2~3 星真实差评与刚需；
- 🛡️ [模式 C：合规与安全防线]：eBay Finding 官方 API 限流、估值免责声明、应用商店审核规则；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对转卖卖家的即用破冰成交物料（捡漏案例帖模板）。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

### 一手信源背景

- **原版产品**：Underpriced.app（underpricedai.com / underpriced.app），创始人 Frank Kratzer；视觉模型用 Google Gemini Flash，成交价走 eBay Finding 官方 API；功能包括 Deal Score（0~100）、净利润测算、Flip Tracker 库存管理、eBay 上架与 SEO 标题生成。
- **定价**：免费 5 次；Reseller $9.99/月（75 次）、Pro $14.99/月（200 次）、Ultra $24.99/月（500 次），首月半价。（注意：创始人 2026 年 1 月帖是 $5.99/$9.99/$17.99，2026 年 10 月 Product Hunt 更新为现价，以最新为准。）
- **验证数据**：Indie Hackers 产品页 Stripe 核验 $5,156/月（2026 年 10 月 29 日）；State of Indie Hacking 11 月 7 日复核 $5,236.94/30 天。
- **获客**：转卖社区案例帖、Product Hunt 上线、40+ 个免费小工具（手续费计算器、运费估算、ROI 计算器）拿搜索流量。

### 真实漏斗精算（复制者稳态月度模型）

| 环节 | 数字 | 说明 |
| --- | --- | --- |
| 月访问（免费工具矩阵） | 10,000~20,000 | 手续费计算器等长尾词引流 |
| 免费扫描注册转化率 | 10%~15% | 5 次免费额度是钩子 |
| 免费→付费转化率 | 3%~5% | 一次“捡漏”体验后才转化 |
| 月新增付费订阅 | 30~75 | 冷启动期取低值 |
| 户均月费 | $12 | 三档混合 |
| 稳态 MRR | $1,000~$4,000 | 复制者 6~12 个月目标 |
| 月流失率 | 8%~12% | 淡季卖家不用就退订 |
| 单次扫描 API 成本 | $0.01~$0.03 | Gemini Flash 视觉调用 |
| 净利润率 | 约 80%~88% | 成本主要是获客与 API |

> **校准红线**：单价低、要靠量：500 个订阅才 $5,000/月。复制者前 3 个月 MRR 能到 $300~$800 已是合格线；获客成本必须压住，别烧广告。

---

## 💻 模块三：生产级极简核心工程源码

【硬性门禁】：以下为真实、可用、可直接复制运行的完整核心代码（Python 3 标准库，零依赖）。它实现估价工具的心脏：按各平台费率表扣费、算净利润与 ROI、给 0~100 分 Deal Score 与买/不买结论。`identify_item()` 是接视觉模型的钩子（演示返回固定识别结果，生产环境换成 Gemini Flash 等视觉 API 调用）。

```python
#!/usr/bin/env python3
"""flip_profit.py - Underpriced AI 式转卖净利润计算器（可直接运行）.

用法: python3 flip_profit.py
对三件示例商品算净利润、ROI 与 Deal Score，给出买 / 不买结论。
平台费率以 2026 年公开费率为准，运费按卖家自填。
"""
from dataclasses import dataclass

# 平台费率表：费率 + 每单固定费（美元）。eBay 13.25% + $0.30，Poshmark 20%，Mercari 约 12.9%。
PLATFORM_FEES = {
    "ebay": {"rate": 0.1325, "fixed": 0.30, "label": "eBay"},
    "poshmark": {"rate": 0.20, "fixed": 0.0, "label": "Poshmark"},
    "mercari": {"rate": 0.129, "fixed": 0.0, "label": "Mercari"},
    "facebook": {"rate": 0.0, "fixed": 0.0, "label": "Facebook Marketplace（本地自提）"},
}


@dataclass
class FlipItem:
    name: str
    buy_price: float       # 收货价（美元）
    sold_price: float      # eBay 成交价中位数（美元）
    shipping_cost: float   # 运费（美元）
    platform: str          # ebay / poshmark / mercari / facebook
    demand: str            # high / medium / low


def identify_item(photo_path: str) -> dict:
    """视觉识别钩子：生产环境在此调用视觉模型 API（如 Gemini Flash）。

    演示实现：按文件名返回固定识别结果，仅演示管线。
    """
    demo_db = {
        "camera.jpg": {"brand": "Canon", "model": "AE-1 35mm", "category": "复古相机"},
        "jacket.jpg": {"brand": "Pendleton", "model": "Board Shirt", "category": "复古服饰"},
    }
    return demo_db.get(photo_path, {"brand": "未知", "model": "未知", "category": "未识别"})


def net_profit(item: FlipItem) -> dict:
    """算净利润、ROI 与 Deal Score（0-100），给买/不买结论。"""
    fee = PLATFORM_FEES[item.platform]
    platform_fee = round(item.sold_price * fee["rate"] + fee["fixed"], 2)
    profit = round(item.sold_price - item.buy_price - platform_fee - item.shipping_cost, 2)
    roi = round(profit / item.buy_price * 100, 1) if item.buy_price > 0 else 0.0
    demand_bonus = {"high": 15, "medium": 8, "low": 0}[item.demand]
    score = max(0, min(100, int(roi / 2) + demand_bonus))
    if score >= 80:
        verdict = "HOT DEAL：拿下"
    elif score >= 55:
        verdict = "GOOD DEAL：值得买"
    elif score >= 35:
        verdict = "FAIR：可买可不买"
    else:
        verdict = "PASS：别买"
    return {
        "platform": fee["label"],
        "platform_fee": platform_fee,
        "profit": profit,
        "roi_pct": roi,
        "deal_score": score,
        "verdict": verdict,
    }


SAMPLE_ITEMS = [
    FlipItem("Canon AE-1 复古相机", 15.0, 120.0, 12.0, "ebay", "high"),
    FlipItem("Pendleton 复古衬衫", 8.0, 45.0, 7.0, "poshmark", "medium"),
    FlipItem("普通马克杯", 5.0, 9.0, 6.0, "ebay", "low"),
]


def main() -> None:
    print("--- 转卖净利润测算 ---")
    for item in SAMPLE_ITEMS:
        r = net_profit(item)
        print(f"{item.name}｜收货 ${item.buy_price}｜成交 ${item.sold_price}｜"
              f"{r['platform']}手续费 ${r['platform_fee']}｜净赚 ${r['profit']}｜"
              f"ROI {r['roi_pct']}%｜Deal Score {r['deal_score']}｜{r['verdict']}")
    print("--- 视觉识别演示 ---")
    print("camera.jpg ->", identify_item("camera.jpg"))
    # 断言：核心算术必须正确
    r0 = net_profit(SAMPLE_ITEMS[0])
    assert r0["platform_fee"] == 16.2, "eBay 手续费 120*13.25%+0.30 必须等于 16.20"
    assert r0["profit"] == 76.8, "净利润 120-15-16.20-12 必须等于 76.80"
    assert r0["verdict"].startswith("HOT DEAL"), "76.8 美元净利润必须是 HOT DEAL"
    r2 = net_profit(SAMPLE_ITEMS[2])
    assert r2["verdict"].startswith("PASS"), "亏钱的货必须是 PASS"
    print("OK: 净利润计算器跑通")


if __name__ == "__main__":
    main()
```

**架构说明（完整产品，不含未验证代码）**：手机拍照 → 视觉模型识别品牌型号成色 → eBay Finding 官方 API 拉真实成交价（多平台成交价做交叉验证）→ 本脚本的净利润计算器 → Deal Score 与买/不买结论 + Flip Tracker 库存管理。先跑通上面这个计算器，再接视觉模型与 eBay API。

---

## 🎯 模块四：行业特化型 Prompt 编排链

### 捡漏案例帖 Prompt（每周发 2~3 篇到转卖社区）

```text
你是一名二手转卖卖家。请根据以下真实交易记录，写一篇 200 字以内的社区案例帖：
- 商品：Canon AE-1 复古相机，旧货店 $15 收
- 测算：eBay 成交价中位数 $120，扣 eBay 手续费 $16.20、运费 $12，净赚 $76.80，Deal Score 92
- 要求：只写真实数字与过程（怎么认出型号、怎么查成交价），不写“稳赚”“必捡漏”；
  结尾给一个可复现的方法（拍照 -> 查成交价 -> 算净利润）；语气像卖家手记，不像广告。
```

### 品类专家 Prompt（给视觉模型做品类特化）

```text
你是复古相机鉴定助手。用户上传一张相机照片，请按以下格式输出：
1. 品牌与型号（置信度 %）；2. 成色判断（外观、快门、漏光三项）；
3. 常见翻车点（如 AE-1 的快门 squeak 通病）；4. eBay 成交价区间（低/中/高）。
如果置信度低于 70%，直接说“认不准，别凭这个下单”，不要硬猜。
```

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

### 合规红线

1. **估值免责**：页面必须写清“AI 估值是估计，不是鉴定；成色与真伪请自行核验”，绝不承诺“保真/保价”，否则纠纷缠身。
2. **官方 API**：eBay Finding API 是官方接口但有限流，别用爬虫绕，封号就全完；多平台成交价只接官方或授权数据源。
3. **免费额度**：免费 5 次被薅就收紧，别心软；高级功能（Fake Check、Negotiator）走额外 token 计费，别让重度用户薅垮 API 成本。
4. **应用商店**：iOS / 安卓上架时订阅说明与退款政策按商店规则写，别玩文字游戏。

### 冷启闭环（前 30 天）

1. 第 1~7 天：净利润计算器跑通 + 网页版 MVP（拍照上传 -> 识别 -> 成交价 -> 结论），找 5 个转卖卖家内测，识别准确率实测。
2. 第 8~14 天：上线 10 个免费小工具（手续费计算器、运费估算、ROI 计算器），拿搜索流量；发 3 篇捡漏案例帖到 r/Flipping 与 Facebook 转卖群。
3. 第 15~21 天：上 Product Hunt；免费额度从 10 次收紧到 5 次，观察转化率变化。
4. 第 22~30 天：包 iOS / 安卓 App 提审；目标 100 个注册用户、10 个付费订阅，盯住“一次扫描帮用户赚回订阅费”的口碑点。

> **一句话复盘**：转卖卖家不为“估价”付钱，为“30 秒内不买错”付钱。复制者真正的护城河是成交价数据的真实度与现场 30 秒的决策体验，不是模型多聪明。
