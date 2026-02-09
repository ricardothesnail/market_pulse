'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react'

// Stock data with rich context
const stockData: any = {
  mrvl: {
    symbol: 'MRVL',
    name: 'Marvell Technology',
    price: 92.45,
    changePercent: 2.38,
    strength: 9.1,
    colorGradient: 'gradient-joy-purple',
    color: 'joy-purple',
    thesis: 'Connected storage and high-speed data center semiconductors. AI infrastructure with less crowding. Customer consolidation tailwind.',
    fullThesis: [
      'Marvell designs semiconductors for data centers, storage systems, and cloud infrastructure.',
      'As AI workloads explode, data centers need both compute (NVIDIA GPUs) AND storage/networking (Marvell).',
      'NVIDIA gets all the headlines, but Marvell benefits from the same capex wave without the geopolitical scrutiny.',
      'Customers are consolidating suppliers → Marvell winning share from competitors.',
      'Revenue growing 30%+, path to higher margins as scale increases.',
    ],
    catalysts: [
      { title: 'Data Center Capex Acceleration', description: 'Cloud providers spending billions on AI infrastructure' },
      { title: 'Customer Consolidation Wins', description: 'Moving from niche player to critical infrastructure partner' },
      { title: 'Networking TAM Expansion', description: 'New product categories capturing adjacent markets' },
    ],
    risks: [
      { title: 'NVIDIA Dependency', description: 'If GPU demand slows, so does data center spending' },
      { title: 'Competition', description: 'AMD, Intel, others competing in same markets' },
      { title: 'Cycle Risk', description: 'Tech cycles are unpredictable; capex can slow quickly' },
    ],
    researchLinks: [
      { title: 'Marvell Q3 2025 Earnings Call', url: '#', source: 'Company' },
      { title: 'Data Center Storage Trends Report', url: '#', source: 'IDC' },
      { title: 'Semiconductor Supply Chain Analysis', url: '#', source: 'Goldman Sachs' },
    ],
    news: [
      { title: 'Marvell wins major cloud provider contract for AI servers', sentiment: 'bullish' },
      { title: 'New high-speed networking chips announced for 2026', sentiment: 'bullish' },
      { title: 'Quarterly revenue beats estimates on strong data center demand', sentiment: 'bullish' },
    ],
  },
  ddog: {
    symbol: 'DDOG',
    name: 'Datadog',
    price: 198.75,
    changePercent: 2.16,
    strength: 8.8,
    colorGradient: 'gradient-joy-blue',
    color: 'joy-blue',
    thesis: 'Cloud monitoring SaaS with 40%+ growth. Enterprise expansion loop. AI features driving new revenue. Operating leverage inflection.',
    fullThesis: [
      'Datadog monitors cloud infrastructure, applications, and security for enterprises.',
      'As companies move workloads to cloud, they need visibility → Datadog solves this.',
      'Customers start with one module (monitoring), then expand across APM, logs, security.',
      'AI/ML features being integrated → new revenue streams and stickiness.',
      'Improving margins as they scale → path to 25%+ FCF margins.',
    ],
    catalysts: [
      { title: 'International Expansion', description: 'Europe and APAC still underpenetrated' },
      { title: 'AI Features Upsell', description: 'AI-powered anomaly detection drives new value' },
      { title: 'Operating Leverage', description: 'Growing revenue without proportional cost increases' },
    ],
    risks: [
      { title: 'Customer Concentration', description: 'Reliant on large cloud spending' },
      { title: 'Competition', description: 'AWS, Azure, and others building competing features' },
      { title: 'Economic Slowdown', description: 'Enterprise SaaS often cut first in downturns' },
    ],
    researchLinks: [
      { title: 'Datadog 2025 Product Roadmap', url: '#', source: 'Company' },
      { title: 'Cloud Monitoring Market Forecast', url: '#', source: 'Gartner' },
      { title: 'SaaS Valuation Deep Dive', url: '#', source: 'Morgan Stanley' },
    ],
    news: [
      { title: 'Datadog launches AI-powered anomaly detection for logs', sentiment: 'bullish' },
      { title: 'Net retention rate exceeds 140% in latest quarter', sentiment: 'bullish' },
      { title: 'New partnerships expand into EU market', sentiment: 'bullish' },
    ],
  },
  crwd: {
    symbol: 'CRWD',
    name: 'CrowdStrike Holdings',
    price: 385.60,
    changePercent: 1.71,
    strength: 8.6,
    colorGradient: 'gradient-joy-cyan',
    color: 'joy-cyan',
    thesis: 'Endpoint security consolidating enterprise stack. Zero-trust is mandatory. 120%+ NRR. Moving to platform winner.',
    fullThesis: [
      'CrowdStrike is the leading endpoint protection platform (EPP) for enterprises.',
      'After major breaches (MOVEit, Okta, etc), zero-trust architecture became mandatory for every company.',
      'CrowdStrike went from point solution (EDR) to full platform (EPP + SIEM + threat intel).',
      'Customers consolidating security vendors → CrowdStrike winning share.',
      'Net retention rate 120%+ means customers expanding spend significantly.',
    ],
    catalysts: [
      { title: 'Platform Consolidation Wins', description: 'Customers replace 5+ point solutions with CrowdStrike' },
      { title: 'International Expansion', description: 'EMEA and APAC markets just getting started' },
      { title: 'Deferred Revenue Inflection', description: 'Multi-year contracts converting to revenue' },
    ],
    risks: [
      { title: 'Regulatory Scrutiny', description: 'Government considering regulations on cybersecurity' },
      { title: 'Large Competitor Entry', description: 'Microsoft, Palo Alto, others expanding into EDR' },
      { title: 'Customer Concentration', description: 'Reliant on enterprise budgets' },
    ],
    researchLinks: [
      { title: 'Zero-Trust Security Implementation Guide', url: '#', source: 'Forrester' },
      { title: 'CrowdStrike 2025 Strategy Call', url: '#', source: 'Company' },
      { title: 'Cybersecurity Spending Trends', url: '#', source: 'Forrester' },
    ],
    news: [
      { title: 'CrowdStrike wins large financial services contract', sentiment: 'bullish' },
      { title: 'Platform consolidation accelerating in enterprise', sentiment: 'bullish' },
      { title: 'New threat intelligence integrations announced', sentiment: 'bullish' },
    ],
  },
  ntra: {
    symbol: 'NTRA',
    name: 'Natera Inc',
    price: 89.20,
    changePercent: 3.59,
    strength: 8.2,
    colorGradient: 'gradient-joy-green',
    color: 'joy-green',
    thesis: 'Genetic testing + liquid biopsy for cancer detection. TAM expanding as screening becomes standard care. Small-cap gem.',
    fullThesis: [
      'Natera specializes in non-invasive genetic testing, including liquid biopsy for cancer detection.',
      'Current market: prenatal testing, cancer screening, organ transplant compatibility.',
      'Liquid biopsy revolution: detect cancer from a blood test instead of invasive procedures.',
      'TAM expanding as insurance coverage increases and screening becomes standard care.',
      'Transitioning from lab tests to subscription model for recurring revenue.',
    ],
    catalysts: [
      { title: 'Insurance Reimbursement Expansion', description: 'More insurers covering genetic testing' },
      { title: 'Cancer Screening TAM Growth', description: 'Screening becomes standard of care for high-risk patients' },
      { title: 'Subscription Model Adoption', description: 'Recurring revenue stream from ongoing monitoring' },
    ],
    risks: [
      { title: 'Regulatory Risks', description: 'Genetic testing heavily regulated, new rules could change business' },
      { title: 'Competition', description: 'Invitae, Guardant, others competing in same space' },
      { title: 'Reimbursement Uncertainty', description: 'Insurance coverage changes can impact demand' },
    ],
    researchLinks: [
      { title: 'Liquid Biopsy Market Forecast', url: '#', source: 'McKinsey' },
      { title: 'Natera Investor Presentation 2025', url: '#', source: 'Company' },
      { title: 'Cancer Screening Guidelines Update', url: '#', source: 'NCCN' },
    ],
    news: [
      { title: 'New cancer screening test shows 95% sensitivity in clinical trial', sentiment: 'bullish' },
      { title: 'Major insurance provider expands coverage for genetic testing', sentiment: 'bullish' },
      { title: 'Natera expands testing to European markets', sentiment: 'bullish' },
    ],
  },
  gild: {
    symbol: 'GILD',
    name: 'Gilead Sciences',
    price: 87.55,
    changePercent: 1.39,
    strength: 7.9,
    colorGradient: 'gradient-joy-orange',
    color: 'joy-orange',
    thesis: 'Biotech with proven cash flow. HIV/Hep C recurring revenue. New CAR-T pipeline. Dividend + buybacks. Value + growth hybrid.',
    fullThesis: [
      'Gilead has proven cash generation from HIV and Hepatitis C treatments.',
      'Unlike high-burn biotech, Gilead is profitable and generates significant free cash flow.',
      'Returns cash to shareholders via dividend (2.7% yield) and buybacks.',
      'New CAR-T cell therapy pipeline could unlock new growth categories.',
      'More contrarian pick: boring but profitable, with upside optionality.',
    ],
    catalysts: [
      { title: 'New CAR-T Approvals', description: 'Cell therapy could expand TAM significantly' },
      { title: 'Liver Disease Pipeline', description: 'NASH and hepatic fibrosis treatments approaching approval' },
      { title: 'Dividend + Buybacks', description: 'Returning 100%+ of FCF to shareholders' },
    ],
    risks: [
      { title: 'Pipeline Risk', description: 'New drug development is unpredictable' },
      { title: 'Generic Competition', description: 'HIV drugs increasingly commoditized' },
      { title: 'Biotech Cycles', description: 'Stock could underperform growth stocks in risk-on markets' },
    ],
    researchLinks: [
      { title: 'Gilead Pipeline Update 2025', url: '#', source: 'Company' },
      { title: 'CAR-T Therapy Market Analysis', url: '#', source: 'Iqvia' },
      { title: 'Biotech Valuation Multiples Review', url: '#', source: 'J.P. Morgan' },
    ],
    news: [
      { title: 'New CAR-T therapy enters Phase 3 trials for oncology', sentiment: 'bullish' },
      { title: 'NASH treatment shows positive Phase 2 data', sentiment: 'bullish' },
      { title: 'Dividend increased 5% in quarterly announcement', sentiment: 'bullish' },
    ],
  },
}

