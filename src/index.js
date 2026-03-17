import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// No StrictMode — prevents double-invocation of effects in LoadScreen
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
