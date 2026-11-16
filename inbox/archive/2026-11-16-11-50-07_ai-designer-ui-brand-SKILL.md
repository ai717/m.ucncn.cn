---
name: "ai-designer-ui-brand"
description: "专为【AI Designer 式一句话生成 UI 与品牌设计 SaaS】定制的生产级商业操盘 Agent 技能包。内置 100% 契合该商业原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: AI Designer 式一句话生成 UI 与品牌设计 SaaS

> **资产级别**: MoneyLab Institutional Grade (Tier C)
> **商业定位**: 一句话生成网站/App UI、Logo 与品牌素材的订阅制 AI 设计 SaaS；客群是设计师、独立创业者与小团队；原案 TrustMRR Stripe 验证 $8,103 MRR、283 订阅，复制者稳态预期 $1,500–$4,000/月。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供本项目核心代码 `design_kit.py`（brief → 设计 tokens → 单文件 HTML + brand-kit.json + logo SVG）与接真实生成模型的扩展点；
- 🔍 [模式 B：选品与痛点诊断]：剖析 AI 设计赛道 2–3 星真实差评与刚需（出图“差不多好看”但不可发布、品牌一致性差、导出代码脏）；
- 🛡️ [模式 C：合规与安全防线]：字体授权、Logo 商标冲突、生成素材商用授权边界与 Stripe 订阅合规；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对目标客户的即用破冰成交物料（类目着陆页 + 对标页模板）。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

### 一手信源（2026-11-16 一手打开核实）
- 原案：AI Designer（aidesigner.ai），独立创始人 Wiz（X @bowlcutWiz；公司博客署名 Tyler Yin；主体 Friend Technologies, LLC，美国公司）。
- 收入（TrustMRR Stripe 验证，MissumAI 2026-11-15 更新核对框）：近 30 天 $8,056，MRR $8,103，283 订阅，累计 $86,981。创始人自述 46 天达 $1,500 MRR（founder-reported，未独立核实，不作 headline）。
- 交叉核对（Aiolum，TrustMRR 同源）：2026-10-16 MRR $8,563、293 订阅；9 月收入 $8,841；MRR 30 天下滑约 5.3%。结论：收入真实可查，但呈轻微下滑趋势，别当增长承诺写进宣传。
- 定价（aidesigner.ai/pricing，多方交叉核对一致）：免费 5 个终身额度（不绑卡）；Pro $25/月起（100 次生成），按生成量阶梯涨至 $2,250/月（10,000 次生成）；年付约 10 个月价；联盟佣金 20%。
- 产品能力：提示词生成网站/落地页/移动端界面、Logo 与品牌套件、干净 HTML/CSS 导出、一键发布自定义域名、MCP 供编程 Agent 直接调用（2026 年 4 月上线，配合自有品牌名 SEO 是增长主因之一）。
- 竞争格局：v0、Bolt、Lovable、Figma AI、Framer（已 $50M+ ARR、50 万+月活）、Canva、Webflow 全是直接竞品；Figma 专业席位 $16/月、Framer 基础 $10/月/站，价格带重叠。

### 真实漏斗精算（复制者稳态，按 skill 口径务实折扣）

| 环节 | 数值（注明来源） |
|---|---|
| 原案 ARPU | $8,103 ÷ 283 ≈ $28.6/月（TrustMRR 验证数推算） |
| 复制者定价 | Pro $25/月（100 次生成）起，与原案锚点一致 |
| 单次生成模型成本 | 假设 $0.05–$0.15/次（以实际调用账单为准，不虚构） |
| 支付手续费 | Stripe 约 2.9% + $0.30/笔 |
| 流失率假设 | 6–12%/月（Micro-SaaS 常规区间，须按月实测） |
| 复制者稳态月净利 | $1,500–$4,000（扣手续费、模型成本与流失后） |
| 首笔现金流 | 1–2 个月（MVP 3–6 周 + 首批种子用户） |

> 红线提醒：MRR 轻微下滑（$8,563 → $8,103）必须写进一切对外物料；46 天 $1,500 MRR 只是创始人自述，不得当审计数用。

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构

`design_kit.py`：一句话 brief → 设计 tokens → 单文件 HTML 落地页 + brand-kit.json + logo SVG，全程本地可跑、无需 API Key。确定性规则版用于验证“提示词 → 设计系统 → 可发布资产”管线；接真实生成模型时，把 `pick_preset()` 的返回值换成模型调用的解析结果即可，其余管线（tokens → HTML/JSON/SVG）原样复用。

