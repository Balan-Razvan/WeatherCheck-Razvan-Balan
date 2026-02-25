import { getWeatherInfo } from '../utils/weatherCodes'

export default function WeatherIcon({ code, size = 'md', className = '' }) {
  const { icon, label } = getWeatherInfo(code)

  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  }

  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={`${sizes[size]} ${className}`}
    >
      {icon}
    </span>
  )
}