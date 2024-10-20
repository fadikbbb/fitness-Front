// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import exerciseReducer from "./exerciseSlice";
import foodReducer from './foodSlice'; 
import userReducer from './userSlice';
import settingsReducer from './settingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    exercise: exerciseReducer,
    food: foodReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export default store;
