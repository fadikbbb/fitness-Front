// src/App.js
<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Register from './auth/register';
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import VerifyCode from "./components/auth/VerifyCode";
import PasswordResetRequest from "./components/auth/PasswordResetRequest";
import PasswordReset from "./components/auth/ResetPassword";
>>>>>>> a838839e4162662846349c44acc51961cfcdd42c

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">About</Link>
            </li>
            <li>
              <Link to="/auth/register" className="hover:underline">Register</Link>
            </li>
          </ul>
        </nav>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth/register" element={<Register />} />
<<<<<<< HEAD
=======
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
>>>>>>> a838839e4162662846349c44acc51961cfcdd42c
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
