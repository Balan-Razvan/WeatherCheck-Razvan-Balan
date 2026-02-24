import { useSelector, useDispatch } from "react-redux";
import {
    fetchWeather, fetchAirQualityData, searchLocations, setCurrentLocation, clearSearchResults, addSavedLocation, removeSavedLocation
} from '../store/weatherSlice';

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
        loadForecast(location.latitude, location.longitude);
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