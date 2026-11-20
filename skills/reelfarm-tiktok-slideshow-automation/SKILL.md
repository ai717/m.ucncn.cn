---
name: "reelfarm-tiktok-slideshow-automation"
description: "专为定制的生产级商业操盘 Agent 技能包。内置轮播图渲染源码、按量订阅结构、合规发布与自营验证物料。"
version: "2.0.0"
category: "AI应用与服务"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: ReelFarm 式 TikTok 轮播自动化

> **资产级别**: MoneyLab Institutional Grade (Tier C)
> **商业定位**: 单品类 TikTok 轮播模板流水线，按量订阅，复制者稳态目标 $1,500-$5,000/月。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供轮播渲染与排期源码；
- 🔍 [模式 B：选品与痛点诊断]：剖析跑量版式与品类选择；
- 🛡️ [模式 C：合规与安全防线]：官方接口发布与封号防线；
- 📈 [模式 D：商业转化与冷启动]：提供自营验证与里程碑物料。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- 原版证据：创始人自述峰值 $44,271/月、稳态 $30,000+/月、35 天到 $10K MRR，C 级证据；定价官网可查：Growth $49/月 100 条、Scale $95/月 250 条、Enterprise $195/月 750 条。真人 UGC $100-$300/条 vs 模板生成 $0.20-$0.50/条。
- 复制者漏斗精算：自营矩阵验证触达 3,000 运营者 → 试用 5% = 150 人 → 付费 15% ≈ 22 订阅 × $60 均价 ≈ $1,320/月起步，稳态 40-80 订阅即 $2,400-$4,800/月。

| 环节 | 转化率 | 人数/金额 |
|:--- |:--- |:--- |
| 自营验证触达 | - | 3,000 人 |
| 试用 | 5% | 150 人 |
| 付费 | 15% | 22 订阅 ≈ $1,320/月 |
| 稳态 | - | 40-80 订阅 |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构
模板渲染：把钩子句和要点排成 1080x1350 竖版轮播图，批量出图后走官方接口排期。以下为可直接运行的渲染脚本（Pillow）：

```python

from PIL import Image, ImageDraw, ImageFont
import os

def render_slideshow(hook: str, points: list, out_dir: str) -> list:
    os.makedirs(out_dir, exist_ok=True)
    W, H = 1080, 1350
    font = ImageFont.load_default(size=64)
    small = ImageFont.load_default(size=44)
    files = []
    img = Image.new("RGB", (W, H), (18, 18, 18))
    d = ImageDraw.Draw(img)
    d.multiline_text((60, 520), hook, fill=(255, 255, 255), font=font)
    p = os.path.join(out_dir, "slide-00.png")
    img.save(p)
    files.append(p)
    for i, pt in enumerate(points, 1):
        img = Image.new("RGB", (W, H), (30, 30, 46))
        d = ImageDraw.Draw(img)
        d.multiline_text((60, 560), pt, fill=(255, 255, 255), font=small)
        p = os.path.join(out_dir, f"slide-{i:02d}.png")
        img.save(p)
        files.append(p)
    return files

if __name__ == "__main__":
    out = render_slideshow("3 apps I use every day", ["App one: notes", "App two: timer", "App three: reader"], "demo-slides")
    print("slides:", len(out), out)
    assert len(out) == 4
    print("render ok")
```

发布层：用 TikTok 官方接口上传并排期，保留人工审核开关；额度只用一种货币（条数），别学原版双货币。

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录
版式拆解 Prompt：
「拆解这条 TikTok 轮播：1）钩子句用了什么结构；2）每张图的文案和视觉元素；3）结尾引导动作；4）把结构抽象成可复用模板，给出 3 个同品类新选题。」

定价锚点：$49/月 100 条、$95/月 250 条、$195/月 750 条，账号与席位不限；免费只给 3 条尝鲜且不可发布。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 红线：只走官方接口、保留人工审核，不做刷量和仿冒真人背书。
- 防线：绑定单品类模板库，通用生成器无续费理由；额度单一货币防流失。
- 冷启：先自营矩阵跑出真实数据 → 公开里程碑 → 一对一带跑前 10 个付费用户。
- 72 小时节拍：Day1 拆版式定品类，Day2 渲染 + 排期 MVP，Day3 自营账号首发并开试用。
