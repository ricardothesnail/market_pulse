'use client'

import React from 'react'

export default function Header() {
  return (
    <header className="pt-24 pb-16 px-6 bg-gradient-to-b from-bg-card via-bg-dark to-bg-dark">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="block text-text-primary">Real-Time</span>
          <span className="block bg-gradient-accent bg-clip-text text-transparent">Market Intelligence</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Curated stock picks & crypto signals. Updated daily at 9 AM ET.
        </p>
      </div>
    </header>
  )
}
