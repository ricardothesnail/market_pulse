'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

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
    <Link href={`/stock/${symbol.toLowerCase()}`}>
      <div className={`group relative overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-300 cursor-pointer hover:scale-105 ${glowColor}`}>
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-${colorGradient} opacity-90`} />
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
            <p className="text-white/90 text-sm font-medium mb-4">{name}</p>
          </div>

          {/* Middle: Thesis */}
          <div className="flex-1">
            <p className="text-white/95 text-sm leading-relaxed font-medium line-clamp-3">{reason}</p>
          </div>

          {/* Bottom: Strength + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-black text-white">{strength.toFixed(1)}</div>
              <div className="text-xs text-white/80 font-semibold">/ 10</div>
            </div>
            <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
              Deep Dive
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
