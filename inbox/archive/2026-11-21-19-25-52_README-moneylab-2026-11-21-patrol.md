# MoneyLab 每周巡逻 2026-11-21（4 条）

选品方向（2026-11-18 用户定，本期起生效）：少追大榜单，优先 BizPeel 新上架小产品（MRR < $10K）与 TrustMRR 新核实小体量独立产品。本期 4 条全部来自该方向，去重基准为 https://m.ucncn.cn/llms.txt 与 catalog.json（站上 31 条，2026-11-20 更新）。

## 入选（≥60 分，均为 C 级）

1. **VendPlacer 式自动售货机点位撮合市场**（68 分，C 级，原型 A，线下数字化线索）
   - 商业模式：业主免费挂点位、运营商免费浏览，$249/年解锁直联业主，零抽成。
   - 证据：BizPeel 公开渠道 MRR $4,480、187 活跃订阅、30 天 $13.7K；官网 22,876 点位/420 城。
   - 来源：https://bizpeel.com/project/vendplacer ；官网 https://vendplacer.com/
   - 注意：双边市场冷启最难，必须一城一城做；假点位是生死线。

2. **Mon Atelier 式维修店一体化 ERP**（65 分，C 级，原型 C，出海/独立开发）
   - 商业模式：工单/报价/发票/库存/POS/通知一站式，€19/月起，本地合规内置。
   - 证据：BizPeel/TrustMRR MRR 约 $2,931、30 天约 $3.6K、累计约 $22K、70 家店。
   - 来源：https://bizpeel.com/project/mon-atelier
   - 注意：B2B 销售周期长，合规每国重做，适合跑店型打法。

3. **How to Convert 式本地文件转换器**（63 分，C 级，原型 B，出海/独立开发）
   - 商业模式：本地转换不上云，免费在线版漏斗 + $29 一次买断离线版。
   - 证据：BizPeel 30 天 $417、累计约 $61K、月访约 124.9K；官网 $29/5 设备/2,427 离线用户。
   - 来源：https://bizpeel.com/project/how-to-convert ；官网 https://howtoconvert.co/
   - 注意：一次买断无复购且原版已衰减，必须收窄到不能上传文件的专业人群。

4. **Nocapmocap 式 Roblox 动画生成**（60 分，C 级，原型 C，AI应用与服务）
   - 商业模式：文字/视频生成 R15 动画，免费插件预览，点数包预付（$20/100 点）。
   - 证据：TrustMRR/Polar MRR 约 $2,529（2026-10-25）；BizPeel MRR 约 $2,400、累计约 $20K。
   - 来源：https://bizpeel.com/project/nocapmocap ；官网 https://www.nocapmocap.com/
   - 注意：刚好压线，动作质量与 GPU 成本是硬门槛。

## 淘汰（不产文件，说明原因）

- TanStarter（SaaS 脚手架 $99~$139 买断，30 天 $1,706、累计 $34.4K）：四维 5/6/5/7 = 58 分，未过 60 线。脚手架赛道极度拥挤、一次买断无复购、维护负担重。
- RedShip（Reddit 意向监听 $29/月）：与站上 reddit-leadgen-cold-email-bot 完全同款，撞去重红线。
- SocialClaw（AI 代理社媒排期，MRR $1,923）：与站上 post-bridge-multi-platform-publisher 同模式同客群，撞车。
- AutoSubtitles（AI 字幕 $9/月，TrustMRR $3.2K MRR）：转写是通用功能，YouTube/CapCut 免费原生字幕覆盖风险高，可靠性低。
- Produktstudio.ai（电商 AI 商品图）：收入证据冲突（一方称 TrustMRR $2,534 MRR，另一方 2026-11-13 核查称无可引用收入），且为代理公司运营、赛道拥挤，本期不采。

## 文件清单

- moneylab-2026-11-21-patrol.json：4 条标准项目 JSON（含 en 镜像，海外版 0 汉字已扫描）
- vendplacer-vending-location-marketplace-SKILL.md
- monatelier-repair-shop-erp-SKILL.md
- howtoconvert-local-file-converter-SKILL.md
- nocapmocap-roblox-animation-credits-SKILL.md
- 每份 SKILL.md 的 Python 代码块已从成稿文件抽出实测跑通（见巡逻日志）

## 边界

本期只出文件、只发邮件，未做任何 GitHub 发布，m.ucncn.cn 无发布通道。
