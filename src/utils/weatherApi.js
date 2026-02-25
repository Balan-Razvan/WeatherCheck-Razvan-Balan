
import {
  API_BASE_URL,
  AIR_QUALITY_API_URL,
  GEOCODING_API_URL,
  FORECAST_CURRENT_PARAMS,
  FORECAST_HOURLY_PARAMS,
  FORECAST_DAILY_PARAMS,
  AIR_QUALITY_HOURLY_PARAMS,
} from './constants'

export async function reverseGeocode(latitude, longitude) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Reverse geocoding failed: ${response.status}`)
  }

  const data = await response.json()
  const name = data.city || data.locality || data.principalSubdivision || 'Unknown'
  const country = data.countryName || ''

  return { name, country }
}

export async function searchCities(query) {
  if (!query || query.length < 2) return []

  const url = `${GEOCODING_API_URL}/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.status}`)
  }

  const data = await response.json()
  return data.results || []
}

export async function fetchForecast(latitude, longitude, options = {}) {
  const {
    temperatureUnit = 'celsius',
    windSpeedUnit = 'kmh',
    timezone = 'auto',
  } = options

  const params = new URLSearchParams({
    latitude,
    longitude,
    current: FORECAST_CURRENT_PARAMS,
    hourly: FORECAST_HOURLY_PARAMS,
    daily: FORECAST_DAILY_PARAMS,
    temperature_unit: temperatureUnit,
    wind_speed_unit: windSpeedUnit,
    timezone,
  })

  const response = await fetch(`${API_BASE_URL}/forecast?${params}`)

  if (!response.ok) {
    throw new Error(`Forecast request failed: ${response.status}`)
  }

  return response.json()
}

export async function fetchAirQuality(latitude, longitude, options = {}) {
  const { timezone = 'auto' } = options

  const params = new URLSearchParams({
    latitude,
    longitude,
    hourly: AIR_QUALITY_HOURLY_PARAMS,
    timezone,
  })

  const response = await fetch(`${AIR_QUALITY_API_URL}/air-quality?${params}`)

  if (!response.ok) {
    throw new Error(`Air quality request failed: ${response.status}`)
  }

  return response.json()
}