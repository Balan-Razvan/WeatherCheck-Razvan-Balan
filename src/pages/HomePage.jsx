import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import { DEFAULT_LOCATION } from "../utils/constants";
import LoadingSpinner from "../components/Spinner";
import ErrorMessage from "../components/Error";
import WeatherIcon from "../components/WeatherIcon";

export default function HomePage() {
  const {
    currentLocation,
    forecast,
    isLoadingForecast,
    forecastError,
    selectLocation,
  } = useWeather();

  const { requestLocation, isLocating } = useGeolocation();

  useEffect(() => {
    if (currentLocation) return;

    requestLocation()
      .then(({ latitude, longitude }) => {
        selectLocation({
          name: "Your Location",
          latitude,
          longitude,
          country: "",
        }, {addToRecents: false});
      })
      .catch(() => {
        selectLocation(DEFAULT_LOCATION, {addToRecents: false});
      });
  }, [currentLocation, requestLocation, selectLocation]);

  if (isLocating) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-500">Detecting your location...</p>
      </div>
    );
  }

  if (isLoadingForecast) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-500">Loading weather data...</p>
      </div>
    );
  }

  if (forecastError) {
    return (
      <ErrorMessage
        message={forecastError}
        onRetry={() => currentLocation && selectLocation(currentLocation)}
      />
    );
  }

  if (!forecast) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">No weather data available yet.</p>
      </div>
    );
  }

  const { current } = forecast;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md border border-blue-100 p-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Your Local Weather
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Get real-time weather updates for your location
        </p>
        <p className="text-sm text-gray-500">
          Log into you account to access more features
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
          {currentLocation?.name}
          {currentLocation?.country && `, ${currentLocation.country}`}
        </p>

        <WeatherIcon code={current.weather_code} size="xl" />

        <p className="text-6xl font-light text-gray-900 mt-2">
          {Math.round(current.temperature_2m)}°
        </p>

        <p className="text-gray-500 mt-1">
          Feels like {Math.round(current.apparent_temperature)}°
        </p>
      </div>
    </div>
  );
}
