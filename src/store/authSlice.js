import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"; 
import { clearCookies } from "../utils/authUtils";

// Retrieve token from localStorage
const token = localStorage.getItem("authToken");
let role = null;
let userId = null;

// Decode token and extract userId and role
if (token) {
    try {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
        role = decodedToken.role;
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken"); // Remove the invalid token
    }
}

// Initial state with decoded values if available
const initialState = {
    token: token || null,
    refreshToken: null, // Refresh token can be added later
    userRole: role || null,
    userId: userId || null,
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
        setUserRole(state, action) {
            state.userRole = action.payload;
        },
        setUserId(state, action) {
            state.userId = action.payload;
        },
        setRefreshToken(state, action) {
            state.refreshToken = action.payload;
        },
        clearAuthState(state) {
            state.token = null;
            state.refreshToken = null;
            state.userRole = null;
            state.userId = null;
            localStorage.removeItem("authToken");
            clearCookies();
        },
    },
});

export const {
    setToken,
    removeToken,
    setRefreshToken,
    setUserRole,
    setUserId,
    clearAuthState,
} = authSlice.actions;
export default authSlice.reducer;
