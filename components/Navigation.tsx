'use client'

import React from 'react'
import Link from 'next/link'
import { RefreshCw, Clock } from 'lucide-react'

interface NavigationProps {
  lastUpdated: string
  onRefresh?: () => void
}

export default function Navigation({ lastUpdated, onRefresh }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/95 backdrop-blur-md border-b-2 border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl font-black bg-gradient-to-r from-joy-cyan to-joy-purple bg-clip-text text-transparent">📊 Market Pulse</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-text-muted text-sm">
            <Clock size={16} />
            <span>{lastUpdated}</span>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-joy-cyan/20 hover:bg-joy-cyan/30 text-joy-cyan font-bold rounded-lg transition-all duration-200 active:scale-95 border-2 border-joy-cyan/50"
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
