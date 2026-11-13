---
name: "glossa-church-live-translation"
description: "专为【Glossa 式垂直场景实时翻译工具】定制的生产级商业操盘 Agent 技能包。内置 100% 契合该商业原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "AI应用与服务"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Glossa 式垂直场景实时翻译工具

> **资产级别**: MoneyLab Institutional Grade (Tier B · 70 分)
> **商业定位**: 给多语言教堂做礼拜实时翻译，按语言每小时 5 美元或 99/299/499 美元月套餐收费；打法可平移到会议、旅游团、国际学校等其他垂直口译场景。原版由 Anton K. 用 Claude Code 写成，MRR $14,404、100 个活跃订阅、累计收入 $196,539（Stripe 核验，TrustMRR；数据最后同步 2026 年 10 月 19 日，之后因密钥过期断更）。
> **原型**: C（垂直行业 AI 封装）——固定流程 + 术语库 + 按量计费。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)

你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：

- 💻 [模式 A：极速工程落地]：提供实时翻译管线的核心代码与架构脚手架（STT + 翻译 + 字幕推送）；
- 🔍 [模式 B：选品与痛点诊断]：剖析目标场景（教堂礼拜 / 会议 / 旅游团）在人工同传成本、通用翻译 App 延迟与术语上的真实差评与刚需；
- 🛡️ [模式 C：合规与安全防线]：宗教场所录音授权、STT 与翻译 API 的数据隐私、Stripe 计费合规；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对机构客户（教堂 / 会议主办方）的即用破冰成交物料（免费试一场方案）。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

### 一手信源背景

- **原版产品**：Glossa，教堂礼拜实时翻译工具；创始人 Anton K.（X @karbanovich，约 105 名粉丝，几乎零粉丝起步）；用 Claude Code 写成；2026 年 5 月 6 日发帖称收入突破 $20,000。
- **定价**：按语言每小时 $5；月套餐 $99 / $299 / $499 三档。
- **验证数据**：TrustMRR（Stripe 核验）：MRR $14,404，100 个活跃订阅，累计 $196,539；最后同步 2026 年 10 月 19 日。注意口径：30 天快照 $31,173 与逐日合计 $12,903 不一致（密钥过期后每日为 $0），以 MRR 为准。
- **证据等级**：B 级（State of Indie Hacking 复核，2026 年 11 月 7 日）。

### 真实漏斗精算（复制者稳态月度模型）

| 环节 | 数字 | 说明 |
| --- | --- | --- |
| 目标机构接触/月 | 20~30 家 | 一家一家敲门，电话 + 实地拜访 |
| 免费试用转化率 | 25%~35% | 试一场，当场让会众扫码听 |
| 试用→付费转化率 | 40%~60% | 讲道环节体验好就留得住 |
| 月新增付费机构 | 2~5 家 | 慢，但一家就是长期订阅 |
| 户均月费 | $150~$300 | 月套餐为主，散客按小时 |
| 稳态 MRR | $1,500~$6,000 | 复制者 6~12 个月目标 |
| 月流失率 | 3%~6% | 机构客户粘性强 |
| 单场 API 成本 | $2~$6 | STT + 翻译，按时长与语言数 |
| 净利润率 | 约 75%~85% | 成本随翻译 API 降价而下降 |

> **校准红线**：原版 $14,404 MRR 是教堂场景的天花板级表现，别当复制者起点；复制者先做到 10 家付费机构、MRR $1,500 再谈扩张。翻译成本在跌，定价要留降价空间。

---

## 💻 模块三：生产级极简核心工程源码

【硬性门禁】：以下为真实、可用、可直接复制运行的完整核心代码（Python 3 标准库，零依赖）。它实现实时翻译管线的后半段：把带时间戳的讲道转写片段按术语库翻译成目标语言，输出标准 SRT 字幕，并按 $5/小时/语言核算单场成本。`translate_via_api()` 是接真实翻译 API 的钩子（示例内置迷你词典演示术语替换逻辑，生产环境把词典调用换成 API 调用即可）。

