import axios from "axios";
import { setToken, removeToken } from "../store/authSlice";
import store from "../store/store";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Function to refresh the access token
export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    const { accessToken } = response.data;
    store.dispatch(setToken(accessToken));
    return accessToken;
  } catch (error) {
    console.log("Error during token refresh:", error);
    store.dispatch(removeToken());
    return null;
  }
};

// Function to check if the token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const jwtPayload = JSON.parse(atob(token.split(".")[1]));
    const exp = jwtPayload.exp;
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};
