import { useSelector, useDispatch } from "react-redux";
import {
    fetchWeather, fetchAirQualityData, searchLocations, setCurrentLocation, clearSearchResults, addSavedLocation, removeSavedLocation
} from '../store/weatherSlice';
import { addRecentSearch } from '../store/recentsSlice';

export function useWeather() {
    const dispatch = useDispatch();
    const weather = useSelector((state) => state.weather);
    const {temperatureUnit, windSpeedUnit} = useSelector((state) => state.ui);

    const loadForecast = (latitude, longitude) => {
        dispatch(
            fetchWeather({
                latitude, longitude, options: {temperatureUnit, windSpeedUnit}
            })
        )
    }

    const loadAirQuality = (latitude, longitude) => {
        dispatch(fetchAirQualityData({latitude, longitude, options:{}}))
    }

    const selectLocation = (location) => {
        dispatch(setCurrentLocation(location));
        dispatch(
            fetchWeather({
                latitude: location.latitude,
                longitude: location.longitude,
                options: { temperatureUnit, windSpeedUnit },
            })
        ).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                const current = result.payload?.current
                dispatch(addRecentSearch({
                    name: location.name,
                    country: location.country || '',
                    latitude: location.latitude,
                    longitude: location.longitude,
                    temperature: current?.temperature_2m,
                    feelsLike: current?.apparent_temperature,
                    weatherCode: current?.weather_code,
                    humidity: current?.relative_humidity_2m,
                    windSpeed: current?.wind_speed_10m,
                }))
            }
        })
        loadAirQuality(location.latitude, location.longitude);
    }   

    return {
    ...weather,
    loadForecast,
    loadAirQuality,
    selectLocation,
    search: (query) => dispatch(searchLocations(query)),
    clearSearch: () => dispatch(clearSearchResults()),
    saveLocation: (location) => dispatch(addSavedLocation(location)),
    unsaveLocation: (location) => dispatch(removeSavedLocation(location)),
  }
}