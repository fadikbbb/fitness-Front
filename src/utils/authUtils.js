import axios from "axios";
import { setToken, removeToken } from "../store/authSlice";
import store from "../store/store";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });
    const { accessToken } = response.data;
    store.dispatch(setToken(accessToken));
    return accessToken;
  } catch (error) {
    console.log(error);
    // store.dispatch(removeToken());
    return null;
  }
};

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

export const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;");
  });
};
