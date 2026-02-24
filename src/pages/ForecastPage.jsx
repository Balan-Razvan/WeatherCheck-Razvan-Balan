import { useWeather } from '../hooks/useWeather'
import LoadingSpinner from '../components/Spinner'
import ErrorMessage from '../components/Error'

export default function ForecastPage() {
  const {
    currentLocation,
    forecast,
    isLoadingForecast,
    forecastError,
    selectLocation,
  } = useWeather()

  if (!currentLocation) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">
          No location selected. Search for a city first.
        </p>
      </div>
    )
  }

  if (isLoadingForecast) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (forecastError) {
    return (
      <ErrorMessage
        message={forecastError}
        onRetry={() => selectLocation(currentLocation)}
      />
    )
  }

  if (!forecast) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">No forecast data available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Forecast for {currentLocation.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Detailed hourly and daily weather forecast
        </p>
      </div>

      {/* Placeholder: implement hourly forecast chart/cards here */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Hourly Forecast
        </h2>
        <p className="text-gray-300 text-sm">
          Implement hourly temperature, precipitation, and wind cards here.
          Data available at <code className="text-gray-400">forecast.hourly</code>.
        </p>
      </section>

      {/* Placeholder: implement 7-day forecast here */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          7-Day Forecast
        </h2>
        <p className="text-gray-300 text-sm">
          Implement daily min/max temps, weather codes, and precipitation here.
          Data available at <code className="text-gray-400">forecast.daily</code>.
        </p>
      </section>
    </div>
  )
}