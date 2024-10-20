import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Hook to check if the user is authenticated (has a valid token)
export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  return !!token;  // Return true if token exists, false otherwise
};

// Hook to check if the user has admin privileges
export const useAuthorization = () => {
  const userRole = useSelector((state) => state.auth.userRole);
  return userRole === "admin";  // Return true if userRole is 'admin'
};

// Component to check authentication before rendering a component
export function RequireAuth({ element }) {
  const isAuthenticated = useAuth();
  return isAuthenticated ? element : <Navigate to="/auth/login" />;
}

// Component to check authorization (admin privileges) before rendering a component
export function RequireAdmin({ element }) {
  const isAdmin = useAuthorization();
  return isAdmin ? element : <Navigate to="/" />;
}
