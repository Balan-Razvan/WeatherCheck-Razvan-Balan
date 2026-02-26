import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import { useAuth } from "../hooks/useAuth";
import { DEFAULT_LOCATION } from "../utils/constants";
import { reverseGeocode } from "../utils/weatherApi";
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
  const { isAuthenticated } = useAuth();

  const initialized = useRef(false);

  useEffect(() => {
    if (currentLocation || initialized.current) return;
    initialized.current = true;

    requestLocation()
      .then(({ latitude, longitude }) =>
        reverseGeocode(latitude, longitude)
          .then(({ name, country }) =>
            selectLocation({ name, latitude, longitude, country }, { addToRecents: false })
          )
          .catch(() =>
            selectLocation({ name: "Your Location", latitude, longitude, country: "" }, { addToRecents: false })
          )
      )
      .catch(() => {
        selectLocation(DEFAULT_LOCATION, { addToRecents: false });
      });
  }, [currentLocation, requestLocation, selectLocation]);

  if (!currentLocation || isLoadingForecast) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-fg-muted tracking-wide">
          {isLocating ? "Detecting your location…" : "Loading weather data…"}
        </p>
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
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-fg-muted">No weather data available yet.</p>
      </div>
    );
  }

  const { current } = forecast;

  return (
    <div
      className="flex items-center justify-center pb-24"
      style={{ minHeight: "calc(100vh - var(--size-navbar))" }}
    >
      <div className="w-full max-w-lg py-16">

        <p className="text-xs tracking-[0.2em] uppercase text-fg-faint mb-8">
          {currentLocation?.name}
          {currentLocation?.country && `, ${currentLocation.country}`}
        </p>

        <div className="flex items-end gap-4 mb-4">
          <span
            className="font-display leading-none text-fg"
            style={{ fontSize: "var(--size-display-xl)" }}
          >
            {Math.round(current.temperature_2m)}°
          </span>
          <div className="mb-3">
            <WeatherIcon code={current.weather_code} size="xl" />
          </div>
        </div>

        <p className="text-fg-muted text-sm mb-10">
          Feels like {Math.round(current.apparent_temperature)}°
          <span className="mx-2 text-fg-ghost">·</span>
          {current.relative_humidity_2m}% humidity
          <span className="mx-2 text-fg-ghost">·</span>
          {Math.round(current.wind_speed_10m)} km/h wind
        </p>

        <div className="border-t border-border-subtle mb-10" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-fg font-medium mb-1">Search any city in the world</p>
            <p className="text-fg-faint text-sm">Forecast and conditions — anywhere on the map.</p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-cta text-cta-fg text-sm font-medium px-5 py-2.5 rounded-full hover:bg-cta-hover transition-colors"
            >
              Search
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {!isAuthenticated && (
              <p className="text-xs text-fg-faint">
                <Link to="/signup" className="text-fg-muted underline underline-offset-2 hover:text-fg transition-colors">
                  Create account
                </Link>
                {" "}·{" "}
                <Link to="/login" className="text-fg-muted underline underline-offset-2 hover:text-fg transition-colors">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
