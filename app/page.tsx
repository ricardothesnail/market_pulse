'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import StockCard from '@/components/StockCard'
import MemeCard from '@/components/MemeCard'
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
            Smaller, more interesting companies with clear investment theses and real catalysts.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-20 flex flex-col items-center">
        {/* Stock Gallery Section */}
        <section className="mb-32 w-full max-w-5xl">
          <h2 className="text-4xl font-black text-joy-cyan mb-12 text-center">Stocks to Watch</h2>

           {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl w-full">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-96 bg-gradient-dark border-2 border-white/10 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl w-full">
              {stocks.map((stock) => (
                <StockCard key={stock.symbol} {...stock} />
              ))}
            </div>
          )}
        </section>

        {/* Memecoins Section */}
        <section className="mb-32 w-full max-w-5xl">
          <h2 className="text-4xl font-black text-joy-magenta mb-4 text-center">🚀 Trending Memecoins</h2>
          <p className="text-text-secondary mb-12 text-center">High volatility for high stakes. Check RSI and signals, but trade with caution.</p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-5xl w-full">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-48 bg-gradient-dark border-2 border-white/10 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : memecoins.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-5xl w-full">
              {memecoins.map((coin) => (
                <MemeCard key={coin.symbol} {...coin} />
              ))}
            </div>
          ) : (
            <div className="p-6 bg-gradient-dark border-2 border-white/10 rounded-xl text-center mx-auto max-w-5xl w-full">
              <p className="text-text-secondary">No memecoin data available yet. Check back after the market update.</p>
            </div>
          )}

          <div className="mt-8 p-6 bg-gradient-to-r from-joy-orange/20 to-joy-pink/20 border-2 border-joy-orange rounded-xl w-full max-w-5xl mx-auto">
            <div className="flex gap-3">
              <Zap size={24} className="text-joy-orange flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-secondary">
                <strong className="text-joy-orange">Memecoin Alert:</strong> These are highly volatile assets. Use RSI and sell signals as guides,
                not guarantees. Trade only what you can afford to lose.
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Disclaimers */}
        <section className="w-full max-w-5xl mt-48 pt-16 border-t border-white/10">
          <div className="space-y-6 text-center">
            <div className="text-text-secondary text-sm">
              <p className="mb-4">Last updated: {lastUpdated}</p>
              <p className="mb-4">Data refreshes automatically daily at 9:30 AM ET (market open)</p>
            </div>
            
            <div className="bg-gradient-to-r from-joy-orange/10 to-joy-pink/10 border-2 border-white/10 rounded-xl p-8 space-y-4">
              <h3 className="text-joy-orange font-bold text-lg">Important Disclaimers</h3>
              <ul className="text-text-muted text-xs space-y-3 text-left max-w-2xl mx-auto">
                <li><strong>Not Financial Advice:</strong> This content is for informational purposes only and should not be considered financial, investment, or trading advice.</li>
                <li><strong>Do Your Own Research:</strong> All stocks listed here require independent research and due diligence before any investment decision.</li>
                <li><strong>Risk Disclosure:</strong> Stock investments carry significant risk, including loss of principal. Past performance does not guarantee future results.</li>
                <li><strong>Memecoin Warning:</strong> Memecoins are highly speculative and volatile. They can lose value rapidly. Only invest what you can afford to lose completely.</li>
                <li><strong>Market Volatility:</strong> Prices and market conditions change rapidly. Data shown may not reflect real-time prices.</li>
                <li><strong>No Guarantees:</strong> Strength scores and signals are based on analysis, not guarantees of performance.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
