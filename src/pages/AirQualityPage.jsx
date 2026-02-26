import { useWeather } from '../hooks/useWeather'
import LoadingSpinner from '../components/Spinner'
import ErrorMessage from '../components/Error'

function getCurrentHourIndex(times, utcOffsetSeconds = 0) {
  const localMs = Date.now() + utcOffsetSeconds * 1000
  const localHour = new Date(localMs).toISOString().slice(0, 13) 
  const idx = times.findIndex(t => t.slice(0, 13) === localHour)
  return idx >= 0 ? idx : 0
}

function getAqiInfo(aqi) {
  if (aqi == null)  return { label: 'Unknown',                        dot: 'bg-fg-ghost' }
  if (aqi <= 50)    return { label: 'Good',                           dot: 'bg-green-500' }
  if (aqi <= 100)   return { label: 'Moderate',                       dot: 'bg-yellow-500' }
  if (aqi <= 150)   return { label: 'Unhealthy for Sensitive Groups', dot: 'bg-orange-500' }
  if (aqi <= 200)   return { label: 'Unhealthy',                      dot: 'bg-red-500' }
  if (aqi <= 300)   return { label: 'Very Unhealthy',                 dot: 'bg-purple-500' }
  return              { label: 'Hazardous',                           dot: 'bg-rose-900' }
}

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
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-fg-muted text-sm">No location selected. Search for a city first.</p>
      </div>
    )
  }

  if (isLoadingAirQuality) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (airQualityError) {
    return (
      <ErrorMessage
        message={airQualityError}
        onRetry={() => loadAirQuality(currentLocation.latitude, currentLocation.longitude)}
      />
    )
  }

  if (!airQuality) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-fg-muted text-sm">No air quality data available.</p>
      </div>
    )
  }

  const { hourly, utc_offset_seconds } = airQuality
  const idx = getCurrentHourIndex(hourly.time, utc_offset_seconds)

  const usAqi   = hourly.us_aqi?.[idx]
  const euAqi   = hourly.european_aqi?.[idx]
  const aqiInfo = getAqiInfo(usAqi)

  const pollutants = [
    { key: 'pm2_5',           label: 'PM2.5', desc: 'Fine particles',     unit: 'μg/m³', value: hourly.pm2_5?.[idx] },
    { key: 'pm10',            label: 'PM10',  desc: 'Coarse particles',   unit: 'μg/m³', value: hourly.pm10?.[idx] },
    { key: 'carbon_monoxide', label: 'CO',    desc: 'Carbon monoxide',    unit: 'μg/m³', value: hourly.carbon_monoxide?.[idx] },
    { key: 'nitrogen_dioxide',label: 'NO₂',   desc: 'Nitrogen dioxide',   unit: 'μg/m³', value: hourly.nitrogen_dioxide?.[idx] },
    { key: 'ozone',           label: 'O₃',    desc: 'Ozone',              unit: 'μg/m³', value: hourly.ozone?.[idx] },
  ]

  return (
    <div className="space-y-8 pt-4">

      <div>
        <h1 className="font-display text-2xl text-fg">
          Air Quality — {currentLocation.name}
        </h1>
        <p className="text-fg-muted text-sm mt-1">Current pollution levels</p>
      </div>

      <section className="bg-surface border border-border-subtle rounded-xl p-6">
        <h2 className="text-xs font-medium text-fg-muted mb-4 tracking-widest uppercase">
          Air Quality Index
        </h2>
        <div className="flex items-start gap-8">
          <div>
            <p className="font-display text-5xl text-fg leading-none">
              {usAqi ?? '—'}
            </p>
            <p className="text-fg-faint text-xs mt-2">US AQI</p>
          </div>
          <div className="pt-1">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-raised text-sm text-fg-muted">
              <span className={`w-2 h-2 rounded-full shrink-0 ${aqiInfo.dot}`} />
              {aqiInfo.label}
            </span>
            {euAqi != null && (
              <p className="text-fg-faint text-xs mt-3">European AQI: {euAqi}</p>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xs font-medium text-fg-muted mb-4 tracking-widest uppercase">
          Pollutants
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {pollutants.map(({ key, label, desc, unit, value }) => (
            <div key={key} className="bg-surface border border-border-subtle rounded-xl p-4">
              <p className="text-fg-faint text-xs mb-1">{desc}</p>
              <p className="text-fg font-medium text-lg leading-none">
                {value != null ? value.toFixed(1) : '—'}
              </p>
              <p className="text-fg-muted text-xs mt-1.5">{label} · {unit}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
