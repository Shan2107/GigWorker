import React, { useEffect, useMemo, useState } from 'react'
import {
  loadIncomeEntries,
  saveIncomeEntries,
  calculateIncomeStats,
} from '../utils/income'

function getYearToDateTotal(entries) {
  const now = new Date()
  const year = now.getFullYear()

  return entries.reduce((sum, entry) => {
    const d = new Date(entry.date)
    if (d.getFullYear() === year) {
      return sum + (Number(entry.amount) || 0)
    }
    return sum
  }, 0)
}

// SARS progressive tax calculation (before rebates, medical credits, etc.)
function calculateSarsTax(income) {
  const taxable = Math.max(0, Number(income) || 0)

  if (taxable <= 237100) {
    return 0.18 * taxable
  }

  if (taxable <= 370500) {
    return 42678 + 0.26 * (taxable - 237100)
  }

  if (taxable <= 512800) {
    return 77362 + 0.31 * (taxable - 370500)
  }

  if (taxable <= 673000) {
    return 121475 + 0.36 * (taxable - 512800)
  }

  if (taxable <= 857900) {
    return 179147 + 0.39 * (taxable - 673000)
  }

  if (taxable <= 1817000) {
    return 251258 + 0.41 * (taxable - 857900)
  }

  // 1 817 001 and above
  return 644489 + 0.45 * (taxable - 1817000)
}

export default function ArtistDashboard() {
  const [section, setSection] = useState('overview') // overview | contract | royalty | income | tax | ai

  // Dashboard‑level metrics
  const [ytdIncome, setYtdIncome] = useState(0)
  const [estimatedTax, setEstimatedTax] = useState(0)

  useEffect(() => {
    if (section !== 'overview') return

    const entries = loadIncomeEntries()
    const ytdTotal = getYearToDateTotal(entries)

    const tax = calculateSarsTax(ytdTotal)

    setYtdIncome(ytdTotal)
    setEstimatedTax(tax)
  }, [section])

  return (
    <div className="dashboard-root">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">🎧</span>
          <span className="logo-text">GigWorker AI</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={
              'sidebar-link ' + (section === 'overview' ? 'sidebar-link-active' : '')
            }
            onClick={() => setSection('overview')}
          >
            Dashboard
          </button>
          <button
            className={
              'sidebar-link ' + (section === 'contract' ? 'sidebar-link-active' : '')
            }
            onClick={() => setSection('contract')}
          >
            Contract Analyzer
          </button>
          <button
            className={
              'sidebar-link ' + (section === 'royalty' ? 'sidebar-link-active' : '')
            }
            onClick={() => setSection('royalty')}
          >
            Royalty Calculator
          </button>
          <button
            className={
              'sidebar-link ' + (section === 'income' ? 'sidebar-link-active' : '')
            }
            onClick={() => setSection('income')}
          >
            Income Tracker
          </button>
          <button
            className={
              'sidebar-link ' + (section === 'tax' ? 'sidebar-link-active' : '')
            }
            onClick={() => setSection('tax')}
          >
            Tax Education
          </button>
          <button
            className={
              'sidebar-link ' + (section === 'ai' ? 'sidebar-link-active' : '')
            }
            onClick={() => setSection('ai')}
          >
            AI Assistant
          </button>
        </nav>
      </aside>

      {/* Main content – switches by section */}
      <section className="dashboard-main">
        {section === 'overview' && <OverviewHeader />}
        {section === 'contract' && <ContractHeader />}
        {section === 'royalty' && <RoyaltyHeader />}
        {section === 'income' && <IncomeHeader />}
        {section === 'tax' && <TaxHeader />}
        {section === 'ai' && <AIHeader />}

        {section === 'overview' && (
          <OverviewSection
            ytdIncome={ytdIncome}
            estimatedTax={estimatedTax}
          />
        )}
        {section === 'contract' && <ContractAnalyzerSection />}
        {section === 'royalty' && <RoyaltyCalculatorSection />}
        {section === 'income' && <IncomeTrackerSection />}
        {section === 'tax' && <TaxEducationSection />}
        {section === 'ai' && <AIAssistantSection />}
      </section>
    </div>
  )
}

/* ---------- HEADERS PER SECTION ---------- */

function OverviewHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <div className="dashboard-title-row">
          <span className="dashboard-icon">🎵</span>
          <h1 className="dashboard-title">Artist Dashboard</h1>
        </div>
        <p className="dashboard-subtitle">
          Track royalties, analyze contracts, and manage your music career with AI‑powered tools.
        </p>
      </div>
      <UserBadge label="Artist / Musician" />
    </header>
  )
}

function ContractHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <div className="dashboard-title-row">
          <span className="dashboard-icon">📄</span>
          <h1 className="dashboard-title">AI Contract Analyzer</h1>
        </div>
        <p className="dashboard-subtitle">
          Upload or paste your music contract for AI‑powered breakdown of royalties, rights,
          and red flags.
        </p>
      </div>
      <UserBadge label="Artist / Musician" />
    </header>
  )
}

function RoyaltyHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <div className="dashboard-title-row">
          <span className="dashboard-icon">💿</span>
          <h1 className="dashboard-title">Royalty Calculator</h1>
        </div>
        <p className="dashboard-subtitle">
          Estimate what you should earn from music revenue and streaming based on your deal.
        </p>
      </div>
      <UserBadge label="Artist / Musician" />
    </header>
  )
}

function IncomeHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <div className="dashboard-title-row">
          <span className="dashboard-icon">📈</span>
          <h1 className="dashboard-title">Income Tracker</h1>
        </div>
        <p className="dashboard-subtitle">
          Log income from gigs, streaming, merch, and sync in one place.
        </p>
      </div>
      <UserBadge label="Artist / Musician" />
    </header>
  )
}

function TaxHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <div className="dashboard-title-row">
          <span className="dashboard-icon">📚</span>
          <h1 className="dashboard-title">Tax Education</h1>
        </div>
        <p className="dashboard-subtitle">
          Understand SARS obligations as an artist and avoid surprise tax bills.
        </p>
      </div>
      <UserBadge label="Artist / Musician" />
    </header>
  )
}

function AIHeader() {
  return (
    <header className="dashboard-header">
      <div>
        <div className="dashboard-title-row">
          <span className="dashboard-icon">🤖</span>
          <h1 className="dashboard-title">AI Assistant</h1>
        </div>
        <p className="dashboard-subtitle">
          Ask questions about contracts, royalties, budgeting, and tax in plain language.
        </p>
      </div>
      <UserBadge label="Artist / Musician" />
    </header>
  )
}

function UserBadge({ label }) {
  return (
    <div className="dashboard-user">
      <span className="user-avatar">A</span>
      <div>
        <div className="user-name">Artist Name</div>
        <div className="user-role">{label}</div>
      </div>
    </div>
  )
}

/* ---------- OVERVIEW SECTION ---------- */

function OverviewSection({ ytdIncome, estimatedTax }) {
  const safeYtd = Number.isFinite(ytdIncome) ? ytdIncome : 0
  const safeTax = Number.isFinite(estimatedTax) ? estimatedTax : 0

  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <p className="metric-label">Total Income (YTD)</p>
          <p className="metric-value">R {safeYtd.toFixed(2)}</p>
          <p className="metric-caption">
            Year to date from streaming, gigs, and royalties
          </p>
        </div>

        <div className="metric-card">
          <p className="metric-label">Estimated Tax</p>
          <p className="metric-value metric-warning">R {safeTax.toFixed(2)}</p>
          <p className="metric-caption">
  Approximate SARS income tax on your YTD income (before rebates).
</p>
        </div>

        <div className="metric-card">
          <p className="metric-label">Next Tax Deadline</p>
          <p className="metric-value">28 Feb</p>
          <p className="metric-caption">Provisional tax payment</p>
        </div>
      </div>

      <h2 className="section-title">Quick Actions</h2>
      <div className="quick-grid">
        {/* Quick cards unchanged */}
        <div className="quick-card">
          <div className="quick-icon quick-icon-purple">📄</div>
          <h3 className="quick-title">Analyze Contract</h3>
          <p className="quick-text">
            Let AI explain royalty terms, rights, and red flags before you sign.
          </p>
        </div>

        <div className="quick-card">
          <div className="quick-icon quick-icon-blue">🧮</div>
          <h3 className="quick-title">Calculate Royalties</h3>
          <p className="quick-text">
            Use revenue or streaming numbers to estimate what you should be paid.
          </p>
        </div>

        <div className="quick-card">
          <div className="quick-icon quick-icon-green">📈</div>
          <h3 className="quick-title">Track Income</h3>
          <p className="quick-text">
            Combine gig, merch, and streaming income to see your real earnings.
          </p>
        </div>

        <div className="quick-card">
          <div className="quick-icon quick-icon-orange">📚</div>
          <h3 className="quick-title">Learn Your Tax</h3>
          <p className="quick-text">
            Get SARS‑specific guidance for independent artists and bands.
          </p>
        </div>
      </div>
    </>
  )
}

