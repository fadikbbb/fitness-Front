// src/utils/axiosConfig.js
import axios from "axios";
import { refreshToken, isTokenExpired } from "./authUtils";
import store from "../store/store";
import { removeToken } from "../store/authSlice";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // Your API base URL
    withCredentials: true, // To send cookies
});

// Add a request interceptor
apiClient.interceptors.request.use(
    async (config) => {
        let token = store.getState().auth.token;

        // Check if the access token is expired
        if (isTokenExpired(token)) {
            try {
                // Attempt to refresh the token
                token = await refreshToken();

                if (token) {
                    // If token is successfully refreshed, set the new token in headers
                    config.headers.Authorization = `Bearer ${token}`;
                } else {
                    // If refresh token is also expired or invalid, redirect to login
                    throw new Error("Token refresh failed");
                }
            } catch (error) {
                console.error("Error during token refresh:", error);
                // Clear the auth state
                store.dispatch(removeToken());
                // Redirect to login page
                window.location.href = "/login";
                // Cancel the request
                return Promise.reject(new axios.Cancel("Token refresh failed. Redirecting to login."));
            }
        } else {
            // If token is not expired, just set it in the headers
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default apiClient;
