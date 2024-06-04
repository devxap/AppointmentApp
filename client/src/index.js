import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { AppointmentProvider } from './components/Contextapi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppointmentProvider>
    <App />
  </AppointmentProvider>
);

