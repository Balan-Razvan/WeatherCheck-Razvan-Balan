import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DarkModeToggle from "../components/DarkModeToggle";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-base text-fg flex flex-col font-sans">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-sm tracking-[0.2em] uppercase text-fg-muted">
          WeatherCheck
        </span>
        <div className="flex items-center gap-4 text-sm text-fg-muted">
          <DarkModeToggle />
          {isAuthenticated ? (
            <Link to="/home" className="hover:text-fg transition-colors">
              Go to app →
            </Link>
          ) : (
            <>
              <Link to="/login" className="hover:text-fg transition-colors">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="text-fg border border-border-muted px-4 py-1.5 rounded-full hover:bg-hover transition-colors"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center px-8 pb-24 max-w-5xl mx-auto w-full">
        <p className="text-xs tracking-[0.3em] uppercase text-fg-faint mb-8">
          Real-time · Global · Free
        </p>

        <h1
          className="font-display text-fg leading-[0.95] mb-8"
          style={{ fontSize: "var(--size-display-lg)" }}
        >
          Weather,<br />
          <span className="text-fg-muted">anywhere.</span>
        </h1>

        <p className="text-fg-muted text-lg max-w-md mb-12 leading-relaxed">
          Current conditions, forecasts and air quality for any city on earth.
          No clutter, no noise — just the data you need.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 bg-cta text-cta-fg text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-cta-hover transition-colors"
          >
            Check your weather
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-fg-muted text-sm px-7 py-3.5 rounded-full border border-border-default hover:border-border-strong hover:text-fg transition-colors"
          >
            Search a city
          </Link>
        </div>
      </main>

      <footer className="px-8 py-5 border-t border-border-subtle text-xs text-fg-faint flex justify-between">
        <span>Razvan Balan</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
