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
    savedLocations,
    search,
    clearSearch,
    selectLocation,
    saveLocation,
    unsaveLocation,
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
    navigate('/')
  }

  const isSaved = (result) =>
    savedLocations.some(
      (loc) =>
        loc.latitude === result.latitude && loc.longitude === result.longitude
    )

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Search Location</h1>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
          autoFocus
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>

      {searchError && (
        <p className="text-red-500 text-sm">{searchError}</p>
      )}

      {searchResults.length > 0 && (
        <ul className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <button
                onClick={() => handleSelect(result)}
                className="flex-1 text-left"
              >
                <p className="font-medium text-gray-900">{result.name}</p>
                <p className="text-sm text-gray-500">
                  {[result.admin1, result.country].filter(Boolean).join(', ')}
                </p>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  isSaved(result)
                    ? unsaveLocation(result)
                    : saveLocation({
                        name: result.name,
                        latitude: result.latitude,
                        longitude: result.longitude,
                        country: result.country || '',
                      })
                }}
                className={`ml-4 text-sm px-3 py-1 rounded-full border transition-colors ${
                  isSaved(result)
                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                    : 'text-gray-400 border-gray-200 hover:text-blue-600 hover:border-blue-200'
                }`}
              >
                {isSaved(result) ? 'Saved' : 'Save'}
              </button>
            </li>
          ))}
        </ul>
      )}

      {savedLocations.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Saved Locations
          </h2>
          <ul className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
            {savedLocations.map((loc) => (
              <li
                key={`${loc.latitude}-${loc.longitude}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <button
                  onClick={() => {
                    selectLocation(loc)
                    navigate('/')
                  }}
                  className="flex-1 text-left"
                >
                  <p className="font-medium text-gray-900">{loc.name}</p>
                  {loc.country && (
                    <p className="text-sm text-gray-500">{loc.country}</p>
                  )}
                </button>
                <button
                  onClick={() => unsaveLocation(loc)}
                  className="ml-4 text-sm text-red-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}