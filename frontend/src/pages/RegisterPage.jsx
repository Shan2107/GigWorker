import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    occupation: '',
    age: '',
    email: '',
    password: '',
    passwordConfirm: '',
    profileType: '',   // "artist", "creator", "business"
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleProfileTypeChange(type) {
    setFormData(prev => ({ ...prev, profileType: type }))
  }

  function validate() {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required.'
    if (!formData.surname.trim()) newErrors.surname = 'Surname is required.'
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required.'
    if (!formData.profileType) newErrors.profileType = 'Please choose what describes you best.'

    if (!formData.age) {
      newErrors.age = 'Age is required.'
    } else if (Number(formData.age) <= 0) {
      newErrors.age = 'Age must be a positive number.'
    }

    if (!formData.email) newErrors.email = 'Email is required.'
    if (!formData.password) newErrors.password = 'Password is required.'
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.'

    if (!formData.passwordConfirm)
      newErrors.passwordConfirm = 'Please confirm your password.'
    if (formData.password && formData.passwordConfirm &&
        formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match.'
    }

    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsSubmitting(true)

    try {
      // TODO: replace with your Django endpoint
      // const res = await fetch('/api/auth/register/', { ... })
      console.log('Register data:', formData)

      if (formData.profileType === 'artist') {
        navigate('/dashboard/artist')
      } else if (formData.profileType === 'creator') {
        navigate('/dashboard/creator')
      } else if (formData.profileType === 'business') {
        navigate('/dashboard/business')
      } else {
        alert('Registered successfully (check console). Implement routing per role.')
        navigate('/login')
      }
    } catch (err) {
      setErrors({ global: 'Registration failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Tell us who you are so we can tailor your tools.</p>

        {errors.global && <div className="auth-error">{errors.global}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              {errors.surname && <p className="field-error">{errors.surname}</p>}
            </div>
          </div>

          {/* Role selector */}
          <div className="form-group">
            <label>Which best describes you?</label>
            <div className="role-select">
              <button
                type="button"
                className={
                  'role-pill' +
                  (formData.profileType === 'artist' ? ' role-pill-active' : '')
                }
                onClick={() => handleProfileTypeChange('artist')}
              >
                🎵 Artist / Musician
              </button>
              <button
                type="button"
                className={
                  'role-pill' +
                  (formData.profileType === 'creator' ? ' role-pill-active' : '')
                }
                onClick={() => handleProfileTypeChange('creator')}
              >
                📹 Content Creator
              </button>
              <button
                type="button"
                className={
                  'role-pill' +
                  (formData.profileType === 'business' ? ' role-pill-active' : '')
                }
                onClick={() => handleProfileTypeChange('business')}
              >
                🏪 Small Business
              </button>
            </div>
            {errors.profileType && (
              <p className="field-error">{errors.profileType}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                id="occupation"
                name="occupation"
                placeholder="e.g. Producer, YouTuber, Hair salon owner"
                value={formData.occupation}
                onChange={handleChange}
              />
              {errors.occupation && <p className="field-error">{errors.occupation}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p className="field-error">{errors.age}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
              {errors.passwordConfirm && (
                <p className="field-error">{errors.passwordConfirm}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  )
}