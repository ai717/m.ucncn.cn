---
name: "bulk-mockup-photoshop-batch"
description: "专为【Bulk Mockup 式 Photoshop 批量套图插件】定制的生产级商业操盘 Agent 技能包。内置 Photoshop UXP 批量替换智能对象的核心脚本、无 Photoshop 环境下可直接运行的 Pillow 等价批量套图脚本、单品类模板库打法与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "跨境与电商"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Bulk Mockup 式 Photoshop 批量套图插件

> **资产级别**: MoneyLab Institutional Grade (Tier C)
> **商业定位**: 给 POD、Etsy、Shopify 卖家做批量套图：设计图批量替换进模板智能对象，几分钟出几百张产品展示图。定价 15 美元/月、77 美元/年、2 台设备不限量；复制者务实月现金流 600-2000 美元（单品类模板口径）。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的 POD 卖家工具全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：给出 UXP 批量替换脚本与 Pillow 等价脚本，直接跑通批量套图；
- 🔍 [模式 B：选品与痛点诊断]：剖析 POD 卖家手工套图的真实耗时与模板习惯；
- 🛡️ [模式 C：合规与安全防线]：Adobe UXP 政策、版本兼容与卖家设计图隐私红线；
- 📈 [模式 D：商业转化与冷启动]：给出 YouTube 对比教程脚本与首批付费卖家成交话术。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- 一手信源：bulkmockup.com 官网定价（15 美元/月、77 美元/年、2 台设备不限量）；Indie Hackers 创始人自述约 15 万美元/年、月收 1.3 万美元以上（B 级证据：作者自述+平台标注，未第三方核实）；获客主渠道为 YouTube 搜索，Q4 为旺季。
- 客群：每周上新 20+ 设计的 POD、Etsy、Shopify 卖家；现方案为手工逐张替换智能对象，数小时/批；付费理由是把数小时压到几分钟。
- 复制者单位经济测算（务实口径）：

| 环节 | 数值 |
| :--- | :--- |
| 月搜索流量（教程页） | 3000 访问 |
| 免费版安装转化率 | 8%（240 次） |
| 免费转付费（每批 5 张上限触发） | 6%（约 14 个新付费/月） |
| 客单价 | 年付 77 美元为主，月付 15 美元为辅，混合约 11 美元/月 |
| 稳态付费用户 | 150-250 人（流失约 8%/月） |
| 稳态月收入 | 600-2000 美元 |
| 成本 | 零服务器（本地运行）；收款手续费约 5-8% |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构

### 3.1 Photoshop UXP 批量替换智能对象（插件核心，JavaScript）
在 Photoshop UXP 插件环境中运行：遍历设计文件夹，逐张替换模板中名为 `Design` 的智能对象层，按规则导出。

```javascript
const { app, core, action } = require("photoshop");
const fs = require("uxp").storage.localFileSystem;

async function replaceSmartObject(layer, fileEntry) {
  await core.executeAsModal(async () => {
    app.activeDocument.activeLayers = [layer];
    const token = await fs.createSessionToken(fileEntry);
    await action.batchPlay([{
      _obj: "placedLayerReplaceContents",
      null: { _path: token, _kind: "local" },
      _options: { dialogOptions: "dontDisplay" }
    }], {});
  }, { commandName: "Replace Smart Object" });
}

async function exportPng(doc, folderEntry, fileName) {
  const file = await folderEntry.createFile(fileName, { overwrite: true });
  await core.executeAsModal(async () => {
    await doc.saveAs.png(file, { compression: 6 }, true);
  }, { commandName: "Export PNG" });
}

async function runBatch(templateDoc, designFolder, outFolder, layerName) {
  const target = templateDoc.layers.find(l => l.name === layerName);
  if (!target) throw new Error("Smart object layer not found: " + layerName);
  const entries = await designFolder.getEntries();
  const designs = entries.filter(e => e.isFile && /\.(png|jpg|jpeg)$/i.test(e.name));
  let done = 0;
  for (const design of designs) {
    await replaceSmartObject(target, design);
    const base = design.name.replace(/\.[^.]+$/, "");
    await exportPng(templateDoc, outFolder, base + "_mockup.png");
    done += 1;
    console.log("exported", done, "/", designs.length, base);
  }
  return done;
}

module.exports = { runBatch };
```

