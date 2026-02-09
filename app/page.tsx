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
      // For now, we'll use mock data
      const mockStocks: Stock[] = [
        {
          symbol: 'NVDA',
          name: 'NVIDIA',
          price: 135.25,
          change: 2.15,
          changePercent: 1.62,
          reason: 'AI spending leader, CEO confirmed $660B capex sustainable. Tech infrastructure backbone.',
          strength: 9.5,
        },
        {
          symbol: 'MSFT',
          name: 'Microsoft',
          price: 410.5,
          change: 3.2,
          changePercent: 0.79,
          reason: 'Big Tech earnings winner, AI investments paying off. Enterprise cloud dominance (Azure).',
          strength: 9.2,
        },
        {
          symbol: 'BRK.B',
          name: 'Berkshire Hathaway',
          price: 615.75,
          change: 2.5,
          changePercent: 0.41,
          reason: 'Outperforming tech sell-offs. Safe-haven play during economic uncertainty.',
          strength: 8.8,
        },
        {
          symbol: 'AAPL',
          name: 'Apple',
          price: 230.5,
          change: 1.25,
          changePercent: 0.54,
          reason: 'Large-cap stability pillar. Ecosystem moat. AI integration long-term.',
          strength: 8.5,
        },
        {
          symbol: 'JPM',
          name: 'JPMorgan Chase',
          price: 185.25,
          change: 1.5,
          changePercent: 0.82,
          reason: 'Banking strength during uncertainty. Financial system backbone.',
          strength: 8.2,
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
    <div className="min-h-screen bg-bg-light">
      <Header lastUpdated={lastUpdated} onRefresh={loadData} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stocks Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-primary">📈 5 Strong Stocks</h2>
            <span className="text-sm font-semibold bg-secondary text-white px-3 py-1 rounded-full">
              Daily Updated
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="card-base h-96 bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse" />
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
            <h2 className="text-3xl font-bold text-primary">🚀 Trending Memecoins</h2>
            <span className="text-sm font-semibold bg-warning text-white px-3 py-1 rounded-full">
              Top 5 Trending
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="card-base h-48 bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memecoins.map((coin) => (
                <MemeCard key={coin.symbol} {...coin} />
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-warning bg-opacity-10 border border-warning border-opacity-30 rounded-lg">
            <div className="flex gap-2">
              <Zap size={20} className="text-warning flex-shrink-0" />
              <div className="text-sm text-text-dark">
                <strong>Memecoin Alert:</strong> These are highly volatile assets. Use RSI and sell signals as guides,
                not guarantees. Trade only what you can afford to lose.
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-primary">📰 Market Insights & News</h2>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card-base h-24 bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse" />
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
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Last updated: {lastUpdated}</p>
          <p className="mt-2">Market data updates daily at 9:00 AM ET via GitHub Actions</p>
          <p className="mt-4 text-xs">
            Disclaimer: This is for informational purposes only. Not financial advice. Always do your own research.
          </p>
        </footer>
      </main>
    </div>
  )
}
