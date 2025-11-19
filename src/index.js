// src/index.js (Đảm bảo file này gọi App)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // File CSS gốc (có Tailwind)
import App from './App'; // Import component App từ App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);