import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = localStorage.getItem('theme') || 'light'
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

reportWebVitals();
