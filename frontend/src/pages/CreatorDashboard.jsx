import { useState } from 'react'

export default function CreatorDashboard() {
  const [section, setSection] = useState('overview') // overview | income | tax | ai

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">📹</span>
          <span className="logo-text">GigWorker AI</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={'sidebar-link ' + (section === 'overview' ? 'sidebar-link-active' : '')}
            onClick={() => setSection('overview')}
          >
            Dashboard
          </button>
          <button
            className={'sidebar-link ' + (section === 'income' ? 'sidebar-link-active' : '')}
            onClick={() => setSection('income')}
          >
            Income Tracker
          </button>
          <button
            className={'sidebar-link ' + (section === 'tax' ? 'sidebar-link-active' : '')}
            onClick={() => setSection('tax')}
          >
            Tax Education
          </button>
          <button
            className={'sidebar-link ' + (section === 'ai' ? 'sidebar-link-active' : '')}
            onClick={() => setSection('ai')}
          >
            AI Assistant
          </button>
        </nav>
      </aside>

      <section className="dashboard-main">
        <CreatorHeader section={section} />

        {section === 'overview' && <CreatorOverview />}
        {section === 'income' && <CreatorIncome />}
        {section === 'tax' && <CreatorTax />}
        {section === 'ai' && <CreatorAI />}
      </section>
    </div>
  )
}

function CreatorHeader({ section }) {
  const titles = {
    overview: 'Creator Dashboard',
    income: 'Income Tracker',
    tax: 'Tax Education',
    ai: 'AI Assistant',
  }

  const subtitles = {
    overview: 'Monitor platform income, stay SARS compliant, and grow your brand.',
    income: 'Combine earnings from YouTube, TikTok, Instagram, and sponsorships.',
    tax: 'Understand how creator income is taxed and what you can deduct.',
    ai: 'Ask the AI about brand deals, CPMs, and tax in simple language.',
  }

  const icon = {
    overview: '🎥',
    income: '📈',
    tax: '📚',
    ai: '🤖',
  }[section]

  return (
    <header className="dashboard-header">
      <div>
        <div className="dashboard-title-row">
          <span className="dashboard-icon">{icon}</span>
          <h1 className="dashboard-title">{titles[section]}</h1>
        </div>
        <p className="dashboard-subtitle">{subtitles[section]}</p>
      </div>

      <div className="dashboard-user">
        <span className="user-avatar">C</span>
        <div>
          <div className="user-name">Creator Name</div>
          <div className="user-role">Content Creator</div>
        </div>
      </div>
    </header>
  )
}

/* sections */

function CreatorOverview() {
  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <p className="metric-label">Total Income (YTD)</p>
          <p className="metric-value">R 0.00</p>
          <p className="metric-caption">YouTube, TikTok, sponsorships, and more</p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Estimated Tax</p>
          <p className="metric-value metric-warning">R 0.00</p>
          <p className="metric-caption">~18% of creator income</p>
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
          <div className="quick-icon quick-icon-blue">📈</div>
          <h3 className="quick-title">Track Income</h3>
          <p className="quick-text">See income from all platforms in one view.</p>
        </div>
        <div className="quick-card">
          <div className="quick-icon quick-icon-orange">⚠️</div>
          <h3 className="quick-title">Tax Education</h3>
          <p className="quick-text">Learn what counts as income and when to pay SARS.</p>
        </div>
        <div className="quick-card">
          <div className="quick-icon quick-icon-purple">🤖</div>
          <h3 className="quick-title">AI Assistant</h3>
          <p className="quick-text">Ask about brand deals, CPMs, and tax deductions.</p>
        </div>
      </div>
    </>
  )
}

function CreatorIncome() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>📈</span>
        <div>
          <div className="tool-card-title">Income Tracker (mock)</div>
          <div className="tool-card-sub">
            Log payouts from YouTube, TikTok, Instagram, Twitch, and sponsorships.
          </div>
        </div>
      </div>
      <p className="tool-card-sub">
        Later this will show charts by platform, month‑to‑month growth, and AI comments
        about how stable or risky your creator income is.
      </p>
    </div>
  )
}

function CreatorTax() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>📚</span>
        <div>
          <div className="tool-card-title">Tax Education</div>
          <div className="tool-card-sub">
            Designed for South African creators who earn from multiple platforms.
          </div>
        </div>
      </div>
      <ul style={{ fontSize: '0.85rem', paddingLeft: '1rem' }}>
        <li>How platform payouts and sponsorships are taxed.</li>
        <li>What expenses you can usually claim (equipment, data, editing).</li>
        <li>How to avoid surprises by setting aside tax monthly.</li>
      </ul>
    </div>
  )
}

function CreatorAI() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>🤖</span>
        <div>
          <div className="tool-card-title">AI Assistant</div>
          <div className="tool-card-sub">
            Future chat interface for creator‑specific questions.
          </div>
        </div>
      </div>
      <p className="tool-card-sub">
        Example questions:
        &quot;If my CPM is R50 and I get 100k views, how much do I make?&quot;,
        &quot;How should I split income with a collaborator?&quot;,
        &quot;What should I keep for SARS?&quot;
      </p>
    </div>
  )
}