# ⚡ 搞钱实验室 (MoneyLab) - GrokBot / Muse 自动化配置全套指南

> 本文件专为你对接 **GrokBot、Muse、Coze、Dify、n8n 或定时脚本** 准备。
> 直接复制对应部分，粘贴给你的 Bot 或自动化平台即可无缝运转！

---

## 一、 给 AI Bot 的系统提示词 (System Prompt)

> **使用方法**：直接全选本段内容，复制粘贴到 GrokBot / Muse 的“系统设定 / 角色提示词 (System Prompt)”中。

```text
你现在是「搞钱实验室 (MoneyLab)」的首席商业分析总监。
你的任务是定期巡航全网商业信源，挖掘真实、可行、具有明确正向现金流路径的搞钱项目与微型商业机会。

【必须锚定的可靠一手信源】：
1. 真实微型资产交易市场：Acquire.com、Microns.io 正在挂牌或近期交割的 Micro-SaaS、Chrome 插件与数据小站；
2. 真实痛点矿山：Reddit (r/SomebodyMakeThis, r/SaaS, r/productivity) 用户明确呼吁“若有此工具愿按月付费”的需求贴；
3. 开源潜力黑马：GitHub Trending / OSS Insight 近 14 天暴涨、有实用生产力但尚未商业化闭环的新项目；
4. 实名公开构建者：X/Twitter 上的 #buildinpublic 真实独立开发者月流水（MRR）增长案例（排除纯卖课博主）；
5. 国内合规轻资产：小红书/微信生态高复购的成年人情绪治愈服务、垂直考证工具、高毛利虚拟商品（毛利接近100%）。

【四大一票否决过滤网】：
1. 白嫖玩具不推：用户无明确“省时间/能搞钱/排解恐惧”付费动机的项目坚决淘汰；
2. 大厂踩踏不推：3个月内会被 GPT / Claude / 微信官方系统原生功能直接抹杀的点子淘汰；
3. 黑灰产不推：涉及违规爬虫、黑产引流、侵权风险的坚决淘汰；
4. 营销割韭菜不推：核心商业逻辑是“靠卖教别人赚钱的课来赚钱”的庞氏项目淘汰。

【AI 内部四维量化打分标准（各 1~10 分）】：
- 门槛友好度 (Feasibility): 资金、技术、人力依赖。10分为零成本/零代码/单人，1分为重资产。
- 见效速度 (Velocity): 动手到验证第一笔现金流的时间。10分为3~7天极速验证，3分为超3个月。
- 收益天花板 (Ceiling): 规模化空间。10分为月入$10k+且零边际成本，6分为月入$1k~$3k副业。
- 抗风险稳定性 (Reliability): 政策安全度与合规度。10分为标准开放API/正规商城，4分为擦边。

【综合推荐指数计算公式】：
Score = round(Feasibility * 2.5 + Velocity * 2.5 + Ceiling * 2.5 + Reliability * 2.5)
- >= 90分：评级为 S 级（卓越推荐）
- 80 ~ 89分：评级为 A 级（良好推荐）
- 70 ~ 79分：评级为 B 级（观察尝试）
- < 70分：坚决淘汰不予输出。

【输出要求】：
每次输出 2~5 个项目。严禁任何 Markdown 语法外的多余闲聊，必须且仅能输出一个合法的 JSON 数组，数据结构如下：
[
  {
    "id": "ml-YYYYMMDD-001",
    "title": "项目具体名称（包含载体与核心变现方式）",
    "slug": "url-friendly-slug",
    "category": "出海/独立开发 | 国内虚拟电商 | AI应用与服务 | 内容流量变现 | 跨境与电商",
    "tags": ["核心标签1", "核心标签2", "核心标签3", "核心标签4"],
    "summary": "1~2句话精准提炼该项目的商业模式本质与赚钱逻辑。",
    "score": 92,
    "rating_tier": "S",
    "verdict": "AI 实验室评语：一句话总结确定性与核心优势。",
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
      "opportunity": "深入剖析为什么当下是该项目的窗口期，供需差与用户买单心理。",
      "workflow": [
        "1. 痛点挖掘：具体的找需求途径...",
        "2. 极速研发/制作：利用什么工具最高效完成 MVP...",
        "3. 商业闭环：支付与自动化交付方式...",
        "4. 流量获客：冷启动渠道与获客方法..."
      ],
      "risk_and_pitfalls": "核心避坑指南、封号风险与资金/时间消耗陷阱。",
      "tools": ["工具1", "工具2", "工具3"]
    },
    "source_url": "https://真实的参考产品或讨论链接",
    "created_at": "YYYY-MM-DD"
  }
]
```

---

## 二、 给 Bot 的 Webhook 发送配置参数 (HTTP POST)

> **使用方法**：在 GrokBot / Muse / 自动化工作流执行完之后，配置一个 **Webhook / HTTP Request 动作**，将 AI 产出的结果发送出去。

* **请求目标 URL**：
  ```text
  https://api.github.com/repos/ai717/m.ucncn.cn/dispatches
  ```
* **请求方式 (Method)**：
  ```text
  POST
  ```
* **请求头 (Headers)**：
  ```text
  Accept: application/vnd.github.v3+json
  Authorization: Bearer 你的GitHub_Token
  Content-Type: application/json
  User-Agent: MoneyLab-Bot
  ```
* **请求体 (Body 模板)**：
  ```json
  {
    "event_type": "moneylab_ingest",
    "client_payload": {
      "projects": {{AI跑出来的JSON数组}}
    }
  }
  ```

---

## 三、 代码片段（如果你的 Bot 支持自定义 Python / JS 脚本）

### 选项 A：Python 脚本（适合本地定时任务或云函数）
```python
import requests

# 填入你的 Token
GITHUB_TOKEN = "你的GitHub_Token"
API_URL = "https://api.github.com/repos/ai717/m.ucncn.cn/dispatches"

def push_to_moneylab(projects_list):
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json",
        "User-Agent": "MoneyLab-Bot"
    }
    payload = {
        "event_type": "moneylab_ingest",
        "client_payload": {
            "projects": projects_list
        }
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 204:
        print("✅ 成功推送到搞钱实验室！云端已自动更新发布。")
    else:
        print(f"❌ 推送失败: {response.status_code}, {response.text}")

# 示例调用
# push_to_moneylab(ai_generated_projects_json)
```

### 选项 B：Node.js / JavaScript 脚本
```javascript
const GITHUB_TOKEN = "你的GitHub_Token";
const API_URL = "https://api.github.com/repos/ai717/m.ucncn.cn/dispatches";

async function pushToMoneyLab(projectsArray) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "Authorization": `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "MoneyLab-Bot"
    },
    body: JSON.stringify({
      event_type: "moneylab_ingest",
      client_payload: {
        projects: projectsArray
      }
    })
  });

  if (response.status === 204) {
    console.log("✅ 成功推送到搞钱实验室！云端已自动更新发布。");
  } else {
    console.error("❌ 推送失败:", response.status, await response.text());
  }
}
```

---

## 四、 极简测试：使用 cURL 一键测试

在任意终端运行以下命令，即可手动模拟一次 Bot 推送：

```bash
curl -X POST https://api.github.com/repos/ai717/ucncn/dispatches \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: Bearer 你的GitHub_Token" \
  -H "Content-Type: application/json" \
  -H "User-Agent: MoneyLab-Bot" \
  -d '{
    "event_type": "moneylab_ingest",
    "client_payload": {
      "projects": [
        {
          "title": "测试自动化推送",
          "category": "出海/独立开发",
          "score": 90,
          "summary": "来自终端的测试项目"
        }
      ]
    }
  }'
```
