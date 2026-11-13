---
name: "headroom-context-saver-desktop"
description: "专为【Headroom 式 AI 编程上下文压缩桌面应用】定制的生产级商业操盘 Agent 技能包。内置 100% 契合该商业原型的核心源码脚手架、工业级 Prompt、变现物料与 72 小时 MVP 落地节拍器。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Headroom 式 AI 编程上下文压缩桌面应用

> **资产级别**: MoneyLab Institutional Grade (Tier B · 70 分)
> **商业定位**: 把难装的开源上下文压缩引擎打包成一键安装的桌面应用，帮 Claude Code / Codex 用户省 token，按订阅收费。原版 2026 年 4 月 1 日上线，单人维护，2026 年 10 月 25 日 MRR $2,025、222 个订阅，累计收入 $12,111（TrustMRR 从 Polar 支付数据核验，A 级证据）。
> **原型**: B（客户端实用工具）——零服务器成本，卖“装好就能用”+ 节省量看板。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)

你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：

- 💻 [模式 A：极速工程落地]：提供 Headroom 式桌面应用的核心代码与架构脚手架（Tauri 壳 + 本地代理 + 压缩引擎接入）；
- 🔍 [模式 B：选品与痛点诊断]：剖析 Claude Code / Codex 用户在 token 用量上限、压缩引擎安装门槛上的 2~3 星真实差评与刚需；
- 🛡️ [模式 C：合规与安全防线]：开源许可证合规（Apache 2.0 / MIT）、原作者授权、Anthropic 与 OpenAI 平台依赖风险与免责声明；
- 📈 [模式 D：商业转化与冷启动]：提供 1 份针对 AI 编程助手用户的即用破冰成交物料（节省量实测报告模板）。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)

### 一手信源背景

- **原版产品**：Headroom 桌面应用（Garm Tech B.V.，荷兰，阿姆斯特丹商会号 99602075），创始人 Garm Lucassen 单人维护；压缩引擎 Headroom CLI 由 Tejas Chopra 开源（Apache 2.0，GitHub 7.7 万星）；桌面应用代码 MIT 开源。
- **验证周期**：2026 年 4 月 1 日 v1 上线；TrustMRR 从 Polar 支付数据核验：6 月 $2,540、7 月 $2,251、8 月 $1,542、9 月 $2,284、10 月前 25 天 $2,620；10 月 25 日 MRR $2,025（222 订阅，户均约 $9.12/月），累计 $12,111；近 30 天 MRR 增长 +43.4%。
- **定价**：档位对标用户已付的 AI 套餐（Pro 档 $3~$4/月，Max x5 / Max x20 档更高）；AppSumo 终身买断 2026 年 9 月上线。
- **获客**：官网约 25 篇 Claude Code / Codex 成本类 SEO 文章，30 天 Google 搜索曝光 91,453 次；Reddit、Hacker News、Product Hunt 曝光。

### 真实漏斗精算（复制者稳态月度模型）

| 环节 | 数字 | 说明 |
| --- | --- | --- |
| 官网月访问 | 8,000~15,000 | SEO 文章 + 社区帖引流 |
| 免费下载转化率 | 8%~12% | 一键安装降低门槛 |
| 免费→付费转化率 | 4%~6% | 看板让省钱看得见才转化 |
| 月新增付费订阅 | 25~90 | 冷启动期取低值 |
| 户均月费 | $9 | Pro 与 Max 档混合 |
| 稳态 MRR | $800~$3,000 | 复制者 6~12 个月目标 |
| 月流失率 | 6%~10% | 平台功能变动会放大流失 |
| 月度成本 | $20~$80 | Polar 手续费 + 域名 + 签名证书摊销 |
| 净利润率 | 约 85%~92% | 零推理成本、无服务器成本 |

> **校准红线**：别拿原版 $2,025 MRR 当复制者起点。原版有 7.7 万星引擎背书与半年 SEO 积累；复制者前 3 个月 MRR 能到 $300~$800 已是合格线。