### 3.2 无 Photoshop 环境的等价批量套图脚本（Python + Pillow，可直接运行）
逻辑与插件一致：把每张设计图按「覆盖裁剪」合成到模板图的指定占位框内，批量导出。占位框坐标按你的模板实测填写。

```python
import os
import sys
from PIL import Image

# 模板图上设计占位框的坐标（左, 上, 宽, 高），按模板实测填写
PLACEHOLDER = (300, 250, 600, 600)


def cover_resize(img, target_w, target_h):
    """按覆盖方式缩放并居中裁剪到目标尺寸。"""
    src_w, src_h = img.size
    scale = max(target_w / src_w, target_h / src_h)
    new_w, new_h = int(src_w * scale), int(src_h * scale)
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def batch_mockup(template_path, design_dir, out_dir, placeholder=PLACEHOLDER):
    os.makedirs(out_dir, exist_ok=True)
    template = Image.open(template_path).convert("RGBA")
    x, y, w, h = placeholder
    done = 0
    for name in sorted(os.listdir(design_dir)):
        if not name.lower().endswith((".png", ".jpg", ".jpeg")):
            continue
        design = Image.open(os.path.join(design_dir, name)).convert("RGBA")
        fitted = cover_resize(design, w, h)
        canvas = template.copy()
        canvas.alpha_composite(fitted, (x, y))
        base = os.path.splitext(name)[0]
        out_path = os.path.join(out_dir, base + "_mockup.png")
        canvas.save(out_path)
        done += 1
        print("exported", out_path)
    print("total", done)
    return done


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("usage: python3 batch_mockup.py <template.png> <design_dir> <out_dir>")
        sys.exit(1)
    batch_mockup(sys.argv[1], sys.argv[2], sys.argv[3])
```

运行示例：`python3 batch_mockup.py template.png ./designs ./out`

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录

### 4.1 YouTube 对比教程脚本模板（冷启主物料）
```
标题：Bulk Mockup Photoshop Tutorial: 100 POD Mockups in 3 Minutes (No Manual Work)
0:00-0:20 痛点开场：手工套 100 张要 3 小时，今天用插件 3 分钟跑完（屏幕计时器同框）
0:20-1:30 演示：选模板 PSD → 选设计文件夹 → 点运行 → 导出文件夹实时长出文件
1:30-2:30 命名规则与多模板队列：按 SKU 命名，Etsy 上架直接用
2:30-3:00 价格与入口：免费版每批 5 张，链接在置顶评论；Q4 前提醒年付 77 美元锁价
```
### 4.2 首批付费卖家成交话术（社群私信版）
```
你好，我看你店每周上新几十个设计，套图应该是你最耗时的环节。
我做了个 Photoshop 插件：选好模板和设计文件夹，一键批量出图，文件名按你的规则走。
免费版每批能跑 5 张，你拿今晚要上的设计试一下，跑不通我帮你调模板。
觉得省时间再开年付 77 美元，不限量、2 台设备。
```

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- **宿主依赖**：Adobe UXP 接口随 Photoshop 版本变化，智能对象替换与导出逻辑须在每个 Photoshop 大版本发布后 48 小时内回归；插件内做版本检测，低版本给出明确提示而非崩溃。
- **隐私红线**：卖家设计图只在本地处理，绝不上传服务器；隐私承诺写进商店页和插件内说明，这是 POD 卖家的信任门槛。
- **授权合规**：用 LemonSqueezy/Stripe 等 MoR 收款发授权码，插件联网校验并给 7 天离线宽限；免费版每批 5 张上限是唯一付费触发点，不做功能阉割。
- **冷启 SOP**：先绑一个品类（如宠物定制 T 恤）预装 10 个模板发教程；Q4 前 2 个月集中发对比教程吃旺季；年付折扣在旺季前推，锁住现金流对抗淡季。
- **数字纪律**：原版收入为创始人自述未第三方核实，对外宣传只讲省时数据（实测计时），不引用其收入数字。

---
