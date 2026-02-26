import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMobileMenu, closeMobileMenu } from '../store/uiSlice'
import DarkModeToggle from './DarkModeToggle'

const NAV_LINKS = [
  { to: '/home', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/recents', label: 'Recents' },
  { to: '/air-quality', label: 'Air Quality' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth()
  const { isMobileMenuOpen } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleToggle = () => dispatch(toggleMobileMenu())
  const handleClose = () => dispatch(closeMobileMenu())

  return (
    <nav className="border-b border-border-subtle bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-sm tracking-[0.2em] uppercase text-fg-muted hover:text-fg transition-colors"
              onClick={handleClose}
            >
              WeatherCheck
            </Link>

            <div className="hidden md:flex ml-10 space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm transition-colors ${
                    location.pathname === link.to
                      ? 'text-fg'
                      : 'text-fg-muted hover:text-fg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <DarkModeToggle />
            {isAuthenticated ? (
              <>
                <span className="text-xs text-fg-faint">{user?.email}</span>
                <button
                  onClick={signOut}
                  className="text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm text-fg border border-border-muted px-4 py-1.5 rounded-full hover:bg-hover transition-colors"
                >
                  Create account
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-1">
            <DarkModeToggle />
            <button
              onClick={handleToggle}
              className="text-fg-muted hover:text-fg p-2 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-subtle">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleClose}
                className={`block px-2 py-2 text-sm transition-colors ${
                  location.pathname === link.to
                    ? 'text-fg'
                    : 'text-fg-muted hover:text-fg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-border-subtle px-4 py-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                <p className="text-xs text-fg-faint">{user?.email}</p>
                <button
                  onClick={() => { signOut(); handleClose() }}
                  className="text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={handleClose} className="block text-sm text-fg-muted hover:text-fg transition-colors">
                  Sign in
                </Link>
                <Link to="/signup" onClick={handleClose} className="block text-sm text-fg">
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