```python
"""design_kit.py -- AI Designer 最小闭环脚手架（本地可跑，无需 API Key）.

一句话 brief -> 设计 tokens（调色板/字体/版式）-> 单文件 HTML 落地页
+ brand-kit.json + logo 文字标 SVG。确定性规则版：演示“提示词 -> 设计系统
-> 可发布资产”的完整管线；接真实生成模型时只需替换 generate_assets()
里 tokens 的来源（把 pick_preset() 换成模型调用），其余管线不变。

用法：
  python3 design_kit.py --brief "SaaS landing page for a coffee subscription" --out ./out
  python3 design_kit.py --demo        # 跑 3 条样例 brief，输出到 ./demo_out
"""
import argparse
import json
import os
import re
import sys

# 五套预设设计系统：每套 = 调色板 + 字体搭配 + 版式气质
PRESETS = {
    "saas": {
        "name": "SaaS 蓝",
        "primary": "#2563EB",
        "accent": "#0EA5E9",
        "background": "#F8FAFC",
        "surface": "#FFFFFF",
        "text": "#0F172A",
        "muted": "#64748B",
        "font_head": "Inter, system-ui, sans-serif",
        "font_body": "Inter, system-ui, sans-serif",
        "radius": "12px",
        "keywords": ["saas", "software", "dashboard", "app", "platform", "startup", "landing"],
    },
    "coffee": {
        "name": "咖啡暖",
        "primary": "#92400E",
        "accent": "#D97706",
        "background": "#FFFBEB",
        "surface": "#FFFFFF",
        "text": "#292524",
        "muted": "#78716C",
        "font_head": "Georgia, 'Times New Roman', serif",
        "font_body": "Georgia, 'Times New Roman', serif",
        "radius": "16px",
        "keywords": ["coffee", "cafe", "bakery", "restaurant", "food", "brand", "roast"],
    },
    "finance": {
        "name": "金融深",
        "primary": "#065F46",
        "accent": "#10B981",
        "background": "#F0FDF4",
        "surface": "#FFFFFF",
        "text": "#022C22",
        "muted": "#475569",
        "font_head": "Inter, system-ui, sans-serif",
        "font_body": "Inter, system-ui, sans-serif",
        "radius": "8px",
        "keywords": ["finance", "bank", "invest", "money", "fintech", "accounting"],
    },
    "wellness": {
        "name": "健康绿",
        "primary": "#15803D",
        "accent": "#84CC16",
        "background": "#F7FEE7",
        "surface": "#FFFFFF",
        "text": "#1A2E05",
        "muted": "#4D7C0F",
        "font_head": "'Segoe UI', system-ui, sans-serif",
        "font_body": "'Segoe UI', system-ui, sans-serif",
        "radius": "20px",
        "keywords": ["fitness", "health", "yoga", "wellness", "coach", "gym"],
    },
    "education": {
        "name": "教育紫",
        "primary": "#6D28D9",
        "accent": "#A78BFA",
        "background": "#F5F3FF",
        "surface": "#FFFFFF",
        "text": "#1E1B4B",
        "muted": "#6B7280",
        "font_head": "'Segoe UI', system-ui, sans-serif",
        "font_body": "'Segoe UI', system-ui, sans-serif",
        "radius": "10px",
        "keywords": ["course", "education", "school", "learn", "tutorial", "teacher"],
    },
}


def pick_preset(brief):
    """按关键词命中选预设；无命中回落到 saas。返回 (key, preset)。"""
    text = brief.lower()
    best_key, best_hits = "saas", 0
    for key, preset in PRESETS.items():
        hits = sum(1 for kw in preset["keywords"] if kw in text)
        if hits > best_hits:
            best_key, best_hits = key, hits
    return best_key, PRESETS[best_key]


def brand_name_from_brief(brief):
    """从 brief 里抽品牌名：取前两个实词首字母大写拼成；抽不到用默认名。"""
    words = re.findall(r"[A-Za-z][A-Za-z\-]{2,}", brief)
    stop = {"landing", "page", "for", "and", "the", "with", "app", "website"}
    picks = [w for w in words if w.lower() not in stop][:2]
    if not picks:
        return "Northwind"
    return "".join(w.capitalize() for w in picks)


def build_tokens(brief):
    """brief -> 设计 tokens（确定性，可复现）。"""
    key, preset = pick_preset(brief)
    return {
        "preset": key,
        "preset_name": preset["name"],
        "primary": preset["primary"],
        "accent": preset["accent"],
        "background": preset["background"],
        "surface": preset["surface"],
        "text": preset["text"],
        "muted": preset["muted"],
        "font_head": preset["font_head"],
        "font_body": preset["font_body"],
        "radius": preset["radius"],
        "brand": brand_name_from_brief(brief),
        "brief": brief,
    }


def render_html(tokens):
    """tokens -> 单文件 HTML 落地页（hero + 导航 + 按钮 + 三卡片）。"""
    t = tokens
    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{brand} — Generated by design_kit</title>
<style>
  body {{ margin: 0; font-family: {font_body}; background: {background}; color: {text}; }}
  .nav {{ display: flex; justify-content: space-between; align-items: center; padding: 20px 48px; }}
  .logo {{ font-family: {font_head}; font-weight: 800; font-size: 22px; color: {primary}; }}
  .btn {{ display: inline-block; padding: 12px 24px; border-radius: {radius}; background: {primary}; color: #fff; text-decoration: none; font-weight: 600; }}
  .btn-ghost {{ background: transparent; color: {primary}; border: 2px solid {primary}; }}
  .hero {{ text-align: center; padding: 72px 24px 48px; }}
  .hero h1 {{ font-family: {font_head}; font-size: 44px; margin: 0 0 16px; }}
  .hero p {{ color: {muted}; font-size: 18px; margin: 0 0 28px; }}
  .cards {{ display: flex; gap: 20px; justify-content: center; padding: 0 48px 64px; flex-wrap: wrap; }}
  .card {{ background: {surface}; border-radius: {radius}; padding: 24px; width: 260px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }}
  .card h3 {{ color: {accent}; margin-top: 0; }}
  .card p {{ color: {muted}; }}
</style>
</head>
<body>
  <div class="nav"><div class="logo">{brand}</div><div><a class="btn btn-ghost" href="#">Sign in</a> <a class="btn" href="#">Get started</a></div></div>
  <div class="hero"><h1>{brand} — {preset_name}</h1><p>Generated from brief: {brief}</p><a class="btn" href="#">Start free — 5 credits, no card</a></div>
  <div class="cards">
    <div class="card"><h3>Fast</h3><p>One sentence in, a finished design out. No box model, no waiting on a designer.</p></div>
    <div class="card"><h3>On-brand</h3><p>Palette, type and layout locked to your brand kit on every generation.</p></div>
    <div class="card"><h3>Shippable</h3><p>Clean HTML/CSS export and one-click publish to your own domain.</p></div>
  </div>
</body>
</html>
""".format(**t)


def render_logo_svg(tokens):
    """tokens -> 品牌文字标 SVG（首字母方块 + 品牌名）。"""
    t = tokens
    initial = t["brand"][0].upper()
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="64">'
            '<rect width="64" height="64" rx="12" fill="{primary}"/>'
            '<text x="32" y="44" font-family="{font_head}" font-size="36" font-weight="800" '
            'fill="#FFFFFF" text-anchor="middle">{initial}</text>'
            '<text x="76" y="42" font-family="{font_head}" font-size="26" font-weight="700" '
            'fill="{text}">{brand}</text></svg>').format(initial=initial, **t)


def generate_assets(brief, out_dir):
    """主入口：brief -> 写出 index.html / brand-kit.json / logo.svg，返回文件清单。"""
    tokens = build_tokens(brief)
    os.makedirs(out_dir, exist_ok=True)
    html_path = os.path.join(out_dir, "index.html")
    kit_path = os.path.join(out_dir, "brand-kit.json")
    svg_path = os.path.join(out_dir, "logo.svg")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(render_html(tokens))
    with open(kit_path, "w", encoding="utf-8") as f:
        json.dump(tokens, f, ensure_ascii=False, indent=2)
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(render_logo_svg(tokens))
    return {"preset": tokens["preset"], "brand": tokens["brand"], "files": [html_path, kit_path, svg_path]}


DEMO_BRIEFS = [
    "SaaS landing page for a coffee subscription",
    "Brand kit and logo for a yoga coaching app",
    "Finance dashboard landing page for a fintech startup",
]


def main(argv=None):
    ap = argparse.ArgumentParser(description="AI Designer 最小闭环脚手架")
    ap.add_argument("--brief", default="", help="一句话设计需求")
    ap.add_argument("--out", default="./out", help="输出目录")
    ap.add_argument("--demo", action="store_true", help="跑 3 条样例 brief")
    args = ap.parse_args(argv)
    if args.demo:
        base = os.path.join(args.out, "demo")
        for i, brief in enumerate(DEMO_BRIEFS, 1):
            result = generate_assets(brief, os.path.join(base, "case%d" % i))
            print("case%d preset=%s brand=%s files=%d" % (i, result["preset"], result["brand"], len(result["files"])))
        print("demo done: %d cases" % len(DEMO_BRIEFS))
        return 0
    if not args.brief:
        ap.error("--brief 或 --demo 二选一必填")
    result = generate_assets(args.brief, args.out)
    print("preset=%s brand=%s" % (result["preset"], result["brand"]))
    for path in result["files"]:
        print("wrote %s (%d bytes)" % (path, os.path.getsize(path)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

```

