import { useState, useCallback } from 'react'

export function useGeolocation() {
  const [isLocating, setIsLocating] = useState(false)
  const [geoError, setGeoError] = useState(null)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser')
      return Promise.reject(new Error('Geolocation not supported'))
    }

    setIsLocating(true)
    setGeoError(null)

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false)
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          setIsLocating(false)
          const message =
            error.code === error.PERMISSION_DENIED
              ? 'Location access denied. Please enable it in your browser settings.'
              : 'Unable to determine your location.'
          setGeoError(message)
          reject(new Error(message))
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
      )
    })
  }, [])

  return { requestLocation, isLocating, geoError }
}