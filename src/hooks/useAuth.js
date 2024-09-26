// src/hooks/useAuth.js
import { useSelector } from "react-redux";
export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  return !!token;
};
export const Authorization = () => {
  const isAdmin = useSelector((state) => state.auth.userRole);
  return isAdmin === "admin" ? true : false;
}