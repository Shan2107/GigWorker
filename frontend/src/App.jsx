import { Routes, Route, Link, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ArtistDashboard from './pages/ArtistDashboard'
import BusinessDashboard from './pages/BusinessDashboard'
import CreatorDashboard from './pages/CreatorDashboard'

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/" className="logo">GigWorker AI</Link>
        <nav>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard/artist" element={<ArtistDashboard />} />
          <Route path="/dashboard/business" element={<BusinessDashboard />} />
          <Route path="/dashboard/creator" element={<CreatorDashboard />} />
        </Routes>
      </main>
    </div>
  )
}