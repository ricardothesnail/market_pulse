# Market Pulse - Deployment Checklist

Complete this checklist to deploy your live Market Pulse dashboard.

## Pre-Deployment (Do These First)

- [ ] All source code is at `/Users/rennie/market-pulse`
- [ ] `npm run build` completes successfully
- [ ] `npm run dev` runs without errors locally
- [ ] You've reviewed the design (visit http://localhost:3000)
- [ ] You've customized the 5 stocks in `data/stocks-portfolio.json`
- [ ] You've added at least one insight to `data/market-notes.json`

## API Setup (5 minutes)

- [ ] **Alpha Vantage API Key**
  - [ ] Go to https://www.alphavantage.co/
  - [ ] Sign up for free account
  - [ ] Click "GET FREE API KEY"
  - [ ] Copy and save your API key
  - [ ] Add to `.env.local`: `ALPHA_VANTAGE_API_KEY=your_key_here`

- [ ] **NewsAPI Key** (Optional but recommended)
  - [ ] Go to https://newsapi.org/
  - [ ] Sign up for free account
  - [ ] Get your API key
  - [ ] Copy and save your API key
  - [ ] Add to `.env.local`: `NEXT_PUBLIC_NEWS_API_KEY=your_key_here`

- [ ] **Vercel Token** (For GitHub Actions)
  - [ ] Go to https://vercel.com/account/tokens
  - [ ] Create new token (name: `VERCEL_TOKEN`)
  - [ ] Copy and save the token
  - [ ] You'll add this to GitHub Secrets

## GitHub Setup (5 minutes)

- [ ] **Create GitHub Repository**
  - [ ] Go to https://github.com/new
  - [ ] Name: `market-pulse`
  - [ ] Description: "Daily stock and crypto market dashboard"
  - [ ] Make it **Public** (for free Vercel deployment)
  - [ ] Click "Create repository"

- [ ] **Push Code to GitHub**
  ```bash
  cd /Users/rennie/market-pulse
  git init
  git add .
  git commit -m "Initial Market Pulse dashboard"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/market-pulse.git
  git push -u origin main
  ```
  - [ ] Code pushed successfully
  - [ ] Verify on GitHub.com that all files are there

- [ ] **Add GitHub Secrets** (for automated updates)
  - [ ] Go to your repo → Settings → Secrets and variables → Actions
  - [ ] Click "New repository secret"
  - [ ] Add `ALPHA_VANTAGE_API_KEY` = your API key
  - [ ] Add `NEWS_API_KEY` = your API key (if you got one)
  - [ ] Add `VERCEL_TOKEN` = your Vercel token
  - [ ] All 3 secrets added and visible

## Vercel Deployment (5 minutes)

- [ ] **Deploy to Vercel**
  - [ ] Go to https://vercel.com/new
  - [ ] Click "Continue with GitHub"
  - [ ] Authorize Vercel
  - [ ] Select `market-pulse` repository
  - [ ] Click "Import"

- [ ] **Configure Environment**
  - [ ] On the "Configure Project" page
  - [ ] Add environment variables:
    - [ ] `ALPHA_VANTAGE_API_KEY` = your key
    - [ ] `NEXT_PUBLIC_NEWS_API_KEY` = your key
  - [ ] Click "Deploy"

- [ ] **Deployment Complete**
  - [ ] Vercel shows "Congratulations" message
  - [ ] Site is now live at `market-pulse-xxx.vercel.app`
  - [ ] Click the URL to verify it loads
  - [ ] You should see the dashboard with mock data

## Post-Deployment (Next Steps)

- [ ] **Verify Live Site**
  - [ ] Visit your Vercel URL
  - [ ] Check that stocks are showing
  - [ ] Check that memecoins are showing
  - [ ] Check that news is showing
  - [ ] Click on a news link (should open in new tab)

- [ ] **Check GitHub Actions** (Wait ~5 minutes after deployment)
  - [ ] Go to your repo → Actions tab
  - [ ] Look for "Daily Market Update" workflow
  - [ ] It should show green checkmarks for completed runs
  - [ ] If it failed, check the logs for errors

- [ ] **Setup Custom Domain** (Optional)
  - [ ] Go to Vercel Dashboard → Settings → Domains
  - [ ] Add your custom domain if you have one
  - [ ] Follow DNS setup instructions

- [ ] **Test Automatic Updates** (Optional, wait until tomorrow at 9 AM)
  - [ ] Check back tomorrow at 9:00 AM ET
  - [ ] Data should have updated automatically
  - [ ] No manual work needed!

