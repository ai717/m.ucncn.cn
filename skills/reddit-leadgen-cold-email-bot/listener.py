#!/usr/bin/env python3
"""
MoneyLab - Reddit Buying-Signal Listener (Zero-Token Scraper)
无需复杂 API Key，直接监听指定 Subreddit 的 /new.json
"""

import os
import time
import json
import httpx
from datetime import datetime

SUBREDDITS = ["SaaS", "startups", "smallbusiness", "automation"]
KEYWORDS = [
    "recommend", "alternative to", "looking for", "tired of", 
    "tool for", "software that", "willing to pay", "any app"
]
HEADERS = {
    "User-Agent": "python:com.moneylab.signal_listener:v1.0.0 (by /u/moneylab_researcher)"
}

def scan_subreddit(sub: str):
    url = f"https://www.reddit.com/r/{sub}/new.json?limit=25"
    try:
        response = httpx.get(url, headers=HEADERS, timeout=10.0)
        if response.status_code == 429:
            print(f"⚠️ [Rate Limit] r/{sub} 请求过频，暂停 10 秒...")
            time.sleep(10)
            return []
        if response.status_code != 200:
            print(f"❌ [Error] 无法获取 r/{sub}: 状态码 {response.status_code}")
            return []
            
        data = response.json()
        posts = data.get("data", {}).get("children", [])
        matched_leads = []

        for p in posts:
            item = p.get("data", {})
            title = item.get("title", "")
            selftext = item.get("selftext", "")
            full_text = f"{title} {selftext}".lower()
            
            matched_kw = [kw for kw in KEYWORDS if kw in full_text]
            if matched_kw:
                lead = {
                    "id": item.get("id"),
                    "subreddit": sub,
                    "title": title,
                    "author": item.get("author"),
                    "url": f"https://reddit.com{item.get('permalink')}",
                    "created_utc": item.get("created_utc"),
                    "matched_keywords": matched_kw,
                    "snippet": selftext[:280] + ("..." if len(selftext) > 280 else "")
                }
                matched_leads.append(lead)

        return matched_leads
    except Exception as e:
        print(f"❌ 抓取 r/{sub} 出现异常: {e}")
        return []

def main():
    print("=" * 60)
    print("  ⚡ MoneyLab - Reddit 痛点自动化监听引擎启动")
    print(f"  🎯 目标社区: {', '.join(SUBREDDITS)}")
    print("=" * 60)
    
    seen_ids = set()
    while True:
        for sub in SUBREDDITS:
            leads = scan_subreddit(sub)
            for lead in leads:
                if lead["id"] not in seen_ids:
                    seen_ids.add(lead["id"])
                    print(f"\n🔥 [发现高意向信号] r/{lead['subreddit']} | 触发词: {lead['matched_keywords']}")
                    print(f"📌 标题: {lead['title']}")
                    print(f"🔗 链接: {lead['url']}")
                    print(f"📝 摘要: {lead['snippet']}")
                    
                    with open("leads.jsonl", "a", encoding="utf-8") as f:
                        f.write(json.dumps(lead, ensure_ascii=False) + "\n")
            
            time.sleep(2.5)
            
        print(f"\n💤 完成一轮扫描，等待 60 秒后进行下一轮... ({datetime.now().strftime('%H:%M:%S')})")
        time.sleep(60)

if __name__ == "__main__":
    main()