---

## 💻 模块三：生产级极简核心工程源码

【硬性门禁】：以下为真实、可用、可直接复制运行的完整核心代码（Python 3 标准库，零依赖）。它实现 Headroom 压缩管线的核心：对 Claude Code / Codex 工具输出做 JSON 压缩、日志去重截断，并实测 token 节省量。桌面壳（Tauri + Rust 代理）见架构说明，压缩逻辑即本脚本。

```python
#!/usr/bin/env python3
"""headroom_compressor.py - Headroom 式上下文压缩核心（可直接运行）.

用法: python3 headroom_compressor.py
对一段模拟的 Claude Code 工具输出做压缩，打印压缩前后体积与预估节省 token 数。
token 估算按经验值 1 token ≈ 4 个字符。
"""
import json
import re

MAX_LOG_LINES = 40          # 单条日志最多保留行数
MAX_JSON_DEPTH_CHARS = 800  # 单个 JSON 值过长时截断


def estimate_tokens(text: str) -> int:
    """粗估 token 数：英文约 4 字符 1 token，中文约 1.5 字符 1 token。"""
    ascii_chars = sum(1 for c in text if ord(c) < 128)
    other_chars = len(text) - ascii_chars
    return max(1, ascii_chars // 4 + int(other_chars / 1.5))


def _truncate_long_strings(obj, limit=MAX_JSON_DEPTH_CHARS):
    if isinstance(obj, str):
        return obj if len(obj) <= limit else obj[:limit] + f"...[truncated {len(obj) - limit} chars]"
    if isinstance(obj, list):
        return [_truncate_long_strings(v, limit) for v in obj]
    if isinstance(obj, dict):
        return {k: _truncate_long_strings(v, limit) for k, v in obj.items()}
    return obj


def compress_json_block(text: str) -> str:
    """把文本里的 JSON 块压成紧凑格式并截断超长字符串。"""
    def _replace(match):
        try:
            data = json.loads(match.group(0))
            data = _truncate_long_strings(data)
            return json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        except json.JSONDecodeError:
            return match.group(0)
    return re.sub(r"\{[\s\S]*?\n\}", _replace, text)


def compress_log_block(text: str) -> str:
    """日志去重：连续重复行折叠，超长日志只留头尾。"""
    lines = text.splitlines()
    out = []
    prev, run = None, 0
    for line in lines:
        if line == prev:
            run += 1
            continue
        if run > 1:
            out.append(f"[x{run} repeated lines collapsed]")
        out.append(line)
        prev, run = line, 1
    if run > 1:
        out.append(f"[x{run} repeated lines collapsed]")
    if len(out) > MAX_LOG_LINES:
        head = out[:MAX_LOG_LINES // 2]
        tail = out[-MAX_LOG_LINES // 2:]
        out = head + [f"[... {len(out) - MAX_LOG_LINES} log lines omitted ...]"] + tail
    return "\n".join(out)


def compress_tool_output(text: str) -> str:
    """压缩入口：先压 JSON，再压日志。"""
    return compress_log_block(compress_json_block(text))


SAMPLE_TOOL_OUTPUT = """{"tool": "bash", "command": "npm test", "output": {"status": "passed", "tests": 128, "duration_ms": 3420, "details": {"coverage": {"lines": 0.87, "branches": 0.71, "note": "coverage report generated at 2026-11-13T10:00:00Z, see full html report for per-file breakdown and uncovered line numbers across all 42 source files in the project tree"}}}
[INFO] 2026-11-13 10:00:01 starting build
[INFO] 2026-11-13 10:00:01 starting build
[INFO] 2026-11-13 10:00:01 starting build
[INFO] 2026-11-13 10:00:02 bundling 42 modules
[INFO] 2026-11-13 10:00:02 bundling 42 modules
[INFO] 2026-11-13 10:00:03 done in 2.4s
""" + "\n".join(f"[DEBUG] heartbeat {i} ok" for i in range(60))


def main() -> None:
    before = SAMPLE_TOOL_OUTPUT
    after = compress_tool_output(before)
    t_before = estimate_tokens(before)
    t_after = estimate_tokens(after)
    saved = t_before - t_after
    print(f"压缩前: {len(before)} 字符, 约 {t_before} tokens")
    print(f"压缩后: {len(after)} 字符, 约 {t_after} tokens")
    print(f"节省: 约 {saved} tokens ({saved / t_before:.1%})")
    print("--- 压缩后内容 ---")
    print(after)
    assert saved > 0, "压缩必须省出 token"
    assert "repeated lines collapsed" in after, "日志去重必须生效"
    print("OK: 压缩管线跑通")


if __name__ == "__main__":
    main()
```

