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
        return 'border-l-4 border-l-accent bg-green-50'
      case 'bearish':
        return 'border-l-4 border-l-danger bg-red-50'
      default:
        return 'border-l-4 border-l-secondary bg-blue-50'
    }
  }

  const getSentimentBadge = (sent: string) => {
    switch (sent) {
      case 'bullish':
        return 'bg-accent text-white'
      case 'bearish':
        return 'bg-danger text-white'
      default:
        return 'bg-secondary text-white'
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-md ${getSentimentColor(sentiment)} cursor-pointer group`}
    >
      <div className="flex gap-3 mb-2 items-start justify-between">
        <h3 className="text-base font-semibold text-text-dark group-hover:text-secondary transition-colors flex-1 leading-tight">
          {title}
        </h3>
        <ExternalLink size={18} className="text-gray-400 group-hover:text-secondary flex-shrink-0" />
      </div>

      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{insight}</p>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-200">
        <span className="text-xs font-medium text-gray-500">{source}</span>
        <span className={`px-2 py-1 rounded text-xs font-bold ${getSentimentBadge(sentiment)}`}>
          {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
        </span>
      </div>
    </a>
  )
}
