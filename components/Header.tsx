'use client'

import React from 'react'
import { RefreshCw } from 'lucide-react'

interface HeaderProps {
  lastUpdated: string
  onRefresh?: () => void
}

export default function Header({ lastUpdated, onRefresh }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-bg-dark via-bg-card to-bg-dark border-b border-card shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-accent bg-clip-text text-transparent">
              📊 Market Pulse
            </h1>
            <p className="text-text-secondary text-sm">Real-time stock & crypto market intelligence</p>
          </div>
          <div className="text-right text-sm text-text-secondary">
            <p className="mb-2">Last updated</p>
            <p className="font-mono text-lg text-accent-blue">{lastUpdated}</p>
          </div>
        </div>

        {onRefresh && (
          <div className="mt-6">
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-accent-blue to-accent-cyan text-bg-dark font-semibold rounded-lg hover:shadow-card-hover transition-all duration-200 active:scale-95"
            >
              <RefreshCw size={18} />
              Refresh Data
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
