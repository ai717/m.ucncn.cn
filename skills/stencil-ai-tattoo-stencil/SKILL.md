---
name: "stencil-ai-tattoo-stencil"
description: "专为【Stencil AI 式纹身描图工具】定制的生产级商业操盘 Agent 技能包。内置照片转线稿描图并按真实尺寸导出 PDF 的可运行 Python 流水线、按点计费定价表与纹身师社群冷启 SOP。"
version: "2.0.0"
category: "AI应用与服务"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Stencil AI 式纹身描图工具

> **资产级别**: MoneyLab Institutional Grade (Tier B)
> **商业定位**: 给在岗纹身师做照片转描图线稿：上传客户照片，一键生成可转印线稿并按真实厘米尺寸导出 PDF，省手工描图约 1 小时/单。按点订阅 14/29/69 美元三档；复制者务实月现金流 1000-3500 美元（单一风格口径）。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的纹身行业工具全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：给出照片转线稿流水线代码，直接跑通并导出真实尺寸 PDF；
- 🔍 [模式 B：选品与痛点诊断]：剖析纹身师手工描图的耗时与转印质量标准；
- 🛡️ [模式 C：合规与安全防线]：客户肖像照片的存储删除政策与点数退点规则；
- 📈 [模式 D：商业转化与冷启动]：给出纹身师社群前后对比物料与 Studio 店面团购话术。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- 一手信源：stencilai.app 官网定价（Hobby 14 美元/月 20 点、Pro 29 美元/月 100 点、Studio 69 美元/月起，0.99 美元体验包 5 点）；TrustMRR 经 The AI Receipts 2026-11-21 核实 MRR 4.88 万美元、1800 个订阅、累计约 49.3 万美元；2026-07 以来月收入停滞在 6 万-6.4 万美元。
- 客群：在岗纹身师与纹身店；现方案为手工描图约 1 小时/单；付费理由是省 1 小时多接一单。
- 复制者单位经济测算（务实口径）：

| 环节 | 数值 |
| :--- | :--- |
| 社群/短视频月触达 | 5000 纹身师 |
| 0.99 美元体验包转化 | 4%（200 人） |
| 体验转订阅（Pro 为主） | 25%（50 人/月新增） |
| 客单价 | 混合约 24 美元/月 |
| 稳态付费用户 | 120-200 人（流失约 10%/月） |
| 稳态月收入 | 1000-3500 美元 |
| 成本 | 生成接口按次计费，毛利须守住 70% 以上；失败自动退点 |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构

### 3.1 照片转线稿并按真实尺寸导出 PDF（Python + Pillow，可直接运行）
流水线：灰度 → 对比度增强 → 边缘提取 → 二值化 → 线条加粗（可选）→ 输出线稿 PNG 与按真实厘米尺寸、300dpi 的 PDF。

```python
import os
import sys
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

DPI = 300


def photo_to_stencil(input_path, out_png, out_pdf, width_cm=10.0,
                     detail=1.6, threshold=110, line_boost=False):
    """把照片转成描图线稿，导出 PNG 与真实尺寸 PDF。"""
    img = Image.open(input_path).convert("L")
    # 1. 对比度与细节增强，让轮廓更利落
    img = ImageOps.autocontrast(img, cutoff=1)
    img = ImageEnhance.Contrast(img).enhance(detail)
    # 2. 边缘提取
    edges = img.filter(ImageFilter.FIND_EDGES)
    edges = ImageOps.autocontrast(edges, cutoff=1)
    # 3. 二值化：边缘像素变黑线，其余变白底
    stencil = edges.point(lambda p: 0 if p > threshold else 255, mode="L")
    # 4. 可选线条加粗：对黑线做最小值滤波扩张
    if line_boost:
        stencil = stencil.filter(ImageFilter.MinFilter(3))
    stencil.save(out_png)
    # 5. 按真实尺寸导出 PDF：宽 width_cm 厘米，300dpi
    target_w_px = int(width_cm / 2.54 * DPI)
    scale = target_w_px / stencil.width
    target_h_px = int(stencil.height * scale)
    sized = stencil.resize((target_w_px, target_h_px), Image.LANCZOS)
    sized = sized.point(lambda p: 0 if p < 128 else 255, mode="L")
    sized.save(out_pdf, "PDF", resolution=float(DPI))
    print("stencil png:", out_png)
    print("stencil pdf:", out_pdf, "width_cm:", width_cm, "dpi:", DPI)
    return out_png, out_pdf


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("usage: python3 stencil.py <photo> <out.png> <out.pdf> [width_cm]")
        sys.exit(1)
    width = float(sys.argv[4]) if len(sys.argv) > 4 else 10.0
    photo_to_stencil(sys.argv[1], sys.argv[2], sys.argv[3], width_cm=width)
```

运行示例：`python3 stencil.py photo.jpg stencil.png stencil.pdf 12`
参数调优：`detail` 控制细节强度（1.2-2.0），`threshold` 控制线条多少（越低线条越多），`line_boost=True` 加粗线条适合大图转印。写实肖像建议 detail=1.8、threshold=90；传统美式线条粗，建议 detail=1.4、threshold=130 并开 line_boost。

### 3.2 按点计费核心逻辑（服务端伪接口骨架，Python）
```python
PLANS = {"hobby": {"price": 14, "credits": 20},
         "pro": {"price": 29, "credits": 100},
         "studio": {"price": 69, "credits": 300},
         "trial": {"price": 0.99, "credits": 5}}


def charge_credit(balance, success):
    """生成成功才扣 1 点；失败自动退点（不扣）。"""
    if success and balance > 0:
        return balance - 1, True
    if success and balance <= 0:
        return balance, False  # 余额不足，拒绝生成
    return balance, True  # 生成失败，不扣点
```

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录

### 4.1 纹身师社群前后对比帖模板（冷启主物料）
```
标题：手工描图 1 小时 vs 一键 1 分钟（附转印上身图）
正文：这张是客户给的照片（图1），我用工具转的线稿（图2），按 12cm 真实尺寸导的 PDF 直接上转印机（图3 上身）。
线条细节能调，失败自动退点。0.99 美元能试 5 张，拿你手头排队的图试，糊了算我的。
```
### 4.2 Studio 店面团购话术（按店谈）
```
老板，你店里 3 位师傅每天描图加起来至少 3 小时，旺季就是 3 单的量。
Studio 档 69 美元/月起，多席位共用点数，失败退点，客户照片不留存、不用于训练，合同里写清。
先给店里开 0.99 美元体验包，师傅们跑一周，省下的时间够不够付月费，你们自己算。
```

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- **质量生死线**：线条糊、细节丢、尺寸偏会被纹身师一次否决；上线前必须用真实客户照片样本验收，标准是「能直接上转印机」，达不到就调参或换风格，绝不带病上线。
- **肖像与隐私**：客户照片默认处理完即删或短期留存，删除政策写进条款；绝不默认用于训练，这是纹身师向客户交代的底线。
- **计费纪律**：点数规则只用一种货币，失败自动退点写进条款并在账单页可见；体验包每账号限购一次，防薅。
- **冷启 SOP**：先绑一个风格（如写实肖像）把线条算法调深；社群发真实前后对比带上身图；前 20 个付费纹身师一对一带跑；Studio 档按店谈团购对抗原版收入停滞的赛道现状。
- **增长纪律**：原版月收入自 2026-07 起停滞，别指望赛道自然增长；复制者靠风格做深与店面渠道，不靠广告硬砸。

---
