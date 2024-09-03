// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import store from "./store/store";
import Home from "./pages/home";
import About from "./pages/about";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import VerifyCode from "./components/auth/VerifyCode";
import PasswordResetRequest from "./components/auth/PasswordResetRequest";
import ResetPassword from "./components/auth/ResetPassword";
import Profile from "./pages/profile";
import NotFound from "./pages/notfound";
import AllTarining from "./pages/allTarining";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div class="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<AllTarining />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProtectedRoute component={Profile} />{" "}
                </ProtectedRoute>
              }
            />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify-code" element={<VerifyCode />} />
            <Route
              path="/auth/reset-password-request"
              element={<PasswordResetRequest />}
            />
            <Route
              path="/auth/reset-password/reset/:token"
              element={<ResetPassword />}
            />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
}

export default App;
