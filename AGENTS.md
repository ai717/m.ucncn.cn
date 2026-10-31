# AGENTS.md - MoneyLab (m.ucncn.cn) 架构契约与开发准则

## 1. 项目定位与商业模式
**搞钱实验室 (MoneyLab)** 是一个面向个人开发者、一人公司（Solopreneur）与出海创业者的商业资产逆向尽调与落地系统。
- **项目定位**：去伪存真，拆解全球真实且具有正向现金流的 Micro-SaaS、Shopify 插件、Chrome 扩展、数字资产与自动化出海项目。
- **商业闭环**：基于 Stripe 官方合规收单，采用“单篇买断 (HK$29.90 / ~$3.80) + 年度全库 VIP (HK$299 / ~$38.00)”双轨计费。
- **双语架构**：
  - 中文主站：`https://m.ucncn.cn/`
  - 英文出海版：`https://m.ucncn.cn/en/`

---

## 2. 核心架构与目录规范

```
money/
├── AGENTS.md                          # 项目规则、架构契约与安全铁律
├── PROJECT_LOG.md                     # 开发进度、问题诊断与追踪日志
├── index.html                         # 中文版主站 SPA 单页应用
├── en/
│   └── index.html                     # 英文独立出海版 SPA 单页应用
├── data/
│   ├── projects.json                  # 中文版 7 个精选商业尽调研报数据
│   └── projects_en.json               # 英文版 7 个硅谷极客语境对齐数据集
├── p/<slug>/index.html                # 中文版 7 个独立静态落地页 (SEO 收录页)
├── en/p/<slug>/index.html             # 英文版 7 个独立静态落地页 (SEO 收录页)
├── scripts/
│   ├── server.js                      # 本地极速开发测试服务器 (端口 28766)
│   ├── generate_landing_pages.js      # 静态落地页与 Sitemap 自动化构建引擎
│   └── ingest.js                      # 外部项目信源结构化清洗脚本
├── sitemap.xml                        # Google 规范多语言站点地图 (16 个独立 URL)
├── robots.txt                         # 爬虫防线与反参数重复内容协议
├── favicon.svg                        # 品牌矢量 Logo
└── moneylab_stripe_cover.jpg          # 1200x630 社交分享 Open Graph 高清封面
```

---

## 3. 开发铁律与安全规范

1. **绝对仓库与目录隔离**：
   - **最高工作纪律**：任何开发、排查、测试、修改、提交与推送仅限定在 `money/`（`m.ucncn.cn`）项目内。
   - **严禁越界**：绝不触碰、不修改、不扫描外层的根目录主站或任何其他项目。
2. **沙盒免卡测试安全防御**：
   - 调试入口 `[开发调试] 模拟支付成功回调` 在生产环境默认完全隐藏 (`hidden`)。
   - 仅在 `localhost`、`127.0.0.1` 或 URL 带管理员暗号 `?dev=1` 时激活。
   - 底层函数 `simulateSuccessfulPayment()` 内置硬拦截，防止线上通过 DevTools 绕过付费。
3. **双轨数据与落地页同步机制**：
   - 增加或修改商业项目时，必须同步更新 `data/projects.json` 与 `data/projects_en.json`。
   - 修改数据后，必须运行 `node scripts/generate_landing_pages.js` 重新编译静态落地页与更新 `sitemap.xml`。
4. **爬虫与 SEO 安全红线**：
   - 严禁对百度、Google、Bing 爬虫执行语言跳转；
   - `sitemap.xml` 禁止放入带 `#` 锚点的网址，必须全部指向 `/p/<slug>/` 静态落地页；
   - 页面内部卡片与拆解按钮必须具备语义化的 `<a href="...">` 真实抓取链接。
5. **移动端交互基准**：
   - 弹窗必须使用 `max-h-[calc(100dvh-16px)]` 动态视口高度，兼容 iOS/Android 底部地址栏；
   - 交互按钮与收银台支付图标在移动端必须保证大拇指触控区无误触（采用双列以上舒适栅格）。