## Fine-Tuning (After Everything Works)

- [ ] **Customize Your Stocks**
  - [ ] Edit `data/stocks-portfolio.json`
  - [ ] Update the 5 stocks based on your analysis
  - [ ] Add your reasoning for each
  - [ ] Push changes to GitHub
  - [ ] Vercel auto-deploys (no manual deploy needed)

- [ ] **Add Daily Insights**
  - [ ] Edit `data/market-notes.json`
  - [ ] Add your market overview
  - [ ] Add insights for top news stories
  - [ ] Set sentiment (bullish/neutral/bearish)
  - [ ] Push to GitHub
  - [ ] Site updates automatically

- [ ] **Adjust Colors** (If desired)
  - [ ] Edit `tailwind.config.js`
  - [ ] Change primary, secondary, accent colors
  - [ ] Push to GitHub
  - [ ] Vercel rebuilds and deploys

- [ ] **Change Update Time** (If desired)
  - [ ] Edit `.github/workflows/daily-update.yml`
  - [ ] Change the cron schedule
  - [ ] Push to GitHub
  - [ ] New schedule takes effect

## Ongoing Maintenance

### Daily (Takes 2 minutes)
- [ ] Check your dashboard in the morning
- [ ] Review auto-updated data
- [ ] (Optional) Add your daily market take to `market-notes.json`

### Weekly (Takes 5 minutes)
- [ ] Review the 5 stocks in portfolio
- [ ] Check if any should be replaced based on market trends
- [ ] Update `stocks-portfolio.json` if needed

### Monthly (Takes 10 minutes)
- [ ] Review GitHub Actions logs to ensure updates are running
- [ ] Check API usage (make sure you're not hitting limits)
- [ ] Look for any errors in Vercel logs
- [ ] Celebrate your automated dashboard! 🎉

### Quarterly (Takes 15 minutes)
- [ ] Review and update stock selections based on macro trends
- [ ] Consider if you need to upgrade any API plans
- [ ] Check your Vercel bandwidth usage
- [ ] Update documentation with any changes

## Troubleshooting Checklist

If things aren't working:

- [ ] **Build failed?**
  - [ ] Check GitHub Actions logs
  - [ ] Try `npm run build` locally
  - [ ] Check for TypeScript errors
  - [ ] Verify all API keys are in Vercel settings

- [ ] **No data showing?**
  - [ ] Check API keys are correct
  - [ ] Check API rate limits haven't been hit
  - [ ] Try `npm run update-market-data` manually
  - [ ] Check browser console for errors (F12)

- [ ] **GitHub Actions not running?**
  - [ ] Check workflow file is at `.github/workflows/daily-update.yml`
  - [ ] Check syntax is correct (YAML formatting)
  - [ ] Check secrets are added to GitHub
  - [ ] Check cron schedule is correct (should be `0 14 * * 1-5` for 9 AM ET)

- [ ] **Updates not appearing?**
  - [ ] Check GitHub Actions completed successfully
  - [ ] Check commit was pushed to GitHub
  - [ ] Check Vercel detected the push and redeployed
  - [ ] Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

## Success Criteria

You'll know everything is working when:

✅ Dashboard loads at your Vercel URL
✅ Shows 5 stocks with prices and changes
✅ Shows 5 memecoins with RSI and sell signals
✅ Shows financial news with your takes
✅ Data updates automatically at 9 AM ET (next weekday)
✅ No errors in browser console
✅ No errors in GitHub Actions logs
✅ No errors in Vercel deployments
✅ Friends can visit your URL and see the dashboard
✅ You feel proud of what you built 🚀

## Contact & Support

- **GitHub Issues:** Create issue in your repo for problems
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Actions:** https://docs.github.com/actions

---

## ✅ FINAL CHECKLIST

Before declaring success:

- [ ] Site is deployed and live on Vercel
- [ ] API keys are configured
- [ ] GitHub Actions workflow exists
- [ ] Dashboard shows real stock/crypto data
- [ ] News section is populated
- [ ] Mobile view looks good
- [ ] Tried the "Refresh Data" button (works)
- [ ] GitHub Actions has run at least once
- [ ] You've customized at least one stock
- [ ] You've added at least one market insight

**When all items are checked:** You're done! Your Market Pulse is live and running! 🎉

---

**Deployment completed on:** _____________ (date)

**Dashboard URL:** ________________________________

**Next update scheduled:** Every weekday at 9:00 AM ET (automatic)

Enjoy your new Market Pulse dashboard! 📊📈🚀
