// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import Home from "./pages/home";
import About from "./pages/about";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import VerifyCode from "./components/auth/VerifyCode";
import PasswordResetRequest from "./components/auth/PasswordResetRequest";
import ResetPassword from "./components/auth/ResetPassword";
import Profile from "./pages/profile";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
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
          </Routes>
        </header>
      </Router>
    </Provider>
  );
}

// ProtectedRoute component to guard routes that require authentication
function ProtectedRoute({ component: Component }) {
  const token = useSelector((state) => state.auth.token);

  return token ? <Component /> : <Navigate to="/auth/login" />;
}

export default App;
