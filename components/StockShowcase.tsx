'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'

interface StockShowcaseProps {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  reason: string
  strength: number
}

export default function StockShowcase({
  symbol,
  name,
  price,
  change,
  changePercent,
  reason,
  strength,
}: StockShowcaseProps) {
  const isPositive = changePercent >= 0
  const strengthPercentage = (strength / 10) * 100

  // Color gradient based on strength
  const getStrengthGradient = (str: number) => {
    if (str >= 9) return 'from-accent-purple to-accent-blue'
    if (str >= 8.5) return 'from-accent-blue to-accent-cyan'
    if (str >= 8) return 'from-accent-cyan to-accent-green'
    return 'from-accent-green to-accent-orange'
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-card transition-all duration-300 hover:border-hover hover:shadow-card-hover">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-card via-bg-dark to-bg-card" />
      
      {/* Accent bar at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getStrengthGradient(strength)}`} />

      <div className="relative p-8 flex flex-col h-full">
        {/* Top section: Symbol and Price */}
        <div className="mb-8">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-5xl font-bold text-accent-blue">{symbol}</h2>
            <div className="text-right">
              <div className="text-3xl font-bold text-text-primary">${price.toFixed(2)}</div>
              <div className={`flex items-center justify-end gap-1 text-lg font-semibold ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span>{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>
          <p className="text-text-muted text-sm">{name}</p>
        </div>

        {/* Middle section: Description */}
        <div className="flex-1 mb-6">
          <p className="text-text-secondary leading-relaxed text-sm">{reason}</p>
        </div>

        {/* Bottom section: Strength indicator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-accent-orange" />
              <span className="text-xs font-semibold text-text-muted uppercase">Strength Score</span>
            </div>
            <span className="text-lg font-bold text-accent-purple">{strength.toFixed(1)}/10</span>
          </div>
          <div className="w-full h-2 bg-bg-hover rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getStrengthGradient(strength)} transition-all duration-500`}
              style={{ width: `${strengthPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
