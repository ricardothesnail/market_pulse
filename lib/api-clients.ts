import axios from 'axios'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'
const ALPHA_VANTAGE_API = 'https://www.alphavantage.co/query'

// CoinGecko API key (free tier)
const COINGECKO_KEY = ''

// Alpha Vantage API key - you'll need to get one free at https://www.alphavantage.co/
const ALPHA_VANTAGE_KEY = 'demo' // Replace with your actual key

/**
 * Fetch trending memecoins from CoinGecko
 */
export async function getTrendingMemecoins() {
  try {
    const response = await axios.get(`${COINGECKO_API}/search/trending`)
    const trendingCoins = response.data.coins.slice(0, 5).map((coin: any) => ({
      id: coin.item.id,
      symbol: coin.item.symbol.toUpperCase(),
      name: coin.item.name,
      current_price: coin.item.data.price,
      market_cap: coin.item.data.market_cap,
      market_cap_rank: coin.item.market_cap_rank,
      price_change_24h: coin.item.data.price_change_percentage_24h?.usd || 0,
      image: coin.item.large,
    }))
    return trendingCoins
  } catch (error) {
    console.error('Error fetching trending memecoins:', error)
    return []
  }
}

/**
 * Fetch memecoin data with historical prices for charting
 */
export async function getMememcoinData(coinId: string) {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: '30',
          interval: 'daily',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching memecoin data for ${coinId}:`, error)
    return null
  }
}

/**
 * Fetch stock data from Alpha Vantage
 */
export async function getStockData(symbol: string) {
  try {
    const response = await axios.get(ALPHA_VANTAGE_API, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_KEY,
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
    }
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error)
    return null
  }
}

/**
 * Fetch historical stock data for charting
 */
export async function getStockHistoricalData(symbol: string, interval: 'daily' | 'weekly' | 'monthly' = 'daily') {
  try {
    const functionName = 'TIME_SERIES_' + interval.toUpperCase()
    const response = await axios.get(ALPHA_VANTAGE_API, {
      params: {
        function: functionName,
        symbol: symbol,
        apikey: ALPHA_VANTAGE_KEY,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error)
    return null
  }
}

/**
 * Fetch company fundamentals
 */
export async function getCompanyInfo(symbol: string) {
  try {
    const response = await axios.get(ALPHA_VANTAGE_API, {
      params: {
        function: 'OVERVIEW',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_KEY,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching company info for ${symbol}:`, error)
    return null
  }
}

/**
 * Fetch financial news (using NewsAPI)
 * Note: Requires NEWS_API_KEY from https://newsapi.org/
 */
export async function getFinancialNews(query: string = 'stock market', limit: number = 5) {
  try {
    const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || ''
    if (!newsApiKey) {
      console.warn('NEWS_API_KEY not found. News fetching disabled.')
      return []
    }

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: limit,
        apiKey: newsApiKey,
      },
    })

    return response.data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      image: article.urlToImage,
      publishedAt: article.publishedAt,
    }))
  } catch (error) {
    console.error('Error fetching financial news:', error)
    return []
  }
}
