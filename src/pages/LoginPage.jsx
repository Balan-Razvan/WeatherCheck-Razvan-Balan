import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, isLoading, isAuthenticated, error, clearError } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/home'
    return <Navigate to={from} replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearError()
    signIn({ email, password })
  }

  return (
    <div className="max-w-sm mx-auto pt-16">
      <h1 className="font-display text-3xl text-fg mb-8">Sign in</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-danger-surface border border-danger-border rounded-lg p-3 text-sm text-danger-text">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-fg-muted mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-default text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-strong transition-colors text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs uppercase tracking-widest text-fg-muted mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-default text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-strong transition-colors text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cta text-cta-fg py-2.5 rounded-full text-sm font-medium hover:bg-cta-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-sm text-fg-faint mt-6">
        No account?{' '}
        <Link to="/signup" className="text-fg-muted underline underline-offset-2 hover:text-fg transition-colors">
          Create one
        </Link>
      </p>
    </div>
  )
}
