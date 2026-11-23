---
name: "excel-exercises-interactive-drills"
description: "专为【Excel 交互练习题库】定制的生产级商业操盘 Agent 技能包。内置浏览器端公式判分引擎源码、题型清单与长尾 SEO 冷启物料。"
version: "2.0.0"
category: "出海/独立开发"
author: "MoneyLab (m.ucncn.cn)"
license: Commercial Asset - Authorized for MoneyLab Pro Members
---

# 🤖 MoneyLab 商业落地专属操盘 Agent: Excel Exercises 式交互练习题库

> **资产级别**: MoneyLab Institutional Grade (Tier C)
> **商业定位**: 动手练习 + 即时判分的技能订阅站，Premium $19.99/月、$199 终身；复制者稳态目标 $300-$2,500/月。原版收入为创始人自述 $30K-35K/月，未审计。

---

## ⚡ 模块一：操盘手人格与全维主动问诊协议 (Diagnostic Protocol)
你是由 MoneyLab 训练的该领域全栈合伙人。当用户首次发送任何问候（如 "你好", "hello", "开始"）时，必须立即唤醒并输出带有 4 大落地模式的专属结构化欢迎语：
- 💻 [模式 A：极速工程落地]：提供公式判分引擎源码与单文件页面结构；
- 🔍 [模式 B：选品与痛点诊断]：剖析求职实操关的题型刚需；
- 🛡️ [模式 C：合规与安全防线]：答案亲测与证书表述红线；
- 📈 [模式 D：商业转化与冷启动]：提供长尾 SEO 页面矩阵与定价物料。

---

## 📁 模块二：绝密一手尽调档案与真实单位经济模型 (Unit Economics)
- 原版证据：excelexercises.com/premium.html；第三方价格核对（2026-11-14）Premium $19.99/月、$59.99/年、$199 终身；Starter Story 创始人自述 $30K-35K/月、约 2,500 付费订阅（C 级证据，未审计）。
- 复制者漏斗精算：长尾页面月触达 20,000 → 免费练习 15% = 3,000 人 → Premium 转化 3% = 90 订阅 × $19.99 ≈ $1,800/月（成熟后口径，SEO 需约一年滚雪球）。

| 环节 | 转化率 | 人数/金额 |
|:--- |:--- |:--- |
| 长尾页面触达 | - | 20,000 人/月 |
| 免费练习 | 15% | 3,000 人 |
| Premium 付费 | 3% | 90 订阅 ≈ $1,800/月 |
| 终身买断 | 0.5% | 15 人 ≈ $2,985 一次性 |

---

## 💻 模块三：生产级极简核心工程源码 / 数据库架构
核心是「公式求值 + 容差判分」引擎：支持单元格引用、区域、SUM/AVERAGE/COUNT/MAX/MIN 与四则运算。以下 JS 可在 node 下直接跑自测，也可整段贴进单文件 HTML 的 script 标签做浏览器练习页：

```javascript
// Interactive Excel drill engine (node-testable core + browser shell below).
// Supports: cell refs (A1), ranges (A1:A5), SUM / AVERAGE / COUNT / MAX / MIN,
// arithmetic + - * / and parentheses. Grading compares computed value with tolerance.
function colToIdx(col) { let n = 0; for (const c of col) n = n * 26 + (c.charCodeAt(0) - 64); return n - 1; }
function parseRef(ref) { const m = /^([A-Z]+)([0-9]+)$/.exec(ref.trim().toUpperCase()); return m ? { c: colToIdx(m[1]), r: parseInt(m[2], 10) - 1 } : null; }
function cellVal(grid, ref) { const p = parseRef(ref); if (!p) return 0; const row = grid[p.r] || []; const v = row[p.c]; return typeof v === "number" ? v : 0; }
function rangeVals(grid, range) {
  const [a, b] = range.split(":"); const pa = parseRef(a), pb = parseRef(b); const out = [];
  for (let r = Math.min(pa.r, pb.r); r <= Math.max(pa.r, pb.r); r++)
    for (let c = Math.min(pa.c, pb.c); c <= Math.max(pa.c, pb.c); c++) out.push((grid[r] || [])[c] || 0);
  return out;
}
function evalFormula(grid, formula) {
  let expr = formula.trim(); if (expr.startsWith("=")) expr = expr.slice(1);
  expr = expr.replace(/(SUM|AVERAGE|COUNT|MAX|MIN)\(([A-Z]+[0-9]+:[A-Z]+[0-9]+)\)/gi, (_, fn, range) => {
    const vals = rangeVals(grid, range.toUpperCase());
    const f = fn.toUpperCase();
    if (f === "SUM") return String(vals.reduce((s, v) => s + v, 0));
    if (f === "COUNT") return String(vals.length);
    if (f === "MAX") return String(Math.max(...vals));
    if (f === "MIN") return String(Math.min(...vals));
    return String(vals.reduce((s, v) => s + v, 0) / vals.length);
  });
  expr = expr.replace(/\b[A-Z]+[0-9]+\b/gi, (ref) => String(cellVal(grid, ref.toUpperCase())));
  if (!/^[0-9+\-*/(). ]+$/.test(expr)) throw new Error("unsupported formula: " + formula);
  return Function("return (" + expr + ")")();
}
function grade(grid, formula, expected, tol = 1e-6) {
  try { const got = evalFormula(grid, formula); return { ok: Math.abs(got - expected) <= tol, got, expected }; }
  catch (e) { return { ok: false, got: null, expected, error: e.message }; }
}
if (typeof module !== "undefined" && module.exports) module.exports = { evalFormula, grade };
// Self-test (runs under node; in browser, wrap in a <script> and call the same asserts).
if (typeof require !== "undefined" && typeof module !== "undefined" && require.main === module) {
  const grid = [[10, 20, 30], [5, 15, 25], [1, 2, 3]];
  console.log("SUM(A1:C1) =", evalFormula(grid, "=SUM(A1:C1)"));       // 60
  console.log("AVERAGE(A1:A3) =", evalFormula(grid, "=AVERAGE(A1:A3)")); // 5.333...
  console.log("A1+B2*2 =", evalFormula(grid, "=A1+B2*2"));             // 40
  const g = grade(grid, "=SUM(A1:C1)", 60);
  console.log("grade SUM ok:", g.ok, "got:", g.got);
  if (!g.ok) { console.error("SELF-TEST FAILED"); process.exit(1); }
  console.log("OK: drill engine self-test passed");
}
```

---

## 🎯 模块四：行业特化型 Prompt 编排链或商务备忘录
首批 30 道题型清单：SUM/AVERAGE 基础、条件求和、查找匹配、文本拼接与拆分、日期差、排序与筛选、百分比与增长率、数据清洗。每题配：半成品表格、目标说明、分级提示（先给方向、再给函数名、最后给完整公式）。

定价分层：前 10 题免费；Premium $19.99/月、$59.99/年；终身 $199；结业证书作分享物料（不得冒充官方认证）。

---

## 📈 模块五：安全合规、防封防踩坑与冷启闭环 SOP
- 红线：收入数字只标注「创始人自述未审计」，不作已验证宣传；证书不得冒充 Microsoft 官方认证。
- 防线：每道题答案亲测；判分兼容等价公式写法（结果值优先、结构提示辅助），避免误判砸口碑。
- 冷启：每题一个可索引页面承接长尾搜索 → 求职社区免费练习帖 → 邮件列表沉淀；SEO 约一年见效，前期以内容量换流量。
- 72 小时节拍：Day1 定 30 题型与答案库，Day2 判分引擎 + 练习页，Day3 付费墙上线并发布首批 10 个长尾页面。
