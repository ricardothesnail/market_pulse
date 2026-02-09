'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import StockCard from '@/components/StockCard'
import MemeCard from '@/components/MemeCard'
import NewsCard from '@/components/NewsCard'
import { Zap } from 'lucide-react'

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  reason: string
  strength: number
}

interface Memecoin {
  symbol: string
  name: string
  price: number
  priceChange24h: number
  marketCap: string
  rsi: number
  sellSignal: string
  image?: string
}

interface NewsItem {
  title: string
  source: string
  url: string
  insight: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
}

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [memecoins, setMemecoins] = useState<Memecoin[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('Loading...')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // In a real app, these would fetch from your API endpoints
      // For now, we'll use mock data with my updated stock picks
      const mockStocks: Stock[] = [
        {
          symbol: 'MRVL',
          name: 'Marvell Technology',
          price: 92.45,
          change: 2.15,
          changePercent: 2.38,
          reason: 'Connected storage and high-speed data center semiconductors. AI infrastructure with less crowding. Customer consolidation tailwind.',
          strength: 9.1,
        },
        {
          symbol: 'DDOG',
          name: 'Datadog',
          price: 198.75,
          change: 4.2,
          changePercent: 2.16,
          reason: 'Cloud monitoring SaaS with 40%+ growth. Enterprise expansion loop. AI features driving new revenue. Operating leverage inflection.',
          strength: 8.8,
        },
        {
          symbol: 'CRWD',
          name: 'CrowdStrike Holdings',
          price: 385.60,
          change: 6.5,
          changePercent: 1.71,
          reason: 'Endpoint security consolidating enterprise stack. Zero-trust is mandatory. 120%+ NRR. Moving to platform winner.',
          strength: 8.6,
        },
        {
          symbol: 'NTRA',
          name: 'Natera Inc',
          price: 89.20,
          change: 3.1,
          changePercent: 3.59,
          reason: 'Genetic testing + liquid biopsy for cancer detection. TAM expanding as screening becomes standard care. Small-cap gem.',
          strength: 8.2,
        },
        {
          symbol: 'GILD',
          name: 'Gilead Sciences',
          price: 87.55,
          change: 1.2,
          changePercent: 1.39,
          reason: 'Biotech with proven cash flow. HIV/Hep C recurring revenue. New CAR-T pipeline. Dividend + buybacks. Value + growth hybrid.',
          strength: 7.9,
        },
      ]

      const mockMemecoins: Memecoin[] = [
        {
          symbol: 'PEPE',
          name: 'Pepe',
          price: 0.000003752,
          priceChange24h: -2.96,
          marketCap: '$1.55B',
          rsi: 45.2,
          sellSignal: 'HOLD',
        },
        {
          symbol: 'SHIB',
          name: 'Shiba Inu',
          price: 0.000006086,
          priceChange24h: -3.09,
          marketCap: '$3.59B',
          rsi: 38.5,
          sellSignal: 'BUY',
        },
        {
          symbol: 'DOGE',
          name: 'Dogecoin',
          price: 0.09591,
          priceChange24h: -2.26,
          marketCap: '$16.18B',
          rsi: 52.1,
          sellSignal: 'HOLD',
        },
        {
          symbol: 'FLOKI',
          name: 'Floki Inu',
          price: 0.000234,
          priceChange24h: 5.32,
          marketCap: '$245M',
          rsi: 68.7,
          sellSignal: 'SELL',
        },
        {
          symbol: 'WIF',
          name: 'dogwifhat',
          price: 0.287,
          priceChange24h: 12.45,
          marketCap: '$867M',
          rsi: 72.3,
          sellSignal: 'STRONG_SELL',
        },
      ]

      const mockNews: NewsItem[] = [
        {
          title: "Japan's Nikkei 225 crosses 57,000 for first time as Takaichi secures historic mandate",
          source: 'CNBC',
          url: 'https://www.cnbc.com/2026/02/09/japan-stocks-set-to-soar-after-takaichi-secures-historic-mandate.html',
          insight: 'Takaichi win signals policy stability in Japan. Could strengthen yen and affect US-Japan dynamics.',
          sentiment: 'bullish',
        },
        {
          title: 'Stock futures tick higher as markets await closely watched jobs, inflation reports',
          source: 'CNBC',
          url: 'https://www.cnbc.com/2026/02/08/stock-market-today-live-updates.html',
          insight: 'Market pricing in softer labor data. Watch employment figures—they drive Fed policy.',
          sentiment: 'neutral',
        },
        {
          title: 'Tech giants continue AI spending despite softening tech sector',
          source: 'CNBC',
          url: 'https://www.cnbc.com/2026/02/08/here-are-the-5-big-things-were-watching-in-the-stock-market-this-week.html',
          insight: 'NVIDIA/MSFT capex is structural, not cyclical. Supports our tech allocation.',
          sentiment: 'bullish',
        },
      ]

      setStocks(mockStocks)
      setMemecoins(mockMemecoins)
      setNews(mockNews)
      setLastUpdated(new Date().toLocaleString())
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary">
      <Header lastUpdated={lastUpdated} onRefresh={loadData} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stocks Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-accent-blue">📈 5 Emerging Stock Picks</h2>
            <span className="text-xs font-semibold bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full">
              High Conviction
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-96 bg-gradient-card border border-card rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stocks.map((stock) => (
                <StockCard key={stock.symbol} {...stock} />
              ))}
            </div>
          )}
        </section>

        {/* Memecoins Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-accent-cyan">🚀 Trending Memecoins</h2>
            <span className="text-xs font-semibold bg-accent-cyan/20 text-accent-cyan px-3 py-1 rounded-full">
              Volatile Assets
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-48 bg-gradient-card border border-card rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memecoins.map((coin) => (
                <MemeCard key={coin.symbol} {...coin} />
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-accent-orange/10 border border-accent-orange/30 rounded-lg">
            <div className="flex gap-2">
              <Zap size={20} className="text-accent-orange flex-shrink-0" />
              <div className="text-sm text-text-secondary">
                <strong>Memecoin Alert:</strong> These are highly volatile assets. Use RSI and sell signals as guides,
                not guarantees. Trade only what you can afford to lose.
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-accent-green">📰 Market Insights & Analysis</h2>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gradient-card border border-card rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((item, idx) => (
                <NewsCard key={idx} {...item} />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-card text-center text-text-muted text-sm">
          <p>Last updated: {lastUpdated}</p>
          <p className="mt-2">Market data updates daily at 9:00 AM ET</p>
          <p className="mt-4 text-xs text-text-muted/70">
            Disclaimer: For informational purposes only. Not financial advice. Always do your own research.
          </p>
        </footer>
      </main>
    </div>
  )
}
