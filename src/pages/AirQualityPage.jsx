import { useWeather } from '../hooks/useWeather'
import LoadingSpinner from '../components/Spinner'
import ErrorMessage from '../components/Error'

export default function AirQualityPage() {
  const {
    currentLocation,
    airQuality,
    isLoadingAirQuality,
    airQualityError,
    loadAirQuality,
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

  if (isLoadingAirQuality) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (airQualityError) {
    return (
      <ErrorMessage
        message={airQualityError}
        onRetry={() =>
          loadAirQuality(currentLocation.latitude, currentLocation.longitude)
        }
      />
    )
  }

  if (!airQuality) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">No air quality data available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Air Quality — {currentLocation.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Current pollution levels and forecasts
        </p>
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Air Quality Index
        </h2>
        <p className="text-gray-300 text-sm">
          Implement AQI display, PM2.5, PM10, ozone, and other pollutant levels here.
          Data available at <code className="text-gray-400">airQuality.hourly</code>.
        </p>
      </section>
    </div>
  )
}