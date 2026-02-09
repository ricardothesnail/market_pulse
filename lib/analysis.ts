import fs from 'fs'
import path from 'path'

export interface StockPortfolio {
  stocks: Array<{
    symbol: string
    name: string
    addedDate: string
    lastReviewDate: string
    reason: string
    strength: number
    fundamentals: {
      pe_ratio: number
      growth_rate: number
      market_cap: number
      '52w_high': number
      '52w_low': number
    }
  }>
  history: Array<{
    date: string
    action: string
    stocks_selected: string[]
    reasoning: string
  }>
}

/**
 * Load current stock portfolio
 */
export function loadPortfolio(): StockPortfolio {
  try {
    const filePath = path.join(process.cwd(), 'data', 'stocks-portfolio.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading portfolio:', error)
    return { stocks: [], history: [] }
  }
}

/**
 * Save portfolio to file
 */
export function savePortfolio(portfolio: StockPortfolio) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'stocks-portfolio.json')
    fs.writeFileSync(filePath, JSON.stringify(portfolio, null, 2))
    return true
  } catch (error) {
    console.error('Error saving portfolio:', error)
    return false
  }
}

/**
 * Determine if a stock should remain in portfolio
 * Returns true if strength is > 7.5, false otherwise
 */
export function shouldKeepStock(strength: number, minStrength: number = 7.5): boolean {
  return strength >= minStrength
}

/**
 * Get current portfolio symbols
 */
export function getCurrentSymbols(): string[] {
  const portfolio = loadPortfolio()
  return portfolio.stocks.map(s => s.symbol)
}

/**
 * Check if stock is in current portfolio
 */
export function isInPortfolio(symbol: string): boolean {
  return getCurrentSymbols().includes(symbol)
}

/**
 * Add stock to portfolio (or update if exists)
 */
export function addStock(
  symbol: string,
  name: string,
  reason: string,
  strength: number,
  fundamentals: any
): boolean {
  const portfolio = loadPortfolio()
  const today = new Date().toISOString().split('T')[0]

  const existingIndex = portfolio.stocks.findIndex(s => s.symbol === symbol)

  if (existingIndex >= 0) {
    // Update existing
    portfolio.stocks[existingIndex] = {
      ...portfolio.stocks[existingIndex],
      reason,
      strength,
      fundamentals,
      lastReviewDate: today,
    }
  } else {
    // Add new
    portfolio.stocks.push({
      symbol,
      name,
      addedDate: today,
      lastReviewDate: today,
      reason,
      strength,
      fundamentals,
    })
  }

  return savePortfolio(portfolio)
}

/**
 * Remove stock from portfolio
 */
export function removeStock(symbol: string): boolean {
  const portfolio = loadPortfolio()
  portfolio.stocks = portfolio.stocks.filter(s => s.symbol !== symbol)
  return savePortfolio(portfolio)
}

/**
 * Log portfolio action to history
 */
export function logPortfolioAction(
  action: string,
  stocks: string[],
  reasoning: string
): boolean {
  const portfolio = loadPortfolio()
  const today = new Date().toISOString().split('T')[0]

  portfolio.history.push({
    date: today,
    action,
    stocks_selected: stocks,
    reasoning,
  })

  return savePortfolio(portfolio)
}
