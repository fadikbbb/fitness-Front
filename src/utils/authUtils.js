// src/utils/authUtils.js
import axios from "axios";
import { setToken, removeToken, setRefreshToken } from "../store/authSlice";
import store from "../store/store";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Function to refresh the access token
export const refreshToken = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true }); // Ensure `withCredentials: true` to send cookies
        const { accessToken, refreshToken } = response.data;

        // Dispatch actions to update the tokens in the store
        store.dispatch(setToken(accessToken));
        store.dispatch(setRefreshToken(refreshToken));

        return accessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        store.dispatch(removeToken()); // Clear tokens on error
        return null;
    }
};

// Function to check if the token is expired
export const isTokenExpired = (token) => {
    if (!token) return true;
    const jwtPayload = JSON.parse(atob(token.split(".")[1]));
    const exp = jwtPayload.exp;
    return Date.now() >= exp * 1000;
};
