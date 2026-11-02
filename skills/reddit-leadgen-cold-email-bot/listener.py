#!/usr/bin/env python3
"""
MoneyLab - Reddit Buying-Signal Listener (Production-Grade Scraper v2.0)
免复杂 API Key，直接监听公开流，具备自动去重、频控自愈与格式化落盘。
"""

import os
import time
import json
import random
import httpx
from datetime import datetime

# 核心监听目标社区
TARGET_SUBREDDITS = [
    "SaaS", "startups", "smallbusiness", "automation", "nocode"
]

# 高商业价值买意关键词 (支持大小写自适应)
INTENT_KEYWORDS = [
    "recommend", "alternative to", "looking for", "tired of", 
    "tool for", "software that", "willing to pay", "any app",
    "replace", "pricing is ridiculous", "waste hours"
]

# 负向过滤词 (命中即抛弃，去除招聘、学生求助等噪音)
NEGATIVE_KEYWORDS = [
    "[for hire]", "[hiring]", "portfolio", "homework", "free only", "tutorial"
]

# 随机 User-Agent 轮换池 (严格遵循 Reddit API 格式规范避免 429)
USER_AGENTS = [
    "python:com.moneylab.researcher.v1:2.0.0 (by /u/ml_scout_01)",
    "python:com.moneylab.analyst.flow:2.0.0 (by /u/ml_scout_02)",
    "python:com.moneylab.leadgen.bot:2.0.0 (by /u/ml_scout_03)"
]

def scan_subreddit(sub: str, seen_ids: set):
    url = f"https://www.reddit.com/r/{sub}/new.json?limit=25"
    headers = {"User-Agent": random.choice(USER_AGENTS)}
    
    try:
        response = httpx.get(url, headers=headers, timeout=12.0)
        
        # 频率风控处理 (自愈退避机制)
        if response.status_code == 429:
            retry_after = int(response.headers.get("retry-after", 15))
            print(f"⚠️ [429 频控警戒] r/{sub} 请求过频，休眠 {retry_after} 秒后恢复...")
            time.sleep(retry_after)
            return []
            
        if response.status_code != 200:
            print(f"❌ 抓取异常 r/{sub}: 状态码 {response.status_code}")
            return []

        data = response.json()
        children = data.get("data", {}).get("children", [])
        qualified_leads = []

        for item in children:
            post = item.get("data", {})
            post_id = post.get("id")
            
            if not post_id or post_id in seen_ids:
                continue
                
            title = post.get("title", "")
            selftext = post.get("selftext", "")
            full_content = f"{title} {selftext}".lower()

            # 负向词快速熔断
            if any(neg in full_content for neg in NEGATIVE_KEYWORDS):
                seen_ids.add(post_id)
                continue

            # 匹配正向购买信号
            matched = [kw for kw in INTENT_KEYWORDS if kw in full_content]
            if matched:
                seen_ids.add(post_id)
                lead_data = {
                    "id": post_id,
                    "subreddit": sub,
                    "title": title,
                    "author": post.get("author", "unknown"),
                    "url": f"https://reddit.com{post.get('permalink')}",
                    "created_utc": post.get("created_utc"),
                    "created_at_readable": datetime.fromtimestamp(post.get("created_utc", time.time())).strftime("%Y-%m-%d %H:%M:%S"),
                    "matched_keywords": matched,
                    "snippet": selftext[:300] + ("..." if len(selftext) > 300 else "")
                }
                qualified_leads.append(lead_data)

        return qualified_leads

    except Exception as e:
        print(f"❌ 抓取 r/{sub} 出现网络或解析异常: {e}")
        return []

def main():
    print("=" * 65)
    print("  ⚡ MoneyLab - Reddit 痛点自动化监听与清洗引擎启动 (v2.0.0)")
    print(f"  🎯 目标阵地: r/{', r/'.join(TARGET_SUBREDDITS)}")
    print(f"  📁 线索存储: ./leads.jsonl")
    print("=" * 65)

    seen_ids = set()
    
    # 启动时预读已存在的 leads 防止重启后重复记录
    if os.path.exists("leads.jsonl"):
        with open("leads.jsonl", "r", encoding="utf-8") as f:
            for line in f:
                try:
                    record = json.loads(line)
                    if "id" in record:
                        seen_ids.add(record["id"])
                except:
                    pass
        print(f"📦 已加载本地历史去重库: {len(seen_ids)} 条")

    while True:
        round_leads = 0
        for sub in TARGET_SUBREDDITS:
            leads = scan_subreddit(sub, seen_ids)
            for lead in leads:
                round_leads += 1
                print(f"\n🔥 [捕获高意向买点] r/{lead['subreddit']} | 触发词: {lead['matched_keywords']}")
                print(f"📌 标题: {lead['title']}")
                print(f"👤 作者: /u/{lead['author']} | 🔗: {lead['url']}")
                print(f"📝 痛点片段: {lead['snippet']}")
                
                # 持久化追加保存
                with open("leads.jsonl", "a", encoding="utf-8") as f:
                    f.write(json.dumps(lead, ensure_ascii=False) + "\n")
            
            # 单社区爬取间隔，模拟真人节奏
            time.sleep(random.uniform(2.5, 4.0))

        now_str = datetime.now().strftime("%H:%M:%S")
        print(f"\n💤 [{now_str}] 本轮扫描结束，捕获 {round_leads} 条新线索。等待 60 秒后进入下一轮...")
        time.sleep(60)

if __name__ == "__main__":
    main()
