'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface MemeCardProps {
  symbol: string
  name: string
  price: number
  priceChange24h: number
  marketCap: string
  rsi: number
  sellSignal: string
  image?: string
}

export default function MemeCard({
  symbol,
  name,
  price,
  priceChange24h,
  marketCap,
  rsi,
  sellSignal,
  image,
}: MemeCardProps) {
  const isPositive = priceChange24h >= 0

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'STRONG_BUY':
        return 'bg-accent-green/30 text-accent-green'
      case 'BUY':
        return 'bg-accent-blue/30 text-accent-blue'
      case 'STRONG_SELL':
        return 'bg-accent-red/30 text-accent-red'
      case 'SELL':
        return 'bg-accent-orange/30 text-accent-orange'
      default:
        return 'bg-bg-hover text-text-secondary'
    }
  }

  const getRSIColor = (rsiValue: number) => {
    if (rsiValue > 70) return 'text-accent-red'
    if (rsiValue < 30) return 'text-accent-green'
    return 'text-accent-blue'
  }

  return (
    <div className="bg-gradient-card border border-card rounded-xl p-6 transition-all duration-300 hover:border-hover hover:shadow-card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full border border-card"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          )}
          <div>
            <h3 className="text-xl font-bold text-accent-cyan">{symbol}</h3>
            <p className="text-sm text-text-muted">{name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-text-primary">${price.toFixed(8)}</p>
          <div className={`flex items-center gap-1 justify-end ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
            {isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span className="font-semibold">{isPositive ? '+' : ''}{priceChange24h.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">Market Cap:</span>
          <span className="font-semibold text-text-primary">{marketCap}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-text-muted">RSI (14):</span>
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${getRSIColor(rsi)}`}>{rsi.toFixed(1)}</span>
            {rsi > 70 && <Zap size={16} className="text-accent-red" />}
            {rsi < 30 && <Zap size={16} className="text-accent-green" />}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-card">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-text-muted">SIGNAL</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSignalColor(sellSignal)}`}>
            {sellSignal}
          </span>
        </div>
      </div>
    </div>
  )
}
