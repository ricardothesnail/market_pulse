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
        return 'bg-joy-green/30 text-joy-green border border-joy-green/50'
      case 'BUY':
        return 'bg-joy-cyan/30 text-joy-cyan border border-joy-cyan/50'
      case 'STRONG_SELL':
        return 'bg-joy-orange/30 text-joy-orange border border-joy-orange/50'
      case 'SELL':
        return 'bg-joy-pink/30 text-joy-pink border border-joy-pink/50'
      default:
        return 'bg-white/10 text-text-secondary border border-white/20'
    }
  }

  const getRSIColor = (rsiValue: number) => {
    if (rsiValue > 70) return 'text-joy-orange'
    if (rsiValue < 30) return 'text-joy-green'
    return 'text-joy-blue'
  }

  return (
    <div className="bg-gradient-dark border-2 border-white/10 hover:border-joy-cyan/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-cyan group flex flex-col h-full">
      {/* Image banner at top */}
      {image ? (
        <div className="relative h-28 bg-gradient-to-br from-joy-cyan/20 to-transparent overflow-hidden flex items-center justify-center border-b border-white/10">
          <img
            src={image}
            alt={name}
            className="h-24 w-24 object-contain drop-shadow-lg"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      ) : (
        <div className="h-28 bg-gradient-dark border-b border-white/10" />
      )}
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-black text-joy-cyan">{symbol}</h3>
            <p className="text-sm text-text-muted">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-text-primary">${price.toFixed(8)}</p>
            <div className={`flex items-center gap-1 justify-end font-bold ${isPositive ? 'text-joy-green' : 'text-joy-orange'}`}>
              {isPositive ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span>{isPositive ? '+' : ''}{priceChange24h.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4 text-sm flex-1">
          <div className="flex justify-between">
            <span className="text-text-muted">Market Cap:</span>
            <span className="font-bold text-text-primary">{marketCap}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">RSI (14):</span>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-lg ${getRSIColor(rsi)}`}>{rsi.toFixed(1)}</span>
              {rsi > 70 && <Zap size={16} className="text-joy-orange" />}
              {rsi < 30 && <Zap size={16} className="text-joy-green" />}
            </div>
          </div>
        </div>

        {/* Signal footer */}
        <div className="pt-3 border-t border-white/10 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase">Signal</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSignalColor(sellSignal)}`}>
              {sellSignal}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
