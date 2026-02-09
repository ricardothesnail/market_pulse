# 📊 Market Pulse - Daily Stock & Crypto Insights

A modern, engaging daily dashboard that aggregates the best stock and crypto market insights, curated with real-time data and technical analysis.

## Features

✨ **5 Dynamically Selected Stocks**
- AI-powered stock selection based on fundamentals and market trends
- Real-time price data and technical indicators
- Strength scores with detailed reasoning
- Automatic retention of strong performers

🚀 **Top 5 Trending Memecoins**
- Live trending memecoin data from CoinGecko
- RSI-based technical analysis
- Smart sell signals (STRONG_SELL, SELL, HOLD, BUY, STRONG_BUY)
- Risk warnings and volatility metrics

📰 **Curated Market News & Insights**
- Aggregated financial news from multiple sources
- Your takes on market implications
- Sentiment analysis (Bullish/Neutral/Bearish)
- Direct links to full articles

⏰ **Automatic Daily Updates**
- Runs every weekday at 9:00 AM ET (market open)
- GitHub Actions automation
- Auto-deploys to Vercel
- No manual intervention needed

🎨 **Clean Modern Design**
- Professional yet engaging UI
- Real-time market data visualization
- Mobile-responsive layout
- Fun gradient headers with intuitive color coding

## Tech Stack

- **Frontend:** Next.js 14, React 19, TypeScript
- **Styling:** Tailwind CSS with custom theme
- **Data Sources:** 
  - CoinGecko API (trending memecoins)
  - Alpha Vantage API (stock data)
  - NewsAPI (financial news)
- **Deployment:** Vercel (auto-deploy on updates)
- **Automation:** GitHub Actions (daily data refresh)

## Color Scheme

```
Primary:    #0F172A (Deep blue-black - professional)
Secondary:  #3B82F6 (Bright blue - action)
Accent:     #10B981 (Emerald green - gains/positive)
Warning:    #F59E0B (Amber - sell signals)
Danger:     #EF4444 (Red - losses)
Background: #F8FAFC (Soft light gray)
```

## Setup & Deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo>
   cd market-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Keys** (Free tiers available)
   - Alpha Vantage: https://www.alphavantage.co/
   - NewsAPI: https://newsapi.org/
   - CoinGecko: No key needed (free)

4. **Create `.env.local`**
   ```
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

### Deploy to Vercel

1. **Push to GitHub** (if not already)
2. **Go to Vercel:** https://vercel.com/new
3. **Import your repository**
4. **Add environment variables:**
   - `NEXT_PUBLIC_NEWS_API_KEY`
   - `ALPHA_VANTAGE_API_KEY`
5. **Deploy!** Vercel will auto-deploy on every push

### Setup GitHub Actions (Auto-Updates)

1. **Add secrets to GitHub:**
   - Go to Settings → Secrets and variables → Actions
   - Add:
     - `ALPHA_VANTAGE_API_KEY`
     - `NEWS_API_KEY`
     - `VERCEL_TOKEN` (from Vercel dashboard)

2. **The workflow is pre-configured to:**
   - Run every weekday at 9:00 AM ET
   - Fetch latest market data
   - Update JSON data files
   - Commit changes to repo
   - Auto-deploy to Vercel

## File Structure

```
market-pulse/
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles + theme
├── components/
│   ├── StockCard.tsx         # Stock display component
│   ├── MemeCard.tsx          # Memecoin display component
│   ├── NewsCard.tsx          # News item component
│   └── Header.tsx            # Header with last update
├── lib/
│   ├── api-clients.ts        # API fetch functions
│   ├── indicators.ts         # RSI, MACD calculations
│   └── analysis.ts           # Stock selection logic
├── data/
│   ├── stocks-portfolio.json # Current stock picks + history
│   ├── market-notes.json     # Daily insights & takes
│   ├── memecoins.json        # Latest memecoin data
│   └── latest-news.json      # Latest news cache
├── scripts/
│   └── update-market-data.js # Daily update script
├── .github/workflows/
│   └── daily-update.yml      # GitHub Actions automation
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## How Stock Selection Works

The system automatically evaluates stocks based on:

