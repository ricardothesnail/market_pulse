import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Market Pulse - Daily Stock & Crypto Insights',
  description: 'Your daily source for stock and crypto market analysis with curated insights and real-time data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-bg-light">
        {children}
      </body>
    </html>
  )
}
