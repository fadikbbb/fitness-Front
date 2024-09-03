import axios from "axios";
import { refreshToken, isTokenExpired } from "./authUtils";
import store from "../store/store";
import { removeToken } from "../store/authSlice";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    let token = store.getState().auth.token;

    if (isTokenExpired(token)) {
      try {
        token = await refreshToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (error) {
        console.error("Error during token refresh:", error);
        store.dispatch(removeToken());
        window.location.href = "/login";
        return Promise.reject(
          new axios.Cancel("Token refresh failed. Redirecting to login.")
        );
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
