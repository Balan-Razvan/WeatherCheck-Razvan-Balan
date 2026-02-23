export const API_BASE_URL = 'https://api.open-meteo.com/v1';
export const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1'

export const FORECAST_HOURLY_PARAMS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'precipitation_probability',
  'precipitation',
  'weather_code',
  'cloud_cover',
  'wind_speed_10m',
  'wind_direction_10m',
  'wind_gusts_10m',
  'visibility',
  'is_day',
].join(',')

export const FORECAST_DAILY_PARAMS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'apparent_temperature_max',
  'apparent_temperature_min',
  'sunrise',
  'sunset',
  'daylight_duration',
  'uv_index_max',
  'precipitation_sum',
  'precipitation_probability_max',
  'wind_speed_10m_max',
  'wind_gusts_10m_max',
  'wind_direction_10m_dominant',
].join(',')

export const FORECAST_CURRENT_PARAMS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'precipitation',
  'rain',
  'showers',
  'snowfall',
  'weather_code',
  'cloud_cover',
  'pressure_msl',
  'surface_pressure',
  'wind_speed_10m',
  'wind_direction_10m',
  'wind_gusts_10m',
].join(',')

export const AIR_QUALITY_HOURLY_PARAMS = [
  'pm10',
  'pm2_5',
  'carbon_monoxide',
  'nitrogen_dioxide',
  'ozone',
  'us_aqi',
  'european_aqi',
].join(',')

export const DEFAULT_LOCATION = {
    name: 'Bucharest',
    latitude: 44.42,
    longitude: 26.10,
    country: 'Romania',
    timezone: 'Europe/Bucharest',
}

export const TEMPERATURE_UNITS = {
  celsius: { label: 'Celsius', symbol: '°C' },
  fahrenheit: { label: 'Fahrenheit', symbol: '°F' },
}

export const WIND_SPEED_UNITS = {
  kmh: { label: 'km/h', param: 'kmh' },
  mph: { label: 'mph', param: 'mph' },
  ms: { label: 'm/s', param: 'ms' },
}