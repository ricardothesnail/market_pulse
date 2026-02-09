import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const newsPath = path.join(process.cwd(), 'data', 'latest-news.json')
    
    // Check if file exists, if not return empty array
    if (!fs.existsSync(newsPath)) {
      return NextResponse.json({ news: [], last_updated: new Date().toISOString() })
    }
    
    const newsData = JSON.parse(fs.readFileSync(newsPath, 'utf-8'))
    return NextResponse.json(newsData)
  } catch (error) {
    console.error('Error reading news:', error)
    return NextResponse.json({ news: [], last_updated: new Date().toISOString() }, { status: 200 })
  }
}
