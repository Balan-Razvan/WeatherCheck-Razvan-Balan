import { useState } from 'react'
import WEATHER_CODES from '../utils/weatherCodes'

const WEATHER_CODE_OPTIONS = Object.entries(WEATHER_CODES).map(
  ([code, info]) => ({ code: Number(code), label: info.label, icon: info.icon })
)

function FormField({ label, value, onChange, type = 'text', ...props }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  )
}

export default function CardModal({ card, onSave, onClose }) {
  const [form, setForm] = useState({
    name: card?.name || '',
    country: card?.country || '',
    latitude: card?.latitude ?? '',
    longitude: card?.longitude ?? '',
    temperature: card?.temperature ?? '',
    feelsLike: card?.feelsLike ?? '',
    weatherCode: card?.weatherCode ?? 0,
    humidity: card?.humidity ?? '',
    windSpeed: card?.windSpeed ?? '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      name: form.name,
      country: form.country,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      temperature: form.temperature !== '' ? Number(form.temperature) : null,
      feelsLike: form.feelsLike !== '' ? Number(form.feelsLike) : null,
      weatherCode: Number(form.weatherCode),
      humidity: form.humidity !== '' ? Number(form.humidity) : null,
      windSpeed: form.windSpeed !== '' ? Number(form.windSpeed) : null,
    })
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {card ? 'Edit Card' : 'Create Card'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField
            label="City Name"
            value={form.name}
            onChange={(v) => handleChange('name', v)}
            required
          />
          <FormField
            label="Country"
            value={form.country}
            onChange={(v) => handleChange('country', v)}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Latitude"
              type="number"
              step="any"
              value={form.latitude}
              onChange={(v) => handleChange('latitude', v)}
              required
            />
            <FormField
              label="Longitude"
              type="number"
              step="any"
              value={form.longitude}
              onChange={(v) => handleChange('longitude', v)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Temperature"
              type="number"
              step="any"
              value={form.temperature}
              onChange={(v) => handleChange('temperature', v)}
            />
            <FormField
              label="Feels Like"
              type="number"
              step="any"
              value={form.feelsLike}
              onChange={(v) => handleChange('feelsLike', v)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Humidity (%)"
              type="number"
              value={form.humidity}
              onChange={(v) => handleChange('humidity', v)}
            />
            <FormField
              label="Wind Speed (km/h)"
              type="number"
              step="any"
              value={form.windSpeed}
              onChange={(v) => handleChange('windSpeed', v)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Weather Condition
            </label>
            <select
              value={form.weatherCode}
              onChange={(e) => handleChange('weatherCode', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {WEATHER_CODE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {card ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
