'use client'

import React from 'react'
import { RefreshCw } from 'lucide-react'

interface HeaderProps {
  lastUpdated: string
  onRefresh?: () => void
}

export default function Header({ lastUpdated, onRefresh }: HeaderProps) {
  return (
    <header className="gradient-header sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">📊 Market Pulse</h1>
            <p className="text-blue-100 text-sm">Your daily source for stock & crypto insights</p>
          </div>
          <div className="text-right text-sm text-blue-100">
            <p className="mb-2">Last updated:</p>
            <p className="font-mono text-lg text-white">{lastUpdated}</p>
          </div>
        </div>

        {onRefresh && (
          <div className="mt-4">
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white text-secondary font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 active:scale-95"
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
