---
name: "ai-toolbox-cross-platform-chat-organizer"
description: "专为定制的生产级商业操盘 Agent 技能包。内置 Manifest V3 架构、本地索引搜索源码、MoR 授权物料与商店 SEO 冷启。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: AI Toolbox 式跨平台对话整理插件

> **资产级别**: MoneyLab Institutional Grade (Tier C)
> **商业定位**: 四家 AI 对话统一整理插件，本地索引零服务器，复制者稳态目标 $800-$3,000/月（终身制为主）。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供 MV3 架构与本地搜索源码；
- 🔍 [模式 B：选品与痛点诊断]：剖析竞品差评里的可收费痛点；
- 🛡️ [模式 C：合规与安全防线]：最小权限与本地数据防线；
- 📈 [模式 D：商业转化与冷启动]：提供商店 SEO 与对比页物料。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- 原版证据：TrustMRR 验证近 30 天 $24,564、MRR $1,214（140 订阅）、累计约 $140,000，A 级证据；定价官网可查：单平台 $9.99/月、$59/年、$99 终身，四平台捆绑 $200，Teams $12/座位。构建成本 $32、月运营约 $45。
- 复制者漏斗精算：商店自然流量月装机 2,000 → 免费转付费 3% = 60 单 × $60 均价 ≈ $3,600/月峰值期，稳态按 $800-$3,000/月规划；终身制占比高，订阅收入只占小头。

| 环节 | 转化率 | 人数/金额 |
|:--- |:--- |:--- |
| 商店装机 | - | 2,000/月 |
| 免费转付费 | 3% | 60 单 ≈ $3,600 |
| 稳态规划 | - | $800-$3,000/月 |
| 运营成本 | - | 约 $45/月 |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构
MV3 扩展：content script 读取侧边栏对话列表写入 IndexedDB，popup 做跨平台全文搜索。以下为可直接校验的 manifest 与可运行的本地搜索逻辑演示（Node）：

```json
{
"manifest_version": 3,
"name": "Chat Organizer",
"version": "1.0.0",
"description": "Folders and full-text search across AI chats. Data stays in your browser.",
"permissions": ["storage"],
"host_permissions": ["https://chatgpt.com/*"],
"action": { "default_popup": "popup.html"},
"content_scripts": [
{ "matches": ["https://chatgpt.com/*"], "js": ["content.js"]}
]
}
```

```javascript
// local full-text search over indexed chats (runs in popup, data from IndexedDB)
function searchChats(chats, query) {
const q = query.trim().toLowerCase();
if (!q) return [];
return chats
.filter(c => (c.title + " " + c.body).toLowerCase().includes(q))
.sort((a, b) => b.updated - a.updated)
.slice(0, 25);
}

const demo = [
{ platform: "chatgpt", title: "SEO plan", body: "keyword research notes", updated: 3},
{ platform: "claude", title: "Recipe ideas", body: "pasta sauce", updated: 2},
{ platform: "gemini", title: "SEO audit", body: "site speed fixes", updated: 1}
];
const hits = searchChats(demo, "seo");
console.log("hits:", hits.map(h => h.platform + ":" + h.title).join(", "));
if (hits.length!== 2) { console.error("FAIL"); process.exit(1);}
console.log("search ok");
```

各平台选择器单独放 adapters/chatgpt.js 等文件，平台改版只改对应文件、48 小时发版。

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录
商店文案锚点：标题带核心词「ChatGPT Folders & Search」，描述第一句写清「对话只存浏览器本地，不上传服务器」。对比页结构：功能表（文件夹/跨平台搜索/导出/提示词库）+ 价格表 + 隐私说明。

定价锚点：免费限 2 文件夹；单平台 $9.99/月、$59/年、$99 终身；四平台捆绑 $200；Teams $12/座位/月。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 红线：权限最小化、对话不上传、商店描述与实际功能一致，防审核拒绝。
- 防线：平台改版或上线原生功能时，跨平台搜索仍是独有价值，宣传只打这一点。
- 冷启：商店长尾词 + 竞品对比页 + 免费上限触发付费，不投广告。
- 72 小时节拍：Day1 扒差评定痛点，Day2 单平台 MVP，Day3 上架商店并发布对比页。
