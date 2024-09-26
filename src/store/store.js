// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import exerciseReducer from "./exerciseSlice";
import foodReducer from './foodSlice'; // Adjust the path based on your file structure

const store = configureStore({
  reducer: {
    auth: authReducer,
    exercise: exerciseReducer,
    food: foodReducer,
  },
});

export default store;
