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
        return 'border-l-4 border-l-accent-green bg-gradient-to-r from-bg-card via-bg-card to-bg-card hover:from-accent-green/10'
      case 'bearish':
        return 'border-l-4 border-l-accent-red bg-gradient-to-r from-bg-card via-bg-card to-bg-card hover:from-accent-red/10'
      default:
        return 'border-l-4 border-l-accent-blue bg-gradient-to-r from-bg-card via-bg-card to-bg-card hover:from-accent-blue/10'
    }
  }

  const getSentimentBadge = (sent: string) => {
    switch (sent) {
      case 'bullish':
        return 'bg-accent-green/20 text-accent-green'
      case 'bearish':
        return 'bg-accent-red/20 text-accent-red'
      default:
        return 'bg-accent-blue/20 text-accent-blue'
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-xl border border-card p-6 transition-all duration-300 hover:border-hover hover:shadow-card-hover ${getSentimentColor(sentiment)} cursor-pointer group`}
    >
      <div className="flex gap-3 mb-2 items-start justify-between">
        <h3 className="text-base font-semibold text-text-primary group-hover:text-accent-blue transition-colors flex-1 leading-tight">
          {title}
        </h3>
        <ExternalLink size={18} className="text-text-muted group-hover:text-accent-blue flex-shrink-0 transition-colors" />
      </div>

      <p className="text-sm text-text-secondary mb-3 leading-relaxed">{insight}</p>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-card">
        <span className="text-xs font-medium text-text-muted">{source}</span>
        <span className={`px-2 py-1 rounded text-xs font-bold ${getSentimentBadge(sentiment)}`}>
          {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
        </span>
      </div>
    </a>
  )
}
