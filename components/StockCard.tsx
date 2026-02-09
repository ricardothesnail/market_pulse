'use client'

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  reason: string
  strength: number
}

export default function StockCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  reason,
  strength,
}: StockCardProps) {
  const isPositive = changePercent >= 0
  const strengthPercentage = (strength / 10) * 100

  return (
    <div className="bg-gradient-card border border-card rounded-xl p-6 transition-all duration-300 hover:border-hover hover:shadow-card-hover group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-accent-blue">{symbol}</h3>
          <p className="text-sm text-text-muted">{name}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-text-primary">${price.toFixed(2)}</p>
          <div className={`flex items-center gap-1 justify-end ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
            {isPositive ? (
              <TrendingUp size={18} />
            ) : (
              <TrendingDown size={18} />
            )}
            <span className="text-lg font-semibold">
              {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4 pt-4 border-t border-card">
        <p className="text-sm text-text-secondary leading-relaxed">{reason}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-text-muted">STRENGTH</span>
          <span className="text-sm font-bold text-accent-purple">{strength.toFixed(1)}/10</span>
        </div>
        <div className="w-full bg-bg-hover rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-accent-blue to-accent-purple h-full transition-all duration-500"
            style={{ width: `${strengthPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex gap-2 text-xs pt-3 border-t border-card">
        <span className={`px-2 py-1 rounded-full font-semibold ${isPositive ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red'}`}>
          {isPositive ? '↑ Bullish' : '↓ Bearish'}
        </span>
      </div>
    </div>
  )
}
