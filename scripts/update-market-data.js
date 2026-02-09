#!/usr/bin/env node

/**
 * Market Data Update Script
 * Runs daily to fetch latest stock, crypto, and news data
 */

const fs = require('fs')
const path = require('path')
const axios = require('axios')

const COINGECKO_API = 'https://api.coingecko.com/api/v3'
const ALPHA_VANTAGE_API = 'https://www.alphavantage.co/query'

const apiKeys = {
  alphaVantage: process.env.ALPHA_VANTAGE_API_KEY || 'demo',
  newsApi: process.env.NEWS_API_KEY || '',
}

async function getTrendingMemecoins() {
  try {
    console.log('📡 Fetching trending memecoins...')
    const response = await axios.get(`${COINGECKO_API}/search/trending`)
    
    const coins = response.data.coins.slice(0, 5).map(coin => ({
      id: coin.item.id,
      symbol: coin.item.symbol.toUpperCase(),
      name: coin.item.name,
      current_price: coin.item.data.price,
      market_cap: coin.item.data.market_cap,
      market_cap_rank: coin.item.market_cap_rank,
      price_change_24h: coin.item.data.price_change_percentage_24h?.usd || 0,
      image: coin.item.large,
      last_updated: new Date().toISOString(),
    }))

    console.log(`✅ Found ${coins.length} trending memecoins`)
    return coins
  } catch (error) {
    console.error('❌ Error fetching memecoins:', error.message)
    return []
  }
}

async function getStockData(symbol) {
  try {
    const response = await axios.get(ALPHA_VANTAGE_API, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: apiKeys.alphaVantage,
      },
    })

    const quote = response.data['Global Quote']
    if (!quote || !quote.symbol) {
      return null
    }

    return {
      symbol: quote.symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      volume: quote['06. volume'],
      timestamp: quote['07. latest trading day'],
      last_updated: new Date().toISOString(),
    }
  } catch (error) {
    console.error(`❌ Error fetching ${symbol}:`, error.message)
    return null
  }
}

async function updateStockPortfolio() {
  try {
    console.log('📊 Updating stock portfolio...')
    
    const portfolioPath = path.join(__dirname, '../data/stocks-portfolio.json')
    const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'))

    // Fetch latest data for each stock
    for (let stock of portfolio.stocks) {
      const data = await getStockData(stock.symbol)
      if (data) {
        stock.last_price = data.price
        stock.last_price_change = data.changePercent
        stock.last_updated = data.last_updated
      }
      // Rate limiting for free API
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    fs.writeFileSync(portfolioPath, JSON.stringify(portfolio, null, 2))
    console.log('✅ Stock portfolio updated')
    return portfolio
  } catch (error) {
    console.error('❌ Error updating portfolio:', error.message)
    return null
  }
}

async function getFinancialNews() {
  try {
    if (!apiKeys.newsApi) {
      console.log('⚠️  NEWS_API_KEY not set, skipping news fetch')
      return []
    }

    console.log('📰 Fetching financial news...')
    
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: '(stock OR crypto OR market) AND (trading OR analysis)',
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 10,
        apiKey: apiKeys.newsApi,
      },
    })

    return response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      image: article.urlToImage,
      publishedAt: article.publishedAt,
    }))
  } catch (error) {
    console.error('❌ Error fetching news:', error.message)
    return []
  }
}

async function main() {
  console.log('\n🚀 Starting Daily Market Data Update...')
  console.log(`⏰ ${new Date().toISOString()}\n`)

  try {
    const memecoins = await getTrendingMemecoins()
    const portfolio = await updateStockPortfolio()
    const news = await getFinancialNews()

    // Save memecoins data
    if (memecoins.length > 0) {
      const memePath = path.join(__dirname, '../data/memecoins.json')
      fs.writeFileSync(memePath, JSON.stringify({ memecoins, last_updated: new Date().toISOString() }, null, 2))
      console.log('✅ Memecoins data saved')
    }

    // Save news data
    if (news.length > 0) {
      const newsPath = path.join(__dirname, '../data/latest-news.json')
      fs.writeFileSync(newsPath, JSON.stringify({ news, last_updated: new Date().toISOString() }, null, 2))
      console.log('✅ News data saved')
    }

    console.log('\n✅ Daily update completed successfully!')
  } catch (error) {
    console.error('\n❌ Error during update:', error)
    process.exit(1)
  }
}

main()
