'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react'

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-md group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-primary">{symbol}</h3>
          <p className="text-sm text-gray-500">{name}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-text-dark">${price.toFixed(2)}</p>
          <div className={`flex items-center gap-1 justify-end ${isPositive ? 'text-gain' : 'text-loss'}`}>
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

      <div className="space-y-3 mb-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-text-dark leading-relaxed">{reason}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-600">STRENGTH</span>
          <span className="text-sm font-bold text-secondary">{strength.toFixed(1)}/10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-secondary to-accent h-full transition-all duration-500"
            style={{ width: `${strengthPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
        <span className={`px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-accent' : 'bg-red-100 text-danger'}`}>
          {isPositive ? 'Bullish' : 'Bearish'} Trend
        </span>
      </div>
    </div>
  )
}