export default function StockPage({ params }: { params: { symbol: string } }) {
  const stock = stockData[params.symbol.toLowerCase()] || stockData.mrvl
  const [activeTab, setActiveTab] = useState<'thesis' | 'catalysts' | 'risks' | 'news'>('thesis')

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary overflow-hidden">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="text-center">
            <div className="text-2xl font-black text-white">{stock.symbol}</div>
            <div className="text-sm text-text-muted">{stock.name}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-white">${stock.price.toFixed(2)}</div>
            <div className={`text-sm font-bold ${stock.changePercent >= 0 ? 'text-joy-green' : 'text-joy-orange'}`}>
              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className={`bg-${stock.colorGradient} pt-32 pb-16 px-6`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-white drop-shadow-lg mb-6">{stock.name}</h1>
          <p className="text-xl text-white/95 leading-relaxed drop-shadow-lg">{stock.thesis}</p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-sm text-white/80">Strength Score</div>
              <div className="text-3xl font-black text-white">{stock.strength.toFixed(1)}/10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content tabs */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Tab buttons */}
        <div className="flex gap-4 mb-12 border-b border-white/10 pb-4">
          {['thesis', 'catalysts', 'risks', 'news'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-semibold capitalize rounded-lg transition-all ${
                activeTab === tab
                  ? `bg-${stock.color} text-white`
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'thesis' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white mb-8">The Investment Thesis</h2>
            {stock.fullThesis.map((point: string, idx: number) => (
              <div key={idx} className="flex gap-4">
                <div className={`text-2xl font-black text-${stock.color} flex-shrink-0`}>{idx + 1}.</div>
                <p className="text-text-secondary text-lg leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'catalysts' && (
          <div className="grid gap-6">
            <h2 className="text-3xl font-black text-white mb-8">Near-term Catalysts</h2>
            {stock.catalysts.map((catalyst: any, idx: number) => (
              <div key={idx} className={`bg-gradient-to-br from-${stock.color}/20 to-transparent border border-${stock.color}/30 rounded-xl p-6`}>
                <h3 className={`text-xl font-black text-${stock.color} mb-2`}>{catalyst.title}</h3>
                <p className="text-text-secondary">{catalyst.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="grid gap-6">
            <h2 className="text-3xl font-black text-white mb-8">Key Risks to Watch</h2>
            {stock.risks.map((risk: any, idx: number) => (
              <div key={idx} className="bg-joy-orange/10 border border-joy-orange/30 rounded-xl p-6">
                <h3 className="text-xl font-black text-joy-orange mb-2">{risk.title}</h3>
                <p className="text-text-secondary">{risk.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white mb-8">Recent Developments</h2>
            {stock.news.map((item: any, idx: number) => (
              <div key={idx} className={`border-l-4 ${item.sentiment === 'bullish' ? 'border-joy-green' : 'border-joy-orange'} pl-4 py-2`}>
                <div className="flex items-center gap-2 mb-1">
                  {item.sentiment === 'bullish' ? (
                    <TrendingUp size={18} className="text-joy-green" />
                  ) : (
                    <TrendingDown size={18} className="text-joy-orange" />
                  )}
                  <span className={`text-sm font-bold ${item.sentiment === 'bullish' ? 'text-joy-green' : 'text-joy-orange'}`}>
                    {item.sentiment.toUpperCase()}
                  </span>
                </div>
                <p className="text-text-secondary">{item.title}</p>
              </div>
            ))}
          </div>
        )}

        {/* Research links */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <h3 className="text-2xl font-black text-white mb-6">Further Research</h3>
          <div className="grid gap-4">
            {stock.researchLinks.map((link: any, idx: number) => (
              <a
                key={idx}
                href={link.url}
                className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-white/20"
              >
                <div>
                  <div className="font-semibold text-white">{link.title}</div>
                  <div className="text-sm text-text-muted">{link.source}</div>
                </div>
                <ExternalLink size={20} className="text-text-muted" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