/* ---------- CONTRACT ANALYZER SECTION ---------- */

function ContractAnalyzerSection() {
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState(null)
  
    async function handleAnalyze() {
      if (!text.trim()) return
      setLoading(true)
      try {
        // TODO: replace with Django AI endpoint call
        const mock = {
          overview:
            'This agreement grants the label non‑exclusive rights to distribute your recordings with a recoupable advance and royalties on net revenue.',
          artistPros: [
            'Non‑exclusive rights allow independent releases.',
            'Royalty rate is within normal range for a new artist.',
          ],
          labelPros: [
            'Recoupable advance and marketing costs favour the label.',
          ],
          redFlags: [
            'No clear contract term (end date) specified.',
            'Cross‑collateralisation across multiple releases.',
          ],
          royaltyRate: 'Recording royalty: 18% of net revenue on streaming and downloads.',
          suggestions: [
            'Ask for a fixed contract term (e.g. 3–5 years) instead of perpetual.',
            'Limit recoupment to specific releases and pre‑approved costs.',
            'Negotiate higher royalty if you bring an existing catalogue or fanbase.',
          ],
        }
        setSummary(mock)
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <>
        {/* INPUT CARD */}
        <div className="tool-card">
          <div className="tool-card-header">
            <span>📥</span>
            <div>
              <div className="tool-card-title">Contract Input</div>
              <div className="tool-card-sub">
                Paste the full text of your contract for best results.
              </div>
            </div>
          </div>
  
          <label
            style={{
              fontSize: '0.8rem',
              color: '#9ca3af',
              marginBottom: '0.25rem',
              display: 'block',
            }}
          >
            Paste Contract Text
          </label>
          <textarea
            className="tool-textarea"
            rows={10}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your contract here... Include all terms, royalty rates, advances, recoupment, and termination clauses."
          />
  
          <div className="tool-tip">
            <strong>Tip:</strong> include advances, royalty %, term, territory, recoupment,
            and rights granted. AI will summarise and highlight what favours you vs the label.
          </div>
  
          <button
            className="tool-button"
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
          >
            {loading ? 'Analyzing…' : 'Analyze with AI'}
          </button>
        </div>
  
        {/* AI RESULT CARD */}
        <div className="tool-card">
          <div className="tool-card-header">
            <span>🧠</span>
            <div>
              <div className="tool-card-title">AI Analysis Results</div>
              <div className="tool-card-sub">
                High‑level summary, royalty insight, and negotiation suggestions.
              </div>
            </div>
          </div>
  
          {!summary ? (
            <div className="analysis-empty">
              No analysis yet. Paste your contract and click &quot;Analyze with AI&quot;.
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                <strong>Overview: </strong>
                {summary.overview}
              </p>
  
              <div className="analysis-grid">
                <div className="analysis-pill purple">
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                    Key Terms / Royalty
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    <li>{summary.royaltyRate}</li>
                    {summary.artistPros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
  
                <div className="analysis-pill blue">
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                    Label’s Position
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    {summary.labelPros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
  
                <div className="analysis-pill red">
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
                    Red Flags / Watch‑outs
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                    {summary.redFlags.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
  
              <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                <strong>Suggestions to Negotiate:</strong>
                <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1rem' }}>
                  {summary.suggestions.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
  
        {/* EDUCATIONAL INFO CARD – scrollable below */}
        <div className="tool-card">
          <div className="tool-card-header">
            <span>📚</span>
            <div>
              <div className="tool-card-title">Understanding Music Contracts</div>
              <div className="tool-card-sub">
                Key terms, fair royalty ranges, and red flags to watch for.
              </div>
            </div>
          </div>
  
          <div className="contract-info-grid">
            <div className="contract-info-pill contract-info-purple">
              <h4>Key Terms to Know</h4>
              <ul>
                <li>
                  <strong>Advance:</strong> upfront payment against future royalties.
                </li>
                <li>
                  <strong>Royalty Rate:</strong> percentage you earn per sale/stream.
                </li>
                <li>
                  <strong>Recoupment:</strong> when the label recovers advances from your
                  earnings.
                </li>
                <li>
                  <strong>Territory:</strong> geographic areas where the contract applies.
                </li>
                <li>
                  <strong>Term:</strong> how long the contract lasts (years / releases).
                </li>
              </ul>
            </div>
  
            <div className="contract-info-pill contract-info-blue">
              <h4>Fair Royalty Rates</h4>
              <ul>
                <li>
                  <strong>Recording:</strong> 15–20% is standard for new artists.
                </li>
                <li>
                  <strong>Publishing:</strong> 50/50 split is common.
                </li>
                <li>
                  <strong>Streaming:</strong> varies by platform and deal structure.
                </li>
                <li>
                  <strong>Independent:</strong> keeping 80–90%+ is possible if you release
                  yourself.
                </li>
              </ul>
            </div>
  
            <div className="contract-info-pill contract-info-green">
              <h4>Red Flags to Avoid</h4>
              <ul>
                <li>Perpetual or lifetime rights with no clear end date.</li>
                <li>No termination clause or way to leave the deal.</li>
                <li>Unclear or vague payment and reporting terms.</li>
                <li>Royalty rate below 10% with heavy recoupment.</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

/* ---------- ROYALTY CALCULATOR SECTION (no split-sheet tab) ---------- */

function RoyaltyCalculatorSection() {
  const [tab, setTab] = useState('royalty') // 'royalty' | 'streaming'

  // Royalty tab state
  const [revenue, setRevenue] = useState(100000)
  const [rate, setRate] = useState(15)

  // Streaming tab state
  const [streams, setStreams] = useState(1000000)
  const [perStream, setPerStream] = useState(0.004)

  const royaltyEarnings = (Number(revenue) * Number(rate || 0)) / 100
  const streamingRevenue = Number(streams) * Number(perStream || 0)

  return (
    <>
      <div className="royalty-tabs">
        <button
          className={
            'royalty-tab ' + (tab === 'royalty' ? 'royalty-tab-active' : '')
          }
          onClick={() => setTab('royalty')}
        >
          Royalty (Revenue %)
        </button>
        <button
          className={
            'royalty-tab ' + (tab === 'streaming' ? 'royalty-tab-active' : '')
          }
          onClick={() => setTab('streaming')}
        >
          Streaming (Per Stream)
        </button>
      </div>

      {tab === 'royalty' && (
        <div className="tool-card">
          <div className="tool-card-header">
            <span>📈</span>
            <div>
              <div className="tool-card-title">Revenue‑Based Royalty</div>
              <div className="tool-card-sub">
                Use this if your contract pays you a % of total revenue (sales + streams).
              </div>
            </div>
          </div>

          <label style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            Total Revenue (ZAR)
          </label>
          <input
            className="tool-input"
            type="number"
            value={revenue}
            onChange={e => setRevenue(e.target.value)}
            min="0"
          />
          <p className="tool-card-sub">
            Total sales / streaming revenue generated by your music.
          </p>

          <label style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            Your Royalty Rate (%)
          </label>
          <input
            className="tool-input"
            type="number"
            value={rate}
            onChange={e => setRate(e.target.value)}
            min="0"
            max="100"
          />
          <p className="tool-card-sub">
            Percentage you receive from total revenue (e.g. 15–20% for recording,
            50% for publishing).
          </p>

          <div
            style={{
              marginTop: '1rem',
              borderRadius: '0.9rem',
              padding: '0.9rem',
              background: 'rgba(147, 51, 234, 0.15)',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>
              Total Royalty Earnings
            </div>
            <div
              style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                marginTop: '0.25rem',
              }}
            >
              R {royaltyEarnings.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {tab === 'streaming' && (
        <div className="tool-card">
          <div className="tool-card-header">
            <span>🎧</span>
            <div>
              <div className="tool-card-title">Streaming Calculator</div>
              <div className="tool-card-sub">
                Estimate revenue from streams based on a per‑stream rate.
              </div>
            </div>
          </div>

          <label style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            Total Streams
          </label>
          <input
            className="tool-input"
            type="number"
            value={streams}
            onChange={e => setStreams(e.target.value)}
            min="0"
          />

          <label style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.6rem' }}>
            Per Stream Rate (ZAR)
          </label>
          <input
            className="tool-input"
            type="number"
            step="0.0001"
            value={perStream}
            onChange={e => setPerStream(e.target.value)}
            min="0"
          />
          <p className="tool-card-sub">
            Average per‑stream payout. Spotify ≈ R0.004, Apple Music ≈ R0.01 (varies).
          </p>

          <div
            style={{
              marginTop: '1rem',
              borderRadius: '0.9rem',
              padding: '0.9rem',
              background: 'rgba(59, 130, 246, 0.15)',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>
              Total Streaming Revenue
            </div>
            <div
              style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                marginTop: '0.25rem',
              }}
            >
              R {streamingRevenue.toFixed(2)}
            </div>
          </div>

          <div className="tool-tip" style={{ marginTop: '1rem' }}>
            <strong>Platform examples (per stream):</strong>
            <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1rem', fontSize: '0.8rem' }}>
              <li>Apple Music: ~R0.01</li>
              <li>Spotify: ~R0.004</li>
              <li>YouTube Music: ~R0.008</li>
              <li>Tidal: ~R0.013</li>
              <li>Deezer: ~R0.006</li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

/* ---------- PLACEHOLDER SECTIONS (Income / Tax / AI) ---------- */

function IncomeTrackerSection() {
  const todayISO = new Date().toISOString().slice(0, 10)

  const [entries, setEntries] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [form, setForm] = useState({
    date: todayISO,
    source: 'Spotify',
    description: '',
    amount: '',
  })

  const [errors, setErrors] = useState({})

  // Load existing entries from localStorage
  useEffect(() => {
    const saved = loadIncomeEntries()
    if (saved.length) {
      saved.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      setEntries(saved)
    }
  }, [])

  // Persist entries whenever they change
  useEffect(() => {
    saveIncomeEntries(entries)
  }, [entries])

  const stats = useMemo(
    () => calculateIncomeStats(entries),
    [entries]
  )

  function openModal() {
    setErrors({})
    setForm({
      date: todayISO,
      source: 'Spotify',
      description: '',
      amount: '',
    })
    setIsModalOpen(true)
  }

  function closeModal() {
    if (isSaving) return
    setIsModalOpen(false)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validateForm() {
    const newErrors = {}

    if (!form.date) {
      newErrors.date = 'Date is required.'
    }

    if (!form.source || !form.source.trim()) {
      newErrors.source = 'Platform / source is required.'
    }

    if (!form.amount) {
      newErrors.amount = 'Amount is required.'
    } else {
      const value = Number(form.amount)
      if (Number.isNaN(value) || value <= 0) {
        newErrors.amount = 'Enter a positive amount.'
      }
    }

    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validateForm()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setErrors({})
    setIsSaving(true)

    try {
      const amountNumber = Number(form.amount)

      const newEntry = {
        id: Date.now().toString(),
        date: form.date,
        source: form.source.trim(),
        description: form.description.trim(),
        amount: amountNumber,
      }

      setEntries(prev =>
        [...prev, newEntry].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      )

      setIsModalOpen(false)
    } catch (err) {
      setErrors({
        global: 'Could not save this income entry. Please try again.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="income-section">
      {/* Header row */}
      <div className="income-header">
        <div>
          <h2 className="income-title">Income Tracker</h2>
          <p className="income-subtitle">
            Track income from your gigs, streams, and merch – all in one place.
          </p>
        </div>
        <button
          type="button"
          className="income-add-btn"
          onClick={openModal}
        >
          + Add Income
        </button>
      </div>

      {/* Summary tiles (front‑end calculations) */}
      <div className="metric-grid income-metric-grid">
        <div className="metric-card">
          <div className="metric-label">Total Income</div>
          <div className="metric-value">R {stats.total.toFixed(2)}</div>
          <p className="metric-caption">Across all entries</p>
        </div>
        <div className="metric-card">
          <div className="metric-label">This Month</div>
          <div className="metric-value">R {stats.thisMonthTotal.toFixed(2)}</div>
          <p className="metric-caption">Current period</p>
        </div>
        <div className="metric-card">
          <div className="metric-label">Transactions</div>
          <div className="metric-value">{stats.count}</div>
          <p className="metric-caption">Total logged</p>
        </div>
      </div>

      {/* History card */}
      <div className="tool-card income-history">
        <div className="tool-card-header">
          <span>📜</span>
          <div>
            <div className="tool-card-title">Income History</div>
            <div className="tool-card-sub">
              Recent payouts and gig payments you&apos;ve logged.
            </div>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="income-empty">
            <div className="income-empty-icon">$</div>
            <p className="income-empty-title">No income entries yet</p>
            <p className="income-empty-text">
              Click <strong>&quot;Add Income&quot;</strong> to start tracking your earnings.
            </p>
          </div>
        ) : (
          <div className="income-table-wrapper">
            <table className="income-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Platform / Source</th>
                  <th>Description</th>
                  <th className="income-amount-col">Amount (ZAR)</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.date}</td>
                    <td>{entry.source}</td>
                    <td>{entry.description || '—'}</td>
                    <td className="income-amount-col">
                      R {entry.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Income modal */}
      {isModalOpen && (
        <div className="income-modal-overlay" onClick={closeModal}>
          <div
            className="income-modal auth-card"
            onClick={e => e.stopPropagation()}
          >
            <div className="income-modal-header">
              <h3 className="income-modal-title">Add New Income</h3>
              <button
                type="button"
                className="income-modal-close"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            {errors.global && (
              <div className="auth-error" style={{ marginTop: 0 }}>
                {errors.global}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form income-form">
              <div className="form-group">
                <label htmlFor="income-date">Date</label>
                <input
                  id="income-date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <p className="field-error">{errors.date}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="income-source">Platform / Source</label>
                <select
                  id="income-source"
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  className="income-select"
                >
                  <option value="Spotify">Spotify</option>
                  <option value="Apple Music">Apple Music</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Live Gig">Live Gig</option>
                  <option value="Merch">Merch</option>
                  <option value="Sync / Licensing">Sync / Licensing</option>
                  <option value="Other">Other</option>
                </select>
                {errors.source && (
                  <p className="field-error">{errors.source}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="income-description">Description</label>
                <input
                  id="income-description"
                  name="description"
                  placeholder="Brief description (optional)"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="income-amount">Amount (ZAR)</label>
                <input
                  id="income-amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={handleChange}
                />
                {errors.amount && (
                  <p className="field-error">{errors.amount}</p>
                )}
              </div>

              <button
                type="submit"
                className="auth-button income-submit"
                disabled={isSaving}
              >
                {isSaving ? 'Adding income…' : 'Add Income'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

function TaxEducationSection() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>📚</span>
        <div>
          <div className="tool-card-title">Tax Education for Artists</div>
          <div className="tool-card-sub">
            Short, AI‑generated explainers tailored to South African musicians.
          </div>
        </div>
      </div>
      <ul style={{ fontSize: '0.85rem', color: '#e5e7eb', paddingLeft: '1rem' }}>
        <li>What counts as taxable income for artists?</li>
        <li>Which music‑related expenses you can usually deduct.</li>
        <li>How provisional tax works when your income is irregular.</li>
        <li>Simple checklists for staying SARS compliant through the year.</li>
      </ul>
    </div>
  )
}

function AIAssistantSection() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>🤖</span>
        <div>
          <div className="tool-card-title">AI Assistant</div>
          <div className="tool-card-sub">
            Chat with an AI about contracts, royalties, touring budgets, and more.
          </div>
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.7rem' }}>
        This will connect to your Django AI endpoint. For now, imagine asking:
      </p>
      <ul style={{ fontSize: '0.85rem', color: '#e5e7eb', paddingLeft: '1rem' }}>
        <li>&quot;Is this label contract fair for a first release?&quot;</li>
        <li>&quot;If my song does 500k streams on Spotify, how much should I get?&quot;</li>
        <li>&quot;How much must I set aside for tax this quarter?&quot;</li>
      </ul>
    </div>
  )
}