import { useState } from 'react'

export default function ContractAnalyzer() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)

  async function handleAnalyze() {
    if (!text.trim()) return
    setLoading(true)

    try {
      // TODO: call Django /api/ai/contract-analyze/ endpoint
      // For now, mock some structured output:
      const mock = {
        overview:
          'This contract gives the label non‑exclusive rights to distribute your recordings, with a recoupable advance and royalty payments on net revenue.',
        artistPros: [
          'Non‑exclusive rights mean you can still release independently.',
          'Royalty rate is within normal range for new artists.',
        ],
        labelPros: ['Recoupable advance and control over marketing spend.'],
        redFlags: [
          'No clear end date / term defined.',
          'Cross‑collateralisation across all releases.',
        ],
        royaltyRate: '18% of net revenue on streaming and downloads.',
        suggestions: [
          'Ask for a fixed contract term (e.g. 3–5 years) instead of perpetual.',
          'Limit recoupment to specific costs and releases.',
          'Negotiate higher royalty rate if you bring existing catalogue or audience.',
        ],
      }
      setSummary(mock)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-root">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">🎧</span>
          <span className="logo-text">GigWorker AI</span>
        </div>

        <nav className="sidebar-nav">
          <button className="sidebar-link">Dashboard</button>
          <button className="sidebar-link sidebar-link-active">Contract Analyzer</button>
          <button className="sidebar-link">Royalty Calculator</button>
          <button className="sidebar-link">Income Tracker</button>
          <button className="sidebar-link">Tax Education</button>
          <button className="sidebar-link">AI Assistant</button>
        </nav>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <div className="dashboard-title-row">
              <span className="dashboard-icon">📄</span>
              <h1 className="dashboard-title">AI Contract Analyzer</h1>
            </div>
            <p className="dashboard-subtitle">
              Upload or paste your music contract for AI‑powered breakdown of royalties,
              rights, and red flags.
            </p>
          </div>
        </header>

        {/* Contract input */}
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

          <label style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.25rem', display: 'block' }}>
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
            <strong>Tip:</strong> include sections on advances, royalty %, rights granted,
            recoupment, and term. AI will summarise and highlight areas to negotiate.
          </div>

          <button
            className="tool-button"
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
          >
            {loading ? 'Analyzing…' : 'Analyze with AI'}
          </button>
        </div>

        {/* Analysis results */}
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
                <strong>Overview: </strong>{summary.overview}
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
      </section>
    </div>
  )
}