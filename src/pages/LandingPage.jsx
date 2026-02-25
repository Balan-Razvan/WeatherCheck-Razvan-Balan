import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-base text-fg flex flex-col font-sans">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-sm tracking-[0.2em] uppercase text-fg-muted">
          weathercheck
        </span>
        <div className="flex items-center gap-6 text-sm text-fg-muted">
          {isAuthenticated ? (
            <span className="text-sm text-gray-500">{user?.email}</span>
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

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-center px-8 pb-24 max-w-5xl mx-auto w-full">
        <p className="text-xs tracking-[0.3em] uppercase text-fg-faint mb-8">
          real-time weather data
        </p>

        <h1
          className="font-display text-fg leading-[0.95] mb-8"
          style={{ fontSize: "var(--size-display-lg)" }}
        >
          Weather,
          <br />
          <span className="text-fg-muted">anywhere.</span>
        </h1>


        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 bg-cta text-cta-fg text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-cta-hover transition-colors"
          >
            Check your local weather
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-fg-muted text-sm px-7 py-3.5 rounded-full border border-border-default hover:border-border-strong hover:text-fg transition-colors"
          >
            Search a city 
          </Link>
        </div>
      </main>
    </div>
  );
}
