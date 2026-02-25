import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState(null)
  const { signUp, isLoading, isAuthenticated, error, clearError } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalError(null)
    clearError()

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    signUp({ email, password })
  }

  const displayError = localError || error

  return (
    <div className="max-w-sm mx-auto pt-16">
      <h1 className="font-display text-3xl text-fg mb-8">Create account</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {displayError && (
          <div className="bg-danger-surface border border-danger-border rounded-lg p-3 text-sm text-danger-text">
            {displayError}
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
            placeholder="Min. 6 characters"
            className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-default text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-strong transition-colors text-sm"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs uppercase tracking-widest text-fg-muted mb-2">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-fg-faint mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-fg-muted underline underline-offset-2 hover:text-fg transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}