# MoneyLab 每日巡逻 2026-11-13（3 条，全部 B 级）

## 本期入选（≥70 分）

| # | 项目 | 分数 | 原型 | 商业模式一句话 | 注意事项 |
|---|------|------|------|----------------|----------|
| 1 | Headroom 式 AI 编程上下文压缩桌面应用 | 70 分 B 级（8/8/7/5） | B 客户端工具 | 把开源压缩引擎打包成一键安装的桌面应用，帮 Claude Code / Codex 用户省 token，按订阅收费 | 命悬 Anthropic/OpenAI 会不会自己内置压缩；引擎开源免费，付费转化受限 |
| 2 | Glossa 式垂直场景实时翻译工具 | 70 分 B 级（7/7/7/7） | C 垂直 AI 封装 | 给多语言教堂做礼拜实时翻译，$5/小时/语言或 $99/299/499 月套餐；打法可平移到会议、旅游团等场景 | Stripe 核验数据最后同步 2026-10-19，之后因密钥过期断更；翻译成本在跌，定价留余地 |
| 3 | Underpriced AI 式二手转卖拍照估价工具 | 70 分 B 级（7/7/7/7） | B 客户端工具 | 拍照认货 + 拉 eBay 真实成交价，扣掉手续费运费后告诉你净赚多少、买还是不买；$9.99/月起 | 单价低要靠量；估值是估计不是鉴定，别承诺保真保价 |

## 来源与核实

- **Headroom**：Aiolum 深度拆解 https://aiolum.com/story/headroom/ —— MRR $2,025（222 订阅，2026-10-25）、累计 $12,111，TrustMRR 从 Polar 支付数据核验；2026-04-01 上线，单人维护。
- **Glossa**：State of Indie Hacking https://www.stateofindiehacking.com/stories/ai-built-apps-revenue-verified-median-shipped-and-paid/ —— MRR $14,404、100 订阅、累计 $196,539，Stripe 核验；2026-10-19 后密钥过期断更。
- **Underpriced AI**：Indie Hackers 创始人帖 https://www.indiehackers.com/post/built-a-profit-checker-app-for-resellers-that-solves-the-should-i-buy-this-problem-22fe82e6ca + Product Hunt 更新 —— Stripe 核验 $5,156/月（2026-10-29），11 月 7 日复核 $5,236.94/30 天；现价 $9.99/$14.99/$24.99。

三条均为流浪狗总管 2026-11-13 搞钱看板推荐（Headroom、Glossa）与本期主动巡逻发现（Underpriced AI，见 Shipped & Paid 11 月 6 日 Issue 7 同批核验清单）。去重已核：在线 llms.txt（11 条）+ 本地已发批次（NCLEX、Sonder、焊工线索、闲鱼表情包、Skillry、Plainmail、老车 3D 打印件），无撞车。

## 没入选的（单独说明原因）

- **Garbage Day 付费通讯（58 分）**：收入是真的（华盛顿邮报：去年近 $50 万，5,100 付费订户 x $5/月，广告 $1,000~2,000/条，播客近 2,500 Patreon，咨询 $10 万），但新人复制门槛太高：门槛友好度 4（要独特观点 + 多年积累）、见效速度 3（熬几年才有第一笔像样收入）、收益天花板 9、抗风险稳定性 7。幸存者偏差明显，不适合当可复制项目入库。
- **MimikFlow（LinkedIn 拓客工具，MRR $11,736）**：LinkedIn 自动化踩平台规则灰线，合规风险高；且原文自承 Stripe 数字可能包含创始人其他业务收入，证据打折。
- **AI Designer（AI 界面设计工具，MRR $8,323）**：v0、Lovable、Figma AI 同场竞争太挤，差异化不够。
- **Conductor（QuickBooks Desktop 连接器，约 $38,800/月）**： legacy 桌面软件 SDK 门槛高、见效慢，且已挂牌 $125 万出售，复制价值低。
- **Apiframe（AI 模型聚合 API，MRR $35,400）**：API 倒卖/套壳分销，走合规一票否决。
- **SocialCrawl（69 平台社媒数据 API）**：卖爬来的社媒数据，合规灰线，一票否决。

## 交付物

- `moneylab-2026-11-13.json`：标准项目 JSON（3 条，含 core_thesis 两段式、4 阶段 workflow_steps、title_en/summary_en、prototype 字段）
- `moneylab-2026-11-13-en.json`：纯英文镜像版
- `headroom-context-saver-desktop-SKILL.md`：原型 B 专属 SKILL.md（压缩核心代码已原样抽出跑通，示例省 32.7% token）
- `glossa-church-live-translation-SKILL.md`：原型 C 专属 SKILL.md（翻译字幕管线代码已原样抽出跑通）
- `underpriced-ai-reseller-scanner-SKILL.md`：原型 B 专属 SKILL.md（净利润计算器代码已原样抽出跑通）
- 三份 SKILL.md 均 0 TODO/伪代码，代码从成稿文件里原样抽出实测通过（见 hidden_files/retest-2026-11-13/）。

## 备注

- 本期三条均为 70 分压线 B 级，宁缺毋滥：分数没注水，Glossa 与 Underpriced AI 的 70 分建立在“复制者稳态预估远低于原版实绩”的务实口径上。
- MoneyLab 从未授权直接 GitHub 发布，本期只出文件、只发邮件，不碰发布。