```python
#!/usr/bin/env python3
"""glossa_live_captions.py - Glossa 式实时翻译管线核心（可直接运行）.

用法: python3 glossa_live_captions.py
输入一段带时间戳的讲道转写，按术语库翻译并输出 SRT 字幕 + 单场成本核算。
"""
import re

PRICE_PER_HOUR_PER_LANGUAGE = 5.0  # 美元/小时/语言（原版定价）


def srt_timestamp(seconds: float) -> str:
    """秒数转 SRT 时间戳 HH:MM:SS,mmm。"""
    hours = int(seconds // 3600)
    minutes = int(seconds % 3600 // 60)
    secs = int(seconds % 60)
    millis = int(round((seconds - int(seconds)) * 1000))
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"


# 场景术语库：礼拜场景高频词（生产环境扩到 200 条以上）。
# 键为英文原文词，值为西班牙语译法；未命中词原样保留并标记待审。
GLOSSARY_EN_ES = {
    "grace": "gracia",
    "faith": "fe",
    "sermon": "sermón",
    "prayer": "oración",
    "hymn": "himno",
    "blessing": "bendición",
    "congregation": "congregación",
    "pastor": "pastor",
    "amen": "amén",
}

# 演示用整句映射（仅演示管线；生产环境由翻译 API 返回整句译文）。
SENTENCE_MAP_EN_ES = {
    "Welcome to today's sermon.": "Bienvenidos al sermón de hoy.",
    "Let us pray together.": "Oremos juntos.",
}


def translate_via_api(text: str, target_lang: str) -> str:
    """翻译钩子：生产环境在此调用真实翻译 API（如 DeepL / Google 翻译）。

    演示实现：整句命中直接返回；否则按术语库逐词替换，未命中词原样保留。
    """
    if target_lang == "es" and text in SENTENCE_MAP_EN_ES:
        return SENTENCE_MAP_EN_ES[text]
    def _swap(match):
        word = match.group(0)
        key = word.lower()
        if target_lang == "es" and key in GLOSSARY_EN_ES:
            return GLOSSARY_EN_ES[key]
        return word
    return re.sub(r"[A-Za-z]+", _swap, text)


def build_srt(segments, target_lang: str) -> str:
    """segments: [(开始秒, 结束秒, 英文原文), ...] -> SRT 字幕全文。"""
    blocks = []
    for i, (start, end, text) in enumerate(segments, 1):
        translated = translate_via_api(text, target_lang)
        blocks.append(
            f"{i}\n{srt_timestamp(start)} --> {srt_timestamp(end)}\n{translated}"
        )
    return "\n\n".join(blocks) + "\n"


def session_cost(duration_minutes: float, languages: int) -> float:
    """单场成本：按语言按小时计费。"""
    return round(duration_minutes / 60 * PRICE_PER_HOUR_PER_LANGUAGE * languages, 2)


SAMPLE_SERMON = [
    (0.0, 4.5, "Welcome to today's sermon."),
    (5.0, 9.0, "Let us pray together."),
    (10.0, 16.0, "Today we speak of grace and faith."),
]


def main() -> None:
    srt = build_srt(SAMPLE_SERMON, "es")
    print("--- SRT 字幕（英 -> 西班牙语）---")
    print(srt)
    cost = session_cost(75, 2)
    print(f"单场成本：75 分钟 x 2 种语言 x $5/小时 = ${cost}")
    assert "Bienvenidos al sermón de hoy." in srt, "整句翻译必须命中"
    assert "gracia" in srt and "fe" in srt, "术语库替换必须生效"
    assert srt_timestamp(3661.5) == "01:01:01,500", "SRT 时间戳格式必须正确"
    assert cost == 12.5, "单场成本核算必须正确"
    print("OK: 实时翻译管线跑通")


if __name__ == "__main__":
    main()
```

**架构说明（完整管线，不含未验证代码）**：现场收音 → STT API 转文字（流式）→ 本脚本的术语库 + 翻译 API → WebSocket 把译文推到听众手机（字幕或语音二选一）；延迟目标 3 秒内。先跑通上面这个翻译与字幕核心，再接 STT 与推送。

---

## 🎯 模块四：行业特化型 Prompt 编排链

### 场景术语库生成 Prompt（每切一个新场景跑一遍）

```text
你是一名资深同声传译。请为【国际学校家长会】场景生成 200 条中英对照术语库，
覆盖：开场致辞、成绩汇报、升学规划、家校沟通、校园安全 5 个环节。
要求：每条给英文原文、中文译法、一句使用示例；只收该场景高频词，别收通用词；
输出 Markdown 表格。术语库将直接喂给实时翻译管线，错译会当场丢人，所以宁缺毋滥。
```

### 机构破冰信模板（教堂 / 会议主办方二选一）

```text
主题：免费为贵堂下一场礼拜提供多语言实时翻译（试一场，不收费）

您好，我是 [姓名]，在做一款礼拜实时翻译工具：会众多语言听不懂讲道时，
扫码就能在手机上看到实时译文。我们想免费为贵堂下一场礼拜提供一次服务，
全程我到场兜底，不用贵堂做任何准备。如果会众觉得有用，我们再谈后续；
如果没用，就当一次免费体验。方便约 10 分钟电话聊聊吗？
```

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

### 合规红线

1. **录音授权**：礼拜与会议现场录音必须事先拿到机构书面同意，并在现场公示“本场提供实时翻译，会录音转文字”；译文不做录音存档之外的用途。
2. **数据隐私**：STT 与翻译 API 的调用要选支持“不留存训练数据”的档位；听众手机号只用于当场推送，不建库、不群发。
3. **计费诚实**：按小时计费要以系统记录的实际翻译时长为准，别按整场时长多算；月套餐档位与包含场次写进合同。
4. **证据诚实**：对外引用原版收入时必须注明“数据截至 2026 年 10 月 19 日，之后断更”，别把旧快照当今天的数。

### 冷启闭环（前 30 天）

1. 第 1~7 天：翻译与字幕核心跑通 + 200 条教堂术语库；自己录一段讲道音频走完全程，延迟实测低于 3 秒。
2. 第 8~14 天：联系 10 家本地多语言教堂/机构，约到 3 家免费试用，实地跟场测满 3 场，收集会众反馈。
3. 第 15~21 天：按试用反馈修术语库与延迟；把 3 家试用转成 1~2 家付费（月套餐 $99 档起）。
4. 第 22~30 天：启动第二场景术语库（会议或旅游团二选一）；目标 3~5 家种子机构，MRR 突破 $500。

> **一句话复盘**：Glossa 赢在“一个场景抠到底”——固定流程让术语库与延迟都做得比通用翻译好。复制者别贪多，先把一个场景的 3 场实地跟场测扎实。
