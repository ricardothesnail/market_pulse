'use client'

import React from 'react'
import { RefreshCw, Clock } from 'lucide-react'

interface NavigationProps {
  lastUpdated: string
  onRefresh?: () => void
}

export default function Navigation({ lastUpdated, onRefresh }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/95 backdrop-blur-md border-b border-card">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">📊 Market Pulse</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-text-muted text-sm">
            <Clock size={16} />
            <span>{lastUpdated}</span>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue font-medium rounded-lg transition-all duration-200 active:scale-95"
              title="Refresh market data"
            >
              <RefreshCw size={16} />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
