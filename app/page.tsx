'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
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
  colorGradient: string
  glowColor: string
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
      const mockStocks: Stock[] = [
        {
          symbol: 'MRVL',
          name: 'Marvell Technology',
          price: 92.45,
          change: 2.15,
          changePercent: 2.38,
          reason: 'Connected storage and high-speed data center semiconductors. AI infrastructure with less crowding.',
          strength: 9.1,
          colorGradient: 'gradient-joy-purple',
          glowColor: 'shadow-glow-purple',
        },
        {
          symbol: 'DDOG',
          name: 'Datadog',
          price: 198.75,
          change: 4.2,
          changePercent: 2.16,
          reason: 'Cloud monitoring SaaS with 40%+ growth. Enterprise expansion loop accelerating.',
          strength: 8.8,
          colorGradient: 'gradient-joy-blue',
          glowColor: 'shadow-glow-blue',
        },
        {
          symbol: 'CRWD',
          name: 'CrowdStrike Holdings',
          price: 385.60,
          change: 6.5,
          changePercent: 1.71,
          reason: 'Endpoint security consolidating enterprise stack. Zero-trust is now mandatory.',
          strength: 8.6,
          colorGradient: 'gradient-joy-cyan',
          glowColor: 'shadow-glow-cyan',
        },
        {
          symbol: 'NTRA',
          name: 'Natera Inc',
          price: 89.20,
          change: 3.1,
          changePercent: 3.59,
          reason: 'Genetic testing + liquid biopsy for cancer detection. TAM expanding rapidly.',
          strength: 8.2,
          colorGradient: 'gradient-joy-green',
          glowColor: 'shadow-glow-green',
        },
        {
          symbol: 'GILD',
          name: 'Gilead Sciences',
          price: 87.55,
          change: 1.2,
          changePercent: 1.39,
          reason: 'Biotech with proven cash flow. New CAR-T pipeline + dividend + buybacks.',
          strength: 7.9,
          colorGradient: 'gradient-joy-orange',
          glowColor: 'shadow-glow-orange',
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
      <Navigation lastUpdated={lastUpdated} onRefresh={loadData} />

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-7xl font-black mb-6 leading-tight">
            <span className="block text-joy-cyan">Discover</span>
            <span className="block text-joy-pink">High-Conviction</span>
            <span className="block text-joy-purple">Stock Picks</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Deep research into smaller, more interesting companies. Click into each for the full thesis, catalysts, and risks.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* Stock Gallery Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-black text-joy-cyan mb-12">My Top 5 Stock Picks</h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-96 bg-gradient-dark border-2 border-white/10 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stocks.map((stock) => (
                <StockCard key={stock.symbol} {...stock} />
              ))}
            </div>
          )}
        </section>

        {/* Memecoins Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-black text-joy-magenta mb-4">🚀 Trending Memecoins</h2>
          <p className="text-text-secondary mb-12">High volatility for high stakes. Check RSI and signals, but trade with caution.</p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-48 bg-gradient-dark border-2 border-white/10 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memecoins.map((coin) => (
                <MemeCard key={coin.symbol} {...coin} />
              ))}
            </div>
          )}

          <div className="mt-8 p-6 bg-gradient-to-r from-joy-orange/20 to-joy-pink/20 border-2 border-joy-orange rounded-xl">
            <div className="flex gap-3">
              <Zap size={24} className="text-joy-orange flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-secondary">
                <strong className="text-joy-orange">Memecoin Alert:</strong> These are highly volatile assets. Use RSI and sell signals as guides,
                not guarantees. Trade only what you can afford to lose.
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-black text-joy-green mb-4">📰 Market News & Insights</h2>
          <p className="text-text-secondary mb-12">Latest market developments with my analysis and sentiment signals.</p>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gradient-dark border-2 border-white/10 rounded-xl animate-pulse" />
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
        <footer className="py-12 border-t border-white/10 text-center">
          <div className="space-y-2 text-text-muted text-sm">
            <p>Last updated: {lastUpdated}</p>
            <p>Data refreshes automatically weekdays at 9:00 AM ET</p>
            <p className="text-xs text-text-muted/50 pt-4">
              Disclaimer: For informational purposes only. Not financial advice. Do your own research.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
