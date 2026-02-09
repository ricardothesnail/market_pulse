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

// Color assignments for stocks
const STOCK_COLORS: Record<string, { colorGradient: string; glowColor: string }> = {
  MRVL: { colorGradient: 'gradient-joy-purple', glowColor: 'shadow-glow-purple' },
  DDOG: { colorGradient: 'gradient-joy-blue', glowColor: 'shadow-glow-blue' },
  CRWD: { colorGradient: 'gradient-joy-cyan', glowColor: 'shadow-glow-cyan' },
  NTRA: { colorGradient: 'gradient-joy-green', glowColor: 'shadow-glow-green' },
  GILD: { colorGradient: 'gradient-joy-orange', glowColor: 'shadow-glow-orange' },
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
      // Fetch stocks
      const stocksRes = await fetch('/api/stocks')
      const stocksData = await stocksRes.json()
      
      if (stocksData.stocks) {
        const formattedStocks: Stock[] = stocksData.stocks.map((stock: any) => ({
          symbol: stock.symbol,
          name: stock.name,
          price: stock.last_price || 0,
          change: stock.last_price_change || 0,
          changePercent: stock.last_price_change || 0,
          reason: stock.reason,
          strength: stock.strength,
          ...(STOCK_COLORS[stock.symbol] || { colorGradient: 'gradient-joy-blue', glowColor: 'shadow-glow-blue' }),
        }))
        setStocks(formattedStocks)
      }

      // Fetch memecoins
      const memesRes = await fetch('/api/memecoins')
      const memesData = await memesRes.json()
      
      if (memesData.memecoins && memesData.memecoins.length > 0) {
        const formattedMemes: Memecoin[] = memesData.memecoins.map((coin: any) => ({
          symbol: coin.symbol,
          name: coin.name,
          price: coin.current_price || 0,
          priceChange24h: coin.price_change_24h || 0,
          marketCap: coin.market_cap || 'N/A',
          rsi: coin.rsi || 50,
          sellSignal: coin.sellSignal || 'HOLD',
          image: coin.image,
        }))
        setMemecoins(formattedMemes)
      }

      // Fetch news
      const newsRes = await fetch('/api/news')
      const newsData = await newsRes.json()
      
      if (newsData.news && newsData.news.length > 0) {
        const formattedNews: NewsItem[] = newsData.news.map((item: any) => ({
          title: item.title,
          source: item.source,
          url: item.url,
          insight: item.description || item.insight || '',
          sentiment: determineSentiment(item.title, item.description),
        }))
        setNews(formattedNews)
      }

      setLastUpdated(new Date().toLocaleString())
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const determineSentiment = (title: string, description?: string): 'bullish' | 'bearish' | 'neutral' => {
    const text = `${title} ${description || ''}`.toLowerCase()
    if (text.includes('surge') || text.includes('gain') || text.includes('jump') || text.includes('rise') || text.includes('rally')) return 'bullish'
    if (text.includes('drop') || text.includes('fall') || text.includes('crash') || text.includes('decline') || text.includes('loss')) return 'bearish'
    return 'neutral'
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

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {/* Stock Gallery Section */}
        <section className="mb-32">
          <h2 className="text-4xl font-black text-joy-cyan mb-12 text-center">My Top 5 Stock Picks</h2>

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
        <section className="mb-32">
          <h2 className="text-4xl font-black text-joy-magenta mb-4 text-center">🚀 Trending Memecoins</h2>
          <p className="text-text-secondary mb-12 text-center">High volatility for high stakes. Check RSI and signals, but trade with caution.</p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-48 bg-gradient-dark border-2 border-white/10 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : memecoins.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memecoins.map((coin) => (
                <MemeCard key={coin.symbol} {...coin} />
              ))}
            </div>
          ) : (
            <div className="p-6 bg-gradient-dark border-2 border-white/10 rounded-xl text-center">
              <p className="text-text-secondary">No memecoin data available yet. Check back after the market update.</p>
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
        <section className="mb-32">
          <h2 className="text-4xl font-black text-joy-green mb-4 text-center">📰 Market News & Insights</h2>
          <p className="text-text-secondary mb-12 text-center">Latest market developments with sentiment analysis.</p>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gradient-dark border-2 border-white/10 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="space-y-4">
              {news.map((item, idx) => (
                <NewsCard key={idx} {...item} />
              ))}
            </div>
          ) : (
            <div className="p-6 bg-gradient-dark border-2 border-white/10 rounded-xl text-center">
              <p className="text-text-secondary">No news data available yet. Check back after the market update.</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-16 border-t border-white/10 text-center">
          <div className="space-y-4 text-text-muted text-sm">
            <p className="text-base">{lastUpdated}</p>
            <p className="text-base">Data refreshes automatically daily at 9:30 AM ET (market open)</p>
            <p className="text-xs text-text-muted/60 pt-6">
              Disclaimer: For informational purposes only. Not financial advice. Do your own research.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
