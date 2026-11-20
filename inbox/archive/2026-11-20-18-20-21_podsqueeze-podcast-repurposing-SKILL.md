---
name: "podsqueeze-podcast-repurposing"
description: "专为定制的生产级商业操盘 Agent 技能包。内置转写后多产出流水线源码、分钟计费结构与单一形态冷启物料。"
version: "2.0.0"
category: "AI应用与服务"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Podsqueeze 式播客 AI 再利用

> **资产级别**: MoneyLab Institutional Grade (Tier C)
> **商业定位**: 单一节目形态的播客物料流水线，按分钟订阅，复制者稳态目标 $1,000-$3,000/月。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供转写后生成流水线源码；
- 🔍 [模式 B：选品与痛点诊断]：剖析播客主后期痛点与付费排序；
- 🛡️ [模式 C：合规与安全防线]：平台原生功能挤压下的差异化防线；
- 📈 [模式 D：商业转化与冷启动]：提供免费转付费的第二期触发物料。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- 原版证据：创始人 2026-08 自述月入约 €16,000、两年持平，C 级证据；定价官网可查：Starter $8.99/月 120 分钟、Pro $49/月 320 分钟、机构档 $89-$259/月。转写加生成成本约 $2.50/100 分钟，毛利率 80% 以上。
- 复制者漏斗精算：免费档 30 分钟试用 200 人 → 第二期转化 20% = 40 订阅 × $20 均价 ≈ $800/月起步；机构档 5 家 × $89 ≈ $445/月补充。

| 环节 | 转化率 | 人数/金额 |
|:--- |:--- |:--- |
| 免费试用 | - | 200 人 |
| 第二期转付费 | 20% | 40 订阅 ≈ $800/月 |
| 机构档 | - | 5 家 ≈ $445/月 |
| 接口成本 | $2.50/100 分钟 | 毛利率 80%+ |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构
流水线：音频 → Whisper 转写（带时间戳分段）→ 同一文字稿生成笔记/标题/帖子。以下为可直接运行的离线演示版（无 Key 时用示例分段跑通生成逻辑，生产环境把 transcribe 换成 Whisper 接口调用）：

```python

import json, re

def transcribe_demo() -> list:
    return [
        {"start": 0, "text": "Welcome back to the show. Today we talk about growing a newsletter."},
        {"start": 65, "text": "The key lesson was consistency: publish every week for eight months."},
        {"start": 140, "text": "Then the paid tier converted six weeks later with 67 subscribers."},
    ]

def mmss(sec: int) -> str:
    return f"{sec // 60:02d}:{sec % 60:02d}"

def build_pack(segments: list, show: str) -> dict:
    transcript = " ".join(s["text"] for s in segments)
    timestamps = [f"{mmss(s['start'])} {s['text'][:48]}..." for s in segments]
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", transcript) if s.strip()]
    notes = sentences[:3]
    titles = [f"{show}: {notes[0][:40]}", f"What {show} learned about consistency"]
    posts = [f"New episode: {notes[0]}", f"Key takeaway: {notes[-1]}"]
    return {"transcript": transcript, "timestamps": timestamps,
            "show_notes": notes, "titles": titles, "social_posts": posts}

if __name__ == "__main__":
    pack = build_pack(transcribe_demo(), "Demo Show")
    print(json.dumps(pack, ensure_ascii=False, indent=2))
    assert pack["timestamps"] and pack["titles"]
    print("pack ok, minutes billed:", 3)
```

生产接法：用 Whisper 接口拿分段文字稿（按分钟记账扣额度），再用大模型按节目形态模板生成笔记与帖子；切片用 FFmpeg 按高光时间戳截取 60 秒竖屏。

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录
节目笔记生成 Prompt（访谈形态）：
「你是播客制作人。基于以下带时间戳的文字稿，输出：1）120 字节目摘要；2）5 个带时间戳的章节标题；3）3 条可直接发布的社媒帖子（每条不超过 240 字）；4）一封 150 字 Newsletter 导语。只用文字稿里的事实，不编造嘉宾没说过的话。」

定价锚点：免费 30 分钟；Starter $8.99/月 120 分钟；Pro $49/月 320 分钟可结转；机构 $89/月起。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 红线：分钟额度硬上限防薅；生成内容只基于文字稿，防编造嘉宾言论。
- 防线：录制平台原生 AI 在挤压，只做单一形态的深度模板，不全功能跟随。
- 冷启：Product Hunt + 播客社群发人工 vs 一键对比；免费档第二期是付费触发点。
- 72 小时节拍：Day1 访谈排产出，Day2 流水线 MVP，Day3 计费上线并邀请 10 位播客主试用。