### 实测记录（2026-11-16，逐字节复核）
- 修复一处真 bug：`pick_preset()` 里曾把 preset 对象误赋给 `best_hits`，导致 demo 运行时报 `TypeError`；已修正为比较命中数，3 条样例全部跑通。
- 3 条样例验证：SaaS 咖啡订阅（preset=saas）、瑜伽教练品牌（preset=wellness）、金融科技落地页（preset=saas）；每案产出 index.html（>1000 字节，含调色板主色）、brand-kit.json（合法 JSON）、logo.svg（品牌名一致）。
- 从本文本抽取代码重跑：与实测文件逐字节一致。

---

## 🎯 模块四：行业特化型 Prompt 编排链

### 1. brief → 设计系统（接真实模型时的主提示词）
```text
你是一名资深品牌设计师。用户一句话 brief 如下：
【{brief}】
输出严格 JSON（不要多余文字）：
{
  "palette": {"primary": "#RRGGBB", "accent": "#RRGGBB", "background": "#RRGGBB", "surface": "#FFFFFF", "text": "#RRGGBB", "muted": "#RRGGBB"},
  "fonts": {"head": "字体名", "body": "字体名"},
  "radius": "8px/12px/16px/20px 之一",
  "layout": "hero 结构一句话 + 三个卖点卡片标题",
  "logo_idea": "文字标 + 图形元素一句话"
}
约束：主色与背景对比度 WCAG AA 以上；不要用纯黑 #000000 作正文；字体只用系统自带或 Google Fonts 常见字体。
```

