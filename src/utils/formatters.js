export function formatTemperature(temp, unit = 'celsius') {
  const rounded = Math.round(temp)
  return unit === 'fahrenheit' ? `${rounded}°F` : `${rounded}°C`
}

export function formatWindSpeed(speed, unit = 'kmh') {
  const rounded = Math.round(speed)
  const labels = { kmh: 'km/h', mph: 'mph', ms: 'm/s', kn: 'kn' }
  return `${rounded} ${labels[unit] || unit}`
}

export function formatDate(dateString, options = {}) {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...options,
  })
}

export function formatTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatHour(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    hour12: true,
  })
}