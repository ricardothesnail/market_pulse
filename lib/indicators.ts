/**
 * Technical Indicators
 */

export function calculateRSI(prices: number[], period: number = 14): number {
  if (prices.length < period) return 50 // Neutral if not enough data

  const deltas = []
  for (let i = 1; i < prices.length; i++) {
    deltas.push(prices[i] - prices[i - 1])
  }

  const gains = deltas.filter(d => d > 0).reduce((a, b) => a + b, 0) / period
  const losses = Math.abs(deltas.filter(d => d < 0).reduce((a, b) => a + b, 0) / period)

  if (losses === 0) return 100
  if (gains === 0) return 0

  const rs = gains / losses
  const rsi = 100 - (100 / (1 + rs))

  return Math.round(rsi * 100) / 100
}

export function calculateMACD(
  prices: number[],
  fastPeriod: number = 12,
  slowPeriod: number = 26,
  signalPeriod: number = 9
) {
  if (prices.length < slowPeriod) return null

  const ema12 = calculateEMA(prices, fastPeriod)
  const ema26 = calculateEMA(prices, slowPeriod)
  const macd = ema12 - ema26

  // Simplified signal line (using MACD directly, proper would need array of MACDs)
  return {
    macd: Math.round(macd * 100) / 100,
    signal: Math.round(macd * 100) / 100,
    histogram: 0,
  }
}

function calculateEMA(prices: number[], period: number): number {
  const multiplier = 2 / (period + 1)
  let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period

  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema
  }

  return ema
}

/**
 * Determine if a memecoin is at a good sell signal
 * Returns: "STRONG_SELL" | "SELL" | "HOLD" | "BUY" | "STRONG_BUY"
 */
export function getMemeSignal(rsi: number, priceChange24h: number): string {
  if (rsi > 80) return 'STRONG_SELL'
  if (rsi > 70 && priceChange24h > 20) return 'SELL'
  if (rsi < 30) return 'STRONG_BUY'
  if (rsi < 40 && priceChange24h < -20) return 'BUY'
  return 'HOLD'
}

/**
 * Calculate momentum score (0-100)
 */
export function calculateMomentumScore(
  rsi: number,
  priceChange24h: number,
  volumeChange: number = 0
): number {
  let score = 50 // Neutral starting point

  // RSI contribution (0-30)
  if (rsi > 70) score -= 15
  else if (rsi < 30) score += 15
  else score += (50 - rsi) / 10

  // Price change contribution (0-30)
  const priceScore = Math.min(30, Math.abs(priceChange24h / 10))
  if (priceChange24h > 0) score += priceScore
  else score -= priceScore

  // Volume contribution (0-20)
  if (volumeChange > 50) score += 10
  else if (volumeChange > 20) score += 5
  else if (volumeChange < -20) score -= 5

  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Volatility score based on recent price movements
 */
export function calculateVolatility(prices: number[]): number {
  if (prices.length < 2) return 0

  const returns = []
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
  }

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length
  const stdDev = Math.sqrt(variance)

  return Math.round(stdDev * 10000) / 100 // Return as percentage
}
