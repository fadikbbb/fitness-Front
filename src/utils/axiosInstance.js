import axios from 'axios';
import store from '../store/store';
import { setToken, removeToken, setRefreshToken, clearAuthState } from '../store/authSlice';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = store.getState().auth.refreshToken;

        if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshTokenUrl = `${process.env.REACT_APP_BASE_URL}/auth/refresh-token`;

                const response = await axios.post(refreshTokenUrl, {
                    refreshToken,
                });

                const { accessToken, newRefreshToken } = response.data;

                // Update tokens in the store
                store.dispatch(setToken(accessToken));
                if (newRefreshToken) {
                    store.dispatch(setRefreshToken(newRefreshToken));
                }

                // Retry the original request with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                store.dispatch(clearAuthState());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
