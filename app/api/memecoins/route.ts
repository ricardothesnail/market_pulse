import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const memePath = path.join(process.cwd(), 'data', 'memecoins.json')
    
    // Check if file exists, if not return empty array
    if (!fs.existsSync(memePath)) {
      return NextResponse.json({ memecoins: [], last_updated: new Date().toISOString() })
    }
    
    const memeData = JSON.parse(fs.readFileSync(memePath, 'utf-8'))
    return NextResponse.json(memeData)
  } catch (error) {
    console.error('Error reading memecoins:', error)
    return NextResponse.json({ memecoins: [], last_updated: new Date().toISOString() }, { status: 200 })
  }
}
