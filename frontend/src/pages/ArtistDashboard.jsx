import { useState } from 'react'

export default function ArtistDashboard() {
  const [section, setSection] = useState('overview') // overview | contract | royalty | income | tax | ai

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

        {section === 'overview' && <OverviewSection />}
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

function OverviewSection() {
  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <p className="metric-label">Total Income (YTD)</p>
          <p className="metric-value">R 0.00</p>
          <p className="metric-caption">
            Year to date from streaming, gigs, and royalties
          </p>
        </div>

        <div className="metric-card">
          <p className="metric-label">Estimated Tax</p>
          <p className="metric-value metric-warning">R 0.00</p>
          <p className="metric-caption">~18% of your declared income</p>
        </div>

        <div className="metric-card">
          <p className="metric-label">Next Tax Deadline</p>
          <p className="metric-value">28 Feb</p>
          <p className="metric-caption">Provisional tax payment</p>
        </div>
      </div>

      <h2 className="section-title">Quick Actions</h2>
      <div className="quick-grid">
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
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>📊</span>
        <div>
          <div className="tool-card-title">Income Tracker (coming soon)</div>
          <div className="tool-card-sub">
            You&apos;ll be able to log gig fees, merch sales, and platform payouts here.
          </div>
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
        This section will show charts for income by source (Spotify, Apple Music, gigs,
        sync, etc.) and help you see which parts of your music career are paying the most.
      </p>
    </div>
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