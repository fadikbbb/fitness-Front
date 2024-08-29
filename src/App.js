// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Register from './auth/register';

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
