import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchForecast, fetchAirQuality, searchCities } from "../utils/weatherApi";

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async ({latitude, longitude, options}, {rejectWithValue}) => {
        try {
            const data = await fetchForecast(latitude, longitude, options);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchAirQualityData = createAsyncThunk(
    'weather/fetchAirQuality',
    async({latitude, longitude, options}, {rejectWithValue}) => {
        try {
            const data = await fetchAirQuality(latitude, longitude, options);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const searchLocations = createAsyncThunk(
    'weather/searchLocations',
    async(query, {rejectWithValue}) => {
        try {
            const results = await searchCities(query);
            return results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentLocation: null, 
    forecast: null,        
    airQuality: null,     
    searchResults: [],     

    savedLocations: JSON.parse(localStorage.getItem('savedLocations') || '[]'),

    isLoadingForecast: false,
    isLoadingAirQuality: false,
    isSearching: false,

    forecastError: null,
    airQualityError: null,
    searchError: null,
  },
  reducers: {
    setCurrentLocation(state, action) {
        state.currentLocation = action.payload;
    },
    clearSearchResults(state) {
        state.searchResults = [];
    },
    addSavedLocation(state, action) {
        const exists = state.savedLocations.some(
            (loc) => loc.latitude === action.payload.latitude && loc.longitude === action.payload.longitude
        )
        if (!exists) {
            state.savedLocations.push(action.payload);
            localStorage.setItem('savedLocations', JSON.stringify(state.savedLocations));
        }
    },
    removeSavedLocation(state, action) {
        state.savedLocations = state.savedLocations.filter(
            (loc) => loc.latitude !== action.payload.latitude ||
            loc.longitude !== action.payload.longitude
        )
        localStorage.setItem('savedLocations', JSON.stringify(state.savedLocations))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoadingForecast = true
        state.forecastError = null       
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoadingForecast = false
        state.forecast = action.payload 
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoadingForecast = false
        state.forecastError = action.payload 
      })

      .addCase(fetchAirQualityData.pending, (state) => {
        state.isLoadingAirQuality = true
        state.airQualityError = null
      })
      .addCase(fetchAirQualityData.fulfilled, (state, action) => {
        state.isLoadingAirQuality = false
        state.airQuality = action.payload
      })
      .addCase(fetchAirQualityData.rejected, (state, action) => {
        state.isLoadingAirQuality = false
        state.airQualityError = action.payload
      })

      .addCase(searchLocations.pending, (state) => {
        state.isSearching = true
        state.searchError = null
      })
      .addCase(searchLocations.fulfilled, (state, action) => {
        state.isSearching = false
        state.searchResults = action.payload 
      })
      .addCase(searchLocations.rejected, (state, action) => {
        state.isSearching = false
        state.searchError = action.payload
      })
  },
})

export const {
    setCurrentLocation,
    clearSearchResults,
    removeSavedLocation,
    addSavedLocation,
} = weatherSlice.actions;

export default weatherSlice.reducer;
