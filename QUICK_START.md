# 🚀 Market Pulse - Quick Start Guide

## What You Got

A fully functional, production-ready daily stock and crypto market dashboard that:
- ✅ Updates automatically every weekday at 9 AM ET
- ✅ Shows 5 dynamically selected stocks with detailed analysis
- ✅ Tracks 5 trending memecoins with sell signals
- ✅ Aggregates financial news with your takes
- ✅ Has a clean, modern, engaging UI
- ✅ Deploys to Vercel with zero downtime

## Quick Setup (5 minutes)

### Step 1: Get API Keys (Free)

1. **Alpha Vantage** (Stock Data):
   - Go to https://www.alphavantage.co/
   - Click "Get Free API Key"
   - Copy your API key

2. **NewsAPI** (Financial News):
   - Go to https://newsapi.org/
   - Sign up for free
   - Copy your API key
   - Note: Free tier = 100 requests/day

3. **CoinGecko** (Memecoins):
   - No API key needed! Free tier works great

### Step 2: Deploy to Vercel

**Option A: Easiest (Recommended)**

1. Push your code to GitHub:
   ```bash
   cd /Users/rennie/market-pulse
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/market-pulse.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Click "Import a Git Repository"
4. Select your `market-pulse` repo
5. Add Environment Variables:
   - `ALPHA_VANTAGE_API_KEY` = your Alpha Vantage key
   - `NEXT_PUBLIC_NEWS_API_KEY` = your NewsAPI key
6. Click "Deploy"

Done! Your site is live at `your-project.vercel.app`

**Option B: Local Only**

1. Run locally:
   ```bash
   cd /Users/rennie/market-pulse
   npm run dev
   ```
2. Visit http://localhost:3000

### Step 3: Setup Auto-Updates (Optional but Recommended)

If you deployed to GitHub + Vercel:

1. Go to your Vercel Dashboard → Settings → Tokens
2. Create a new token (name: `VERCEL_TOKEN`)
3. Copy the token

4. Go to GitHub repo → Settings → Secrets and variables → Actions
5. Add these secrets:
   - `ALPHA_VANTAGE_API_KEY` = your Alpha Vantage key
   - `NEWS_API_KEY` = your NewsAPI key
   - `VERCEL_TOKEN` = the token from step 2

Now GitHub Actions will:
- Run every weekday at 9 AM ET
- Fetch latest market data
- Update your site automatically
- No maintenance needed!

## File Locations You Need to Know

```
/Users/rennie/market-pulse/

data/stocks-portfolio.json
  → Edit this to change the 5 stocks shown

data/market-notes.json
  → Edit this to add your daily insights & news takes

.env.local (create this file for local dev)
  → Add your API keys here for local testing
```

## Customizing Your Dashboard

### Change the 5 Stocks

Edit `data/stocks-portfolio.json`:

```json
{
  "stocks": [
    {
      "symbol": "NVDA",
      "name": "NVIDIA",
      "reason": "Your analysis here...",
      "strength": 9.5,
      "fundamentals": {
        "pe_ratio": 72.5,
        "growth_rate": 35,
        "market_cap": 3200000000000,
        "52w_high": 135,
        "52w_low": 65
      }
    }
  ]
}
```

Strength scale:
- 9-10: Excellent buy
- 7-8: Strong pick
- 5-6: Moderate
- <5: Weak / consider removing

### Add Your Daily Market Takes

Edit `data/market-notes.json`:

```json
{
  "dailyInsights": [
    {
      "date": "2026-02-08",
      "marketOverview": "Tech rotation continuing, labor market softening is key concern.",
      "topNews": [
        {
          "title": "Stock Article Title",
          "source": "CNBC",
          "url": "https://...",
          "insight": "Why this matters for the market...",
          "sentiment": "bullish"
        }
      ]
    }
  ]
}
```

Sentiment: `"bullish"` | `"neutral"` | `"bearish"`

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: '#0F172A',    // Deep blue-black
  secondary: '#3B82F6',  // Bright blue
  accent: '#10B981',     // Green (gains)
  warning: '#F59E0B',    // Amber (warnings)
  danger: '#EF4444',     // Red (losses)
}
```

### Change Daily Update Time

Edit `.github/workflows/daily-update.yml`:

```yaml
- cron: '0 14 * * 1-5'  # 14:00 UTC = 9 AM ET
```

Cron format: `minute hour day month dayOfWeek`

Examples:
- `0 13 * * 1-5` = 8 AM ET (weekdays)
- `30 16 * * 1-5` = 11:30 AM ET (weekdays)
- `0 20 * * *` = 3 PM ET (daily)

## Testing It Works

### Local Test

```bash
cd /Users/rennie/market-pulse

# Test development server
npm run dev
# Visit http://localhost:3000

# Test production build
npm run build
npm start
```

### Manual Data Update

```bash
npm run update-market-data
```

This fetches the latest stocks, memecoins, and news data.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"No data showing"** | Check API keys in `.env.local` or Vercel settings |
| **"Build fails"** | Run `npm install` again, then `npm run build` |
| **"Stocks not updating"** | Check GitHub Actions logs (Actions tab in repo) |
| **"API rate limit"** | Wait 1 minute, try again. Free tiers have limits |
| **"News not showing"** | Make sure `NEXT_PUBLIC_NEWS_API_KEY` is set |

## How the Data Pipeline Works

```
GitHub Actions (9 AM ET)
    ↓
Scripts/update-market-data.js (fetches live data)
    ↓
Updates data/ JSON files
    ↓
Commits to GitHub
    ↓
Vercel auto-deploys
    ↓
Your site is live with latest data!
```

## Cost

Everything is **completely free** 🎉

- **Vercel:** Free tier (up to 100GB bandwidth)
- **Alpha Vantage:** Free API (5 calls/min)
- **NewsAPI:** Free tier (100 requests/day)
- **CoinGecko:** Free (no API key needed)
- **GitHub Actions:** Free (2000 min/month)
- **GitHub:** Free (public repo)

## Pro Tips

1. **Use Heroku/Railway instead of Vercel?** Update `.github/workflows/daily-update.yml` to deploy to your platform

2. **Want more stocks?** Change the portfolio size in `data/stocks-portfolio.json`

3. **Want hourly updates instead of daily?** Change cron to `0 * * * 1-5` (every hour, weekdays)

4. **Want to track specific stocks?** Hard-code your list in `data/stocks-portfolio.json`

5. **Share with friends?** Just send them your Vercel URL!

## What Each Component Does

| Component | Purpose |
|-----------|---------|
| **Header** | Shows title, last update time, refresh button |
| **StockCard** | Displays one stock with price, change, strength score |
| **MemeCard** | Shows memecoin with RSI, sell signal |
| **NewsCard** | Links to news article with your insight |
| **Page** | Main dashboard combining all components |

## Next Steps

1. ✅ Deploy to Vercel (if not done)
2. ✅ Add API keys to Vercel
3. ✅ Set up GitHub Actions secrets
4. ✅ Customize your 5 stocks in `stocks-portfolio.json`
5. ✅ Add your first daily market take to `market-notes.json`
6. ✅ Push changes to GitHub
7. ✅ Watch it auto-update every day!

## Need Help?

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **GitHub Actions:** https://docs.github.com/en/actions
- **Vercel Docs:** https://vercel.com/docs
- **CoinGecko API:** https://www.coingecko.com/en/api/documentation
- **Alpha Vantage:** https://www.alphavantage.co/documentation/
- **NewsAPI:** https://newsapi.org/docs

---

**Enjoy your new Market Pulse dashboard! 📊**

Questions? Check the main README.md for more details.
