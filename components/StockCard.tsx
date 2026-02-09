'use client'

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StockCardProps {
  symbol: string
  name: string
  price: number
  changePercent: number
  reason: string
  strength: number
  colorGradient: string
  glowColor: string
}

// Map gradient names to actual CSS gradients
const gradientMap: Record<string, string> = {
  'gradient-joy-purple': 'linear-gradient(135deg, #9D4EDD 0%, #3A86FF 100%)',
  'gradient-joy-blue': 'linear-gradient(135deg, #3A86FF 0%, #00D9FF 100%)',
  'gradient-joy-cyan': 'linear-gradient(135deg, #00D9FF 0%, #06FFA5 100%)',
  'gradient-joy-green': 'linear-gradient(135deg, #06FFA5 0%, #FFD60A 100%)',
  'gradient-joy-orange': 'linear-gradient(135deg, #FF6B35 0%, #FFD60A 100%)',
}

// Map shadow names to box-shadow values
const shadowMap: Record<string, string> = {
  'shadow-glow-purple': '0 0 20px rgba(157, 78, 221, 0.3)',
  'shadow-glow-blue': '0 0 20px rgba(58, 134, 255, 0.3)',
  'shadow-glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
  'shadow-glow-green': '0 0 20px rgba(6, 255, 165, 0.3)',
  'shadow-glow-orange': '0 0 20px rgba(255, 107, 53, 0.3)',
}

export default function StockCard({
  symbol,
  name,
  price,
  changePercent,
  reason,
  strength,
  colorGradient,
  glowColor,
}: StockCardProps) {
  const isPositive = changePercent >= 0

  return (
    <div 
      className="relative overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-300"
      style={{ boxShadow: shadowMap[glowColor] || 'none' }}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{ backgroundImage: gradientMap[colorGradient] || 'none' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />

      {/* Content */}
      <div className="relative p-8 h-full flex flex-col justify-between min-h-96">
        {/* Top: Symbol and price */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-6xl font-black text-white drop-shadow-lg">{symbol}</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-white drop-shadow-lg">${price.toFixed(2)}</div>
              <div className={`flex items-center gap-1 font-bold ${isPositive ? 'text-joy-green' : 'text-joy-orange'} drop-shadow-lg`}>
                {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </div>
            </div>
          </div>
          <p className="text-white/90 text-sm font-medium mb-6">{name}</p>
        </div>

        {/* Middle: Thesis */}
        <div className="flex-1 mb-6">
          <p className="text-white/95 text-sm leading-relaxed font-medium">{reason}</p>
        </div>

        {/* Bottom: Strength */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-black text-white">{strength.toFixed(1)}</div>
            <div className="text-xs text-white/80 font-semibold">/ 10</div>
          </div>
        </div>
      </div>
    </div>
  )
}
