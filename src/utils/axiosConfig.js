import axios from "axios";
import { refreshToken, isTokenExpired } from "./authUtils";
import store from "../store/store";
import { removeToken } from "../store/authSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
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
        axios.post(`${BASE_URL}/auth/logout`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
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
    return Promise.reject(error);
  }
);

export default apiClient;
