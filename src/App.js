import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import VerifyCode from "./components/auth/VerifyCode";
import PasswordResetRequest from "./components/auth/PasswordResetRequest";
import PasswordReset from "./components/auth/ResetPassword";
import Profile from "./pages/profile";
function App() {
  return (
    <Router>
      <div>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/verify-code" element={<VerifyCode />} />
            <Route
              path="/auth/password-reset-request"
              element={<PasswordResetRequest />}
            />
            <Route
              path="/auth/password-reset/rest/:token"
              element={<PasswordReset />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
