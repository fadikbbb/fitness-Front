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
    let { token } = store.getState().auth;

    if (isTokenExpired(token)) {
      try {
        token = await refreshToken();  
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; 
        } else {
          store.dispatch(removeToken());
        }
      } catch (error) {
        console.log("Token refresh error:", error);
        store.dispatch(removeToken());  
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
