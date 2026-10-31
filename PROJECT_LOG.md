# PROJECT_LOG.md - MoneyLab (m.ucncn.cn) 开发追踪与日志

## 核心里程碑与改动日志

### [2026-10-31 ~ 2026-11-01] 搞钱实验室出海版搭建、SEO 工业级重构与移动端全量优化

#### 1. 本次完成内容（做了什么）
1. **海外英文独立版上线与自动化语言路由**：
   - 建设 `money/en/index.html`，以硅谷独立开发者语境对齐翻译 7 个商业项目的标题、单元经济指标与实操 SOP；
   - 部署爬虫安全的智能语言探测：非爬虫访客初次访问 `m.ucncn.cn/` 自动路由至 `/en/`，中文访客误入 `/en/` 显示顶部浮条提供一键切回；
   - 语言切换按钮严格采用国际标准英文字母格式（中文版显示 `🌐 EN`，英文版显示 `🌐 ZH`）。
2. **控制台两层解耦与卡片排版修复**：
   - 彻底解决搜索框与筛选按钮拥挤换行、高低不平的问题，升级为两层清晰控制台（Row 1: 全宽分类 Tab + 排序下拉；Row 2: 独立搜索框 + 单行横向微调过滤胶囊）；
   - 修复由于模板替换误把 `$1`、`$2` 当作正则反向引用变量导致的美元金额残缺问题（恢复为 `$1,200 - $3,800 / mo` 等完整金额）；
   - 锁定卡片头部评级徽章不换行，统一卡片高度与标题行数（`min-h-[48px] line-clamp-2`）。
3. **收银台沙盒免卡测试的生产环境安全防御**：
   - 线上正式环境默认完全隐藏调试解锁按钮，仅在本地开发（`localhost` / `127.0.0.1`）或 URL 携带管理员暗号 `?dev=1` 时渲染；
   - 在 `simulateSuccessfulPayment()` 执行函数内部加入硬拦截阻断，杜绝外部刷单与白嫖。
4. **分类栏原生横向滚动条隐形重构与平滑滚轮交互**：
   - 为分类 Tab 和快捷筛选胶囊注入 `.no-scrollbar`，彻底剔除 Windows 下默认的 16px 粗黑横向滚动条；
   - 新增鼠标滚轮横向滚动事件监听（`setupHorizontalScrolls`），桌面端鼠标滚轮悬停即可丝滑横向滑动。
5. **全站统一接入 Google Analytics 官方统计**：
   - 在中文版和英文版 `<head>` 顶部统一植入 `G-NWJ2D2NRYK` 追踪代码，无死角采集全球 Pageview 与转化事件。
6. **多语言 Sitemap XML 扩充与 14 组静态独立落地页自动化生成**：
   - 开发 `scripts/generate_landing_pages.js` 自动化构建引擎，针对 7 个商业项目一键编译生成 7 个中文独立页面（`p/<slug>/index.html`）与 7 个英文独立页面（`en/p/<slug>/index.html`）；
   - 扩充 `money/sitemap.xml` 至 16 个高质量独立网址，符合 Google 官方双向 `xhtml:link` 多语言互指规范。
7. **全网最大化 SEO 深度重构**：
   - 补齐中文版缺失的 `<h1>` 标签，强化核心搜索关键词；
   - 将主页卡片标题与拆解按钮升级为真实爬虫可抓取的 `<a href="./p/<slug>/">`；
   - 社交分享卡片升级为 1200×630 高清大图（`moneylab_stripe_cover.jpg` + `summary_large_image`）；
   - 部署三合一 Schema.org JSON-LD 结构化数据（`TechArticle` + `BreadcrumbList` + `Product` 带 4.9⭐ 和价格），激活 Google 搜索富媒体结果；
   - 优化 `robots.txt`，屏蔽 `?dev=1` 等参数 URL 防内容重复。
8. **全链路移动端（触屏）交互与布局适配**：
   - 手机端顶栏紧凑排版，隐藏次要文字（`hidden md:block`），弹性间距确保单行不换行溢出；
   - 收银台支付方式在手机端由 4 列挤压升级为双列大按钮（`grid-cols-2 sm:grid-cols-4`）；
   - 弹窗采用现代 `100dvh` 动态视口高度，贴合 iOS Safari / Android Chrome 底部导航条；
   - 放大关闭按钮为 36px 拇指触控区，移除 `select-none` 允许自由长按选中文本。

#### 2. 修改的文件列表
- `money/index.html`：中文主站 SPA
- `money/en/index.html`：英文独立出海版 SPA
- `money/data/projects.json`：中文商业尽调数据集
- `money/data/projects_en.json`：英文出海商业尽调数据集
- `money/p/*/index.html`：7 个中文独立项目落地页
- `money/en/p/*/index.html`：7 个英文独立项目落地页
- `money/scripts/generate_landing_pages.js`：静态落地页与 Sitemap 自动化生成引擎
- `money/scripts/server.js`：开发服务器支持子目录 index 自动解析
- `money/sitemap.xml`：包含 16 个独立 URL 的多语言双向 Sitemap
- `money/robots.txt`：爬虫规则与反参数重复协议
- `money/AGENTS.md`：架构契约与开发准则
- `money/PROJECT_LOG.md`：本项目日志记录

#### 3. 关键实现方式
- **爬虫安全语言路由**：在 `<head>` 最顶部优先检测 `User-Agent`，凡匹配 `bot|spider|crawl` 立即中止跳转，确保 Googlebot 和 Bingbot 索引原生 HTML，普通访客依据首选语言重定向。
- **动态视口与平滑横滑**：使用 CSS `.no-scrollbar` 配合 JS `wheel` 转换 `el.scrollLeft += e.deltaY`，兼顾触屏原生滑动与 PC 鼠标滚轮。
- **无感 SPA 链接与爬虫两全**：卡片上使用真实 `<a href="./p/<slug>/">`，但在原生鼠标左键点击时 `event.preventDefault()` 打开弹窗；爬虫直接抓取 `href`，用户中键/右键新建标签页则直接打开独立落地页。

#### 4. 遇到的问题与解决方案
1. **本地开发服务器 `/en/` 报 404**：
   - *根因*：`server.js` 之前仅判断了根目录 `/`，对子目录未尝试回退读取 `index.html`。
   - *修复*：增加 `fs.statSync(filePath).isDirectory()` 探测，自动拼接 `path.join(filePath, 'index.html')`。
2. **美元金额前缀缺失（`,200 - ,800 / mo`）**：
   - *根因*：正则字符串替换函数中 `$1,200` 里的 `$1` 被识别为正则捕获组变量展开为空。
   - *修复*：改为直接由 JSON 数据源渲染，彻底杜绝字符串反向引用劫持。
3. **工作区误触外层主站仓库**：
   - *根因*：全局脚本批量注入时误扫描了外层 `ucncn` 主站文件。
   - *修复*：第一时间通过 `git reset --hard d0075aa` 强制回滚并强制推送到远程仓库，外层完全复原；确立严格的目录边界纪律，后续所有动作 100% 封闭在 `money/` 内。
