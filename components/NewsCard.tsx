'use client'

import React from 'react'
import { ExternalLink } from 'lucide-react'

interface NewsCardProps {
  title: string
  source: string
  url: string
  insight: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
}

export default function NewsCard({
  title,
  source,
  url,
  insight,
  sentiment,
}: NewsCardProps) {
  const getSentimentColor = (sent: string) => {
    switch (sent) {
      case 'bullish':
        return 'border-l-4 border-l-joy-green bg-joy-green/5 hover:bg-joy-green/10'
      case 'bearish':
        return 'border-l-4 border-l-joy-orange bg-joy-orange/5 hover:bg-joy-orange/10'
      default:
        return 'border-l-4 border-l-joy-blue bg-joy-blue/5 hover:bg-joy-blue/10'
    }
  }

  const getSentimentBadge = (sent: string) => {
    switch (sent) {
      case 'bullish':
        return 'bg-joy-green/30 text-joy-green border border-joy-green/50'
      case 'bearish':
        return 'bg-joy-orange/30 text-joy-orange border border-joy-orange/50'
      default:
        return 'bg-joy-blue/30 text-joy-blue border border-joy-blue/50'
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-xl border-2 border-white/10 hover:border-white/30 p-6 transition-all duration-300 hover:shadow-lg ${getSentimentColor(sentiment)} cursor-pointer group`}
    >
      <div className="flex gap-3 mb-2 items-start justify-between">
        <h3 className="text-base font-bold text-text-primary group-hover:text-joy-cyan transition-colors flex-1 leading-tight">
          {title}
        </h3>
        <ExternalLink size={18} className="text-text-muted group-hover:text-joy-cyan flex-shrink-0 transition-colors" />
      </div>

      <p className="text-sm text-text-secondary mb-3 leading-relaxed">{insight}</p>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
        <span className="text-xs font-bold text-text-muted">{source}</span>
        <span className={`px-2 py-1 rounded text-xs font-bold ${getSentimentBadge(sentiment)}`}>
          {sentiment.toUpperCase()}
        </span>
      </div>
    </a>
  )
}
