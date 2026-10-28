# ⚡ 搞钱实验室 (MoneyLab)

> 前沿变现、微型商业与轻资产网赚项目雷达 · 纯客观数据解剖 · 暗黑极客科技风

---

## 🌐 访问路径与部署结构
- **独立线上入口**: `https://m.ucncn.cn`
- **代码结构**: 独立 GitHub 仓库 `ai717/m.ucncn.cn`，托管于 GitHub Pages。
- **发布机制**: 直接通过 GitHub `main` 分支触发 GitHub Pages 自动构建上线，零服务器运维。
- **小程序扩展**: `https://m.ucncn.cn/data/projects.json` 部署后为公开纯静态接口，微信小程序端可直接通过 `wx.request` 零成本接入。

---

## 📐 AI 结构化输出规范 (Data Contract)

> **核心原则**：加权打分与多维评估在 AI 收集阶段（通过 Skill / Prompt）全部完成。网站与入库端**不执行黑盒评分，只接收纯净结构化数据**。

### AI Skill 输出的单个项目 JSON 格式规范：
```json
{
  "id": "ml-20261028-001",
  "title": "项目标题（务求具体有信息量，拒绝浮夸营销腔）",
  "slug": "unique-slug-key",
  "category": "出海/独立开发 | 国内虚拟电商 | AI应用与服务 | 内容流量变现 | 跨境与电商",
  "tags": ["AI编程", "Chrome插件", "出海变现", "被动收入"],
  "summary": "1~2句话精准提炼项目商业逻辑与变现路径。",
  "score": 92,
  "rating_tier": "S",
  "verdict": "AI 实验室评语：一句话总结确定性与性价比。",
  "score_breakdown": {
    "feasibility": 9,
    "velocity": 9,
    "ceiling": 8,
    "reliability": 9
  },
  "metrics": {
    "difficulty_stars": 2,
    "cycle_time": "5~10 天",
    "initial_cost": "$5",
    "revenue_model": "月度订阅 + 终身买断",
    "est_monthly_profit": "$1,200 ~ $4,500 / 月"
  },
  "deep_dive": {
    "opportunity": "为什么当下是窗口期？市场需求与供需差分析。",
    "workflow": [
      "1. 痛点挖掘：如何寻找真实需求...",
      "2. 极速研发/制作：具体步骤...",
      "3. 商业闭环：支付与履约...",
      "4. 流量获客：冷启动渠道与获客方法..."
    ],
    "risk_and_pitfalls": "核心避坑指南、封号风险与资金/时间消耗陷阱。",
    "tools": ["Cursor", "Manifest V3", "LemonSqueezy"]
  },
  "source_url": "https://...",
  "created_at": "2026-10-28"
}
```

---

## 🚀 本地入库与自动发布脚本

把 AI 跑出来的 JSON 保存为本地文件后，运行以下命令即可自动入库、去重合并，并推送到线上触发部署：

```bash
# 仅入库更新本地 projects.json
node money/scripts/ingest.js --file=test.json

# 入库并自动提交 Git 触发云端部署发布
node money/scripts/ingest.js --file=test.json --push
```

---

## 📱 小程序未来移植备忘

1. **零后端数据库成本**：
   小程序直接请求线上已部署的静态 JSON：
   ```js
   wx.request({
     url: 'https://ucncn.cn/money/data/projects.json',
     success: (res) => {
       this.setData({ projects: res.data });
     }
   });
   ```
2. **UI 逻辑 1:1 映射**：
   `index.html` 中的卡片组件、四维雷达条、抽屉弹窗结构与小程序的 Page / Component 逻辑完全一致。
