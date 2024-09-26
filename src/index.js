import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = localStorage.getItem('theme') || 'light'; // Check the stored theme
if (theme === 'dark') {
  document.documentElement.classList.add('dark'); // Apply the dark class if the theme is dark
} else {
  document.documentElement.classList.remove('dark'); // Remove dark class if theme is light
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
