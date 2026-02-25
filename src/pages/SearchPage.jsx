import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWeather } from '../hooks/useWeather'
import LoadingSpinner from '../components/Spinner'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const {
    searchResults,
    isSearching,
    searchError,
    search,
    clearSearch,
    selectLocation,
  } = useWeather()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length >= 2) {
        search(query)
      } else {
        clearSearch()
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [clearSearch, search, query])

  const handleSelect = (result) => {
    const location = {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country || '',
      timezone: result.timezone || 'auto',
      admin1: result.admin1 || '',
    }
    selectLocation(location)
    navigate('/home')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-4">
      <h1 className="font-display text-2xl text-fg">Search Location</h1>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="City name…"
          className="w-full px-4 py-3 rounded-lg bg-surface border border-border-default text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-strong transition-colors"
          autoFocus
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>

      {searchError && (
        <p className="text-danger-text text-sm">{searchError}</p>
      )}

      {searchResults.length > 0 && (
        <ul className="bg-surface border border-border-subtle rounded-lg divide-y divide-border-subtle overflow-hidden">
          {searchResults.map((result) => (
            <li key={result.id}>
              <button
                onClick={() => handleSelect(result)}
                className="w-full text-left px-4 py-3 hover:bg-hover transition-colors"
              >
                <p className="text-sm text-fg">{result.name}</p>
                <p className="text-xs text-fg-muted mt-0.5">
                  {[result.admin1, result.country].filter(Boolean).join(', ')}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}