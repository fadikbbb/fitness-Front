// src/hooks/useAuth.js
import { useSelector } from "react-redux";

export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  return !!token; // Returns true if token exists, false otherwise
};