1. **Fundamentals**
   - P/E ratio (lower is better, but context-dependent)
   - Growth rate (YoY earnings/revenue growth)
   - Market cap (mega-cap stability)
   - 52-week highs/lows (momentum)

2. **Market Trends**
   - Sector rotation (AI, finance, healthcare, etc.)
   - Recent news and catalyst events
   - Relative strength vs. market

3. **Retention Logic**
   - Stocks with strength score ≥ 7.5 are automatically kept
   - Only replaces if a significantly better candidate emerges
   - Logs all decisions to portfolio history

4. **Your Analysis**
   - Brief reasoning for each pick
   - Market context and catalysts
   - Clear explanation of why this stock matters now

## Memecoin Analysis

**RSI (Relative Strength Index)**
- > 70: Overbought (SELL signals)
- 30-70: Neutral (HOLD)
- < 30: Oversold (BUY signals)

**Sell Signals**
- **STRONG_SELL:** RSI > 80 (extreme overbought)
- **SELL:** RSI > 70 AND price up > 20% in 24h
- **BUY:** RSI < 30 OR price down > 20% in 24h
- **STRONG_BUY:** RSI < 30
- **HOLD:** All else

## Manual Stock Updates

Want to update stocks manually? Edit `data/stocks-portfolio.json`:

```json
{
  "stocks": [
    {
      "symbol": "NVDA",
      "name": "NVIDIA",
      "addedDate": "2026-02-08",
      "lastReviewDate": "2026-02-08",
      "reason": "Your analysis here",
      "strength": 9.5,
      "fundamentals": {
        "pe_ratio": 72.5,
        "growth_rate": 35,
        "market_cap": 3200000000000,
        "52w_high": 135,
        "52w_low": 65
      }
    }
  ],
  "history": []
}
```

## Adding Custom News Takes

Edit `data/market-notes.json` to add your daily insights:

```json
{
  "dailyInsights": [
    {
      "date": "2026-02-08",
      "marketOverview": "Your overview here",
      "topNews": [
        {
          "title": "Article Title",
          "source": "Source Name",
          "url": "https://...",
          "insight": "Your take on what this means",
          "sentiment": "bullish"
        }
      ]
    }
  ]
}
```

## Customization

### Change Update Time
Edit `.github/workflows/daily-update.yml`:
```yaml
- cron: '0 14 * * 1-5'  # Change to your preferred time (UTC)
```

### Change Color Scheme
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#your-color',
  secondary: '#your-color',
  // ... etc
}
```

### Adjust Stock Retention Threshold
Edit `lib/analysis.ts`:
```ts
export function shouldKeepStock(strength: number, minStrength: number = 7.5): boolean {
  return strength >= minStrength  // Change 7.5 to your preference
}
```

## Environment Variables

| Variable | Required | Source |
|----------|----------|--------|
| `NEXT_PUBLIC_NEWS_API_KEY` | No | https://newsapi.org/ |
| `ALPHA_VANTAGE_API_KEY` | Yes | https://www.alphavantage.co/ |
| `VERCEL_TOKEN` | Yes (for auto-deploy) | Vercel dashboard |

## Troubleshooting

### No data showing up?
1. Check API keys are correct
2. Verify rate limits haven't been hit
3. Check GitHub Actions logs
4. Manually run: `npm run update-market-data`

### Stocks not updating?
1. Check `data/stocks-portfolio.json` exists
2. Verify Alpha Vantage API key is valid
3. Run script manually: `node scripts/update-market-data.js`

### News not showing?
1. `NEXT_PUBLIC_NEWS_API_KEY` must be set
2. NewsAPI free tier: max 100 requests/day
3. Check network tab for API errors

## Performance Notes

- Free APIs have rate limits (handled in scripts)
- Alpha Vantage: 5 requests/min (free tier)
- CoinGecko: 10-50 calls/min (free)
- NewsAPI: 100/day (free tier)

For production with higher traffic, upgrade to paid plans.

## Disclaimer

This is for informational purposes only. Not financial advice. Always do your own research and consult with a financial advisor before making investment decisions. Past performance does not guarantee future results.

## License

MIT

## Support

For issues, questions, or feature requests, open an issue on GitHub or check the documentation.

---

**Happy investing! 📈**

Built with ❤️ for market enthusiasts who want to stay informed without the noise.
