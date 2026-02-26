import { createSlice } from "@reduxjs/toolkit";

const loadPreferences = () => {
    try {
        const stored = localStorage.getItem('uiPreferences');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

const defaults = {
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    darkMode: false,
}

const savePreferences = (state) => {
    localStorage.setItem('uiPreferences', JSON.stringify({
        temperatureUnit: state.temperatureUnit,
        windSpeedUnit: state.windSpeedUnit,
        darkMode: state.darkMode,
    }));
}

const saved = loadPreferences();

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        temperatureUnit: saved?.temperatureUnit || defaults.temperatureUnit,
        windSpeedUnit: saved?.windSpeedUnit || defaults.windSpeedUnit,
        darkMode: saved?.darkMode ?? defaults.darkMode,
        isMobileMenuOpen: false, 
    },
    reducers: {
        setTemperatureUnit(state, action) {
            state.temperatureUnit = action.payload;
            savePreferences(state);
        },
        setWindSpeedUnit(state, action) {
            state.windSpeedUnit = action.payload;
            savePreferences(state);
        },
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            savePreferences(state);
        },
        toggleMobileMenu(state) {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu(state) {
            state.isMobileMenuOpen = false;
        }
    }
})

export const {
  setTemperatureUnit,
  setWindSpeedUnit,
  toggleMobileMenu,
  toggleDarkMode,
  closeMobileMenu,
} = uiSlice.actions

export default uiSlice.reducer