**架构说明（Tauri 壳 + 本地代理，不含未验证代码）**：Tauri 做轻量桌面壳（几 MB）；Rust 拦截代理监听本地 6767 端口，Python 后端监听 6768 端口跑压缩引擎；安装时自动在 Claude Code 配置与 Codex 配置里写代理块并备份原文件，卸载时完整还原；订阅走 Polar，匿名用量走 Aptabase。先跑通上面这个压缩核心，再套壳。

---

## 🎯 模块四：行业特化型 Prompt 编排链

### 节省量实测报告 Prompt（给用户生成破冰物料）

```text
你是一名 Claude Code 重度用户。请根据以下 7 天真实使用数据，写一份 300 字以内的节省量实测报告：
- 工具：Claude Code Pro（$20/月）+ Headroom 桌面应用
- 数据：7 天共 42 个会话，压缩前约 1,240,000 tokens，压缩后约 780,000 tokens
- 要求：只写实测数字，不写“最高可省 50%”这类基准承诺；写清测试条件（项目类型、工具输出以日志与 JSON 为主）；结尾给一个可复现的验证方法；语气像开发者手记，不像广告。
```

### SEO 文章选题链（25 篇矩阵，按此顺序写）

1. Claude Code 用量上限全解析：5 小时窗口与每周上限到底怎么算
2. Codex 套餐对比：Plus 与 Pro 用户分别适合哪档压缩工具
3. 实测：一个真实项目 7 天省了多少 token（附方法）
4. Headroom CLI 与桌面版的区别：什么人值得付费
5. 5 款省 token 工具横评：只比实测，不比宣传

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP

### 合规红线

1. **许可证**：压缩引擎 Apache 2.0，允许商用与二次分发，但必须保留版权与许可证声明；桌面应用自身代码 MIT 开源部分同样处理。
2. **原作者授权**：上线前必须拿到引擎作者的书面同意，并在官网每页署名、保留免费原路径（直接装 CLI 的教程链接不能藏起来）。
3. **平台依赖**：Anthropic / OpenAI 随时可能内置压缩。官网 FAQ 必须诚实写“省钱效果因项目而异”，别承诺固定节省比例；收入模型按“随时被官方覆盖”做压力测试。
4. **隐私**：代理跑在用户本地，工具输出不出本机；匿名用量统计必须可关闭，并在隐私政策写清。

### 冷启闭环（前 30 天）

1. 第 1~7 天：压缩核心跑通 + macOS 安装包可下载，找 5 个 Claude Code 用户内测，收集真实节省数据。
2. 第 8~14 天：发 3 篇 SEO 文章 + 1 篇 Hacker News 实测帖（只贴数字，不贴购买链接）。
3. 第 15~21 天：上 Product Hunt，同步开 AppSumo 终身买断（限量 200 份，只做冷启动）。
4. 第 22~30 天：把内测用户的节省数据做成看板截图，发 Reddit r/ClaudeCode 与 X，目标首批 10~50 个付费订阅，盯住 30 天续费率（低于 70% 立即回访找原因）。

> **一句话复盘**：Headroom 卖的不是算法，是“装好就能用 + 省钱看得见”。复制者真正的护城河是安装体验与节省量看板，不是压缩率。
