// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: localStorage.getItem('authToken') || null,
    userRole: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('authToken', action.payload);
        },
        removeToken(state) {
            state.token = null;
            localStorage.removeItem('authToken');
        },
        setUserRole(state, action) {
            state.userRole = action.payload;
        },
        clearAuthState(state) {
            state.token = null;
            state.userRole = null;
            localStorage.removeItem('authToken');
        },
    },
});

export const { setToken, removeToken, setUserRole, clearAuthState } =
    authSlice.actions;
export default authSlice.reducer;
