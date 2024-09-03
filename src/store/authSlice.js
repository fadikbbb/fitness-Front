// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("authToken") || null,
    refreshToken: null, // Add refreshToken to the state
    userRole: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("authToken", action.payload);
        },

        removeToken(state) {
            state.token = null;
            state.refreshToken = null; // Clear refreshToken as well
            localStorage.removeItem("authToken");
        },

        setRefreshToken(state, action) {
            state.refreshToken = action.payload;
            // Note: Storing refreshToken in localStorage is not recommended. 
            // It's better managed with cookies for security.
        },

        setUserRole(state, action) {
            state.userRole = action.payload;
        },

        clearAuthState(state) {
            state.token = null;
            state.refreshToken = null; // Clear refreshToken on logout
            state.userRole = null;
            localStorage.removeItem("authToken");
        },
    },
});

export const { setToken, removeToken, setRefreshToken, setUserRole, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