### 2. 品牌套件生成提示词
```text
基于以下设计 tokens 生成品牌套件说明（Logo 用法、最小留白、禁用情形、配色比例 60/30/10）：
【{tokens JSON}】
输出 Markdown，不超过 300 字，只写可执行规则，不写空话。
```

### 3. 类目着陆页 SEO 提示词（冷启用）
```text
为“{类目} AI 设计生成器”写一页着陆页文案：标题含类目关键词，正文 3 段（痛点、做法、价格锚点），
结尾附“AI Designer vs {竞品}”对标表 4 行（价格、代码导出、发布、免费额度），数据只用已核实数字，
不确定的写“以官网为准”，不要编造。
```

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

### 合规红线
- **别承诺商标权**：生成 Logo 不等于注册商标；文案必须写“生成素材需自行做商标检索”，字体只用已授权字体。
- **别 1:1 复刻竞品模板**：v0/Bolt/Lovable/Figma 的官方模板与示例不得直接照搬；类目模板要自己画结构、自己写文案。
- **收入口径**：一切对外数字只用 TrustMRR Stripe 验证数；创始人自述（46 天 $1,500 MRR）必须标注 founder-reported；MRR 下滑趋势（$8,563 → $8,103）不得隐瞒。
- **订阅合规**：Stripe 订阅必须明示续费、取消路径与额度结转规则；免费 5 额度不绑卡；联盟佣金 20% 按月结算并公示。

### 冷启闭环（前 10 个种子付费用户）
1. 上线 20 个类目着陆页（SaaS 落地页、咖啡品牌、教练课程页优先），每页带真实生成样例与“vs Framer/Figma”对标表。
2. X 上 build in public：每周晒一次 MRR 曲线与生成样例（只晒真实数）。
3. 给前 10 个种子用户免 1 个月 Pro，换真实案例与反向链接；有 50 个付费用户后再接 MCP。
4. 每月盯流失率：超 10% 先停投放修产品；MRR 连续两月下滑先复盘生成质量与定价，别烧广告续命。
