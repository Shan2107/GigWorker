import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { saveAuth } from '../auth'

export default function LoginPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Decide where to send user based on profile_type from backend
  function redirectByRole(profileType) {
    switch (profileType) {
      case 'artist':
        navigate('/dashboard/artist')
        break
      case 'creator':
        navigate('/dashboard/creator')
        break
      case 'business':
        navigate('/dashboard/business')
        break
      default:
        navigate('/dashboard/artist')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors('')

    if (!formData.email || !formData.password) {
      setErrors('Email and password are required.')
      return
    }

    setIsSubmitting(true)
    try {
      // FRONTEND-ONLY EXAMPLE – adjust URL to match Django
      const res = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const detail = data.detail || data.error || 'Invalid email or password.'
        throw new Error(detail)
      }

      const data = await res.json()
      // expected shape: { access, refresh, user: { profile_type, ... } }
      saveAuth({
        access: data.access,
        refresh: data.refresh,
        user: data.user,
      })

      const role = data.user?.profile_type
      redirectByRole(role)
    } catch (err) {
      setErrors(err.message || 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="landing">
      {/* LEFT: Landing / marketing content */}
      <div className="landing-info">
        <span className="pill">GigWorker AI • KION Hackathon</span>

        <h3 className="landing-title">
        GigWorker AI, built to level the playing field, helping emerging artists, creators, and entrepreneurs understand their finances and protect their interests. 
          <span className="landing-highlight"> — stay informed, stay paid, stay compliant</span>
        </h3>

        <p className="landing-subtitle">
          GigWorker AI uses machine learning and language models to help upcoming artists,
          content creators, and small businesses understand their finances and legal
          agreements. We simplify contracts, clarify royalties and split sheets, show
          projected profits, and explain local tax obligations (SARS) in plain language.
          GigWorker uplifts you and help you grow
        </p>

        <ul className="landing-list">
          <li>
            <strong>Artists:</strong> upload a contract and our AI will highlight key terms,
            flag unfair clauses, estimate your take from royalties and splits, and produce
            clear split‑sheet breakdowns.
          </li>
          <li>
            <strong>Content creators:</strong> see what tax you might owe, track platform
            income, and get step‑by‑step guidance for staying SARS‑compliant.
          </li>
          <li>
            <strong>Small businesses:</strong> generate simple financial forecasts, track
            profit vs expenses, and export reports for accountants or grant applications.
          </li>
        </ul>

        
      </div>

      {/* RIGHT: Login card */}
      <div className="auth-card landing-auth-card" aria-labelledby="login-heading">
        <h2 id="login-heading" className="auth-title">Login to GigWorker AI</h2>
        <p className="auth-subtitle">Access your personalised dashboard and AI tools.</p>

        {errors && <div className="auth-error" role="alert">{errors}</div>}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="auth-footer">
          New to GigWorker? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  )
}