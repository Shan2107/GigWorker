import { useState } from 'react'

export default function BusinessDashboard() {
  const [section, setSection] = useState('overview') // overview | planner | finance | tax | ai

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">🏦</span>
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
            className={'sidebar-link ' + (section === 'planner' ? 'sidebar-link-active' : '')}
            onClick={() => setSection('planner')}
          >
            Business Planner
          </button>
          <button
            className={'sidebar-link ' + (section === 'finance' ? 'sidebar-link-active' : '')}
            onClick={() => setSection('finance')}
          >
            Finance Tracker
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
        <BusinessHeader section={section} />

        {section === 'overview' && <BusinessOverview />}
        {section === 'planner' && <BusinessPlanner />}
        {section === 'finance' && <BusinessFinance />}
        {section === 'tax' && <BusinessTax />}
        {section === 'ai' && <BusinessAI />}
      </section>
    </div>
  )
}

function BusinessHeader({ section }) {
  const titles = {
    overview: 'Business Dashboard',
    planner: 'Business Planner',
    finance: 'Finance Tracker',
    tax: 'Tax Education',
    ai: 'AI Assistant',
  }

  const subtitles = {
    overview: 'Plan finances, track profits, and grow your business with AI‑powered projections.',
    planner: 'Create simple forecasts for revenue, expenses, and cash flow.',
    finance: 'Track what comes in and goes out so you always know your runway.',
    tax: 'Understand SARS requirements for small businesses.',
    ai: 'Ask questions about pricing, cash flow, and tax in plain language.',
  }

  const icon = {
    overview: '🏬',
    planner: '📊',
    finance: '💵',
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
        <span className="user-avatar">B</span>
        <div>
          <div className="user-name">Business Owner</div>
          <div className="user-role">Small Business</div>
        </div>
      </div>
    </header>
  )
}

/* sections */

function BusinessOverview() {
  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <p className="metric-label">Total Income (YTD)</p>
          <p className="metric-value">R 0.00</p>
          <p className="metric-caption">Sales and service income year to date</p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Estimated Tax</p>
          <p className="metric-value metric-warning">R 0.00</p>
          <p className="metric-caption">~28% of business profits</p>
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
          <div className="quick-icon quick-icon-green">📊</div>
          <h3 className="quick-title">Business Planner</h3>
          <p className="quick-text">AI‑assisted projections for revenue, costs, and profit.</p>
        </div>
        <div className="quick-card">
          <div className="quick-icon quick-icon-blue">💵</div>
          <h3 className="quick-title">Track Income</h3>
          <p className="quick-text">Record monthly revenue and expenses to see true margins.</p>
        </div>
        <div className="quick-card">
          <div className="quick-icon quick-icon-orange">📚</div>
          <h3 className="quick-title">Tax Education</h3>
          <p className="quick-text">Learn SARS rules for micro and small businesses.</p>
        </div>
        <div className="quick-card">
          <div className="quick-icon quick-icon-purple">🤖</div>
          <h3 className="quick-title">AI Assistant</h3>
          <p className="quick-text">Ask about pricing, VAT, and cash flow decisions.</p>
        </div>
      </div>
    </>
  )
}

function BusinessPlanner() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>📊</span>
        <div>
          <div className="tool-card-title">Business Planner (mock)</div>
          <div className="tool-card-sub">
            Plan monthly revenue and expenses; AI can suggest targets later.
          </div>
        </div>
      </div>
      <p className="tool-card-sub">
        For the hackathon, this can stay static or pull mock data. Later, connect to Django
        for real projections based on your historical income and spend.
      </p>
    </div>
  )
}

function BusinessFinance() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>💵</span>
        <div>
          <div className="tool-card-title">Finance Tracker (mock)</div>
          <div className="tool-card-sub">
            Central place to log revenue, COGS, rent, salaries, and more.
          </div>
        </div>
      </div>
      <p className="tool-card-sub">
        This will eventually display charts for income vs expenses and profit over time, with
        AI notes about healthy vs risky trends.
      </p>
    </div>
  )
}

function BusinessTax() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>📚</span>
        <div>
          <div className="tool-card-title">Tax Education</div>
          <div className="tool-card-sub">
            Bite‑size explainers on SARS for local businesses.
          </div>
        </div>
      </div>
      <ul style={{ fontSize: '0.85rem', paddingLeft: '1rem' }}>
        <li>Turnover tax vs normal company tax.</li>
        <li>What records you must keep (invoices, slips, payroll).</li>
        <li>When provisional tax and VAT submissions are due.</li>
      </ul>
    </div>
  )
}

function BusinessAI() {
  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <span>🤖</span>
        <div>
          <div className="tool-card-title">AI Assistant</div>
          <div className="tool-card-sub">
            Planned chat interface for all finance and tax questions.
          </div>
        </div>
      </div>
      <p className="tool-card-sub">
        Later, this will call your Django AI endpoint.  
        Example questions: 
        &quot;How much should I charge to hit 30% profit?&quot;, 
        &quot;Can I deduct this expense?&quot;
      </p>
    </div>
  )
}