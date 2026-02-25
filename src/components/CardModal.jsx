import { useState } from 'react'
import WEATHER_CODES from '../utils/weatherCodes'

const WEATHER_CODE_OPTIONS = Object.entries(WEATHER_CODES).map(
  ([code, info]) => ({ code: Number(code), label: info.label, icon: info.icon })
)

function FormField({ label, value, onChange, type = 'text', ...props }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-fg-muted mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border-default text-sm text-fg placeholder-fg-placeholder focus:outline-none focus:border-border-strong transition-colors"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
      <div className="bg-surface border border-border-default rounded-xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="font-display text-lg text-fg mb-5">
          {card ? 'Edit Card' : 'Create Card'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField label="City Name" value={form.name} onChange={(v) => handleChange('name', v)} required />
          <FormField label="Country" value={form.country} onChange={(v) => handleChange('country', v)} />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Latitude" type="number" step="any" value={form.latitude} onChange={(v) => handleChange('latitude', v)} required />
            <FormField label="Longitude" type="number" step="any" value={form.longitude} onChange={(v) => handleChange('longitude', v)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Temperature" type="number" step="any" value={form.temperature} onChange={(v) => handleChange('temperature', v)} />
            <FormField label="Feels Like" type="number" step="any" value={form.feelsLike} onChange={(v) => handleChange('feelsLike', v)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Humidity (%)" type="number" value={form.humidity} onChange={(v) => handleChange('humidity', v)} />
            <FormField label="Wind (km/h)" type="number" step="any" value={form.windSpeed} onChange={(v) => handleChange('windSpeed', v)} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-fg-muted mb-1.5">
              Weather Condition
            </label>
            <select
              value={form.weatherCode}
              onChange={(e) => handleChange('weatherCode', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border-default text-sm text-fg focus:outline-none focus:border-border-strong transition-colors"
            >
              {WEATHER_CODE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-full border border-border-muted text-fg-muted hover:border-border-strong hover:text-fg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-full bg-cta text-cta-fg font-medium hover:bg-cta-hover transition-colors"
            >
              {card ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}