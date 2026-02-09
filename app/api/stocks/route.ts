import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const portfolioPath = path.join(process.cwd(), 'data', 'stocks-portfolio.json')
    const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'))
    
    return NextResponse.json(portfolioData)
  } catch (error) {
    console.error('Error reading stocks portfolio:', error)
    return NextResponse.json({ error: 'Failed to fetch stocks' }, { status: 500 })
  }
}
