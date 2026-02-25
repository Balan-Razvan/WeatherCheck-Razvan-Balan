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
    windSpeedUnit: 'kmh'
}

const saved = loadPreferences();

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        temperatureUnit: saved?.temperatureUnit || defaults.temperatureUnit,
        windSpeedUnit: saved?.windSpeedUnit || defaults.windSpeedUnit,
        isMobileMenuOpen: false, 
    },
    reducers: {
        setTemperatureUnit(state, action) {
            state.temperatureUnit = action.payload;
            localStorage.setItem(
                'uiPreferences',
                JSON.stringify({
                    temperatureUnit: state.temperatureUnit,
                    windSpeedUnit: state.windSpeedUnit,
                })
            )
        },
        setWindSpeedUnit(state, action) {
            state.windSpeedUnit = action.payload;
            localStorage.setItem(
                'uiPreferences',
                JSON.stringify({
                    temperatureUnit: state.temperatureUnit,
                    windSpeedUnit: state.windSpeedUnit,
                })
            )
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
  closeMobileMenu,
} = uiSlice.actions

export default uiSlice.reducer
