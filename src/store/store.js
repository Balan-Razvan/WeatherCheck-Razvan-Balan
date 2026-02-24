import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import weatherReducer from './weatherSlice';
import uiReducer from './uiSlice';
import recentsReducer from './recentsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        weather: weatherReducer,
        ui: uiReducer,
        recents: recentsReducer,
    },
});