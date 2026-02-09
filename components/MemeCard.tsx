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
        return 'bg-accent text-white'
      case 'BUY':
        return 'bg-blue-100 text-secondary'
      case 'STRONG_SELL':
        return 'bg-danger text-white'
      case 'SELL':
        return 'bg-orange-100 text-warning'
      default:
        return 'bg-gray-100 text-text-dark'
    }
  }

  const getRSIColor = (rsiValue: number) => {
    if (rsiValue > 70) return 'text-danger'
    if (rsiValue < 30) return 'text-accent'
    return 'text-text-dark'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          )}
          <div>
            <h3 className="text-xl font-bold text-primary">{symbol}</h3>
            <p className="text-sm text-gray-500">{name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${price.toFixed(8)}</p>
          <div className={`flex items-center gap-1 justify-end ${isPositive ? 'text-gain' : 'text-loss'}`}>
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
          <span className="text-gray-600">Market Cap:</span>
          <span className="font-semibold text-text-dark">{marketCap}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">RSI (14):</span>
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${getRSIColor(rsi)}`}>{rsi.toFixed(1)}</span>
            {rsi > 70 && <Zap size={16} className="text-danger" />}
            {rsi < 30 && <Zap size={16} className="text-accent" />}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-600">SIGNAL</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSignalColor(sellSignal)}`}>
            {sellSignal}
          </span>
        </div>
      </div>
    </div>
  )
}
