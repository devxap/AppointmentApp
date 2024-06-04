// utils/axiosConfig.js

import axios from 'axios';

const token = localStorage.getItem('appointment-session');

if (token) {
  const parsedToken = JSON.parse(token); // Parse the token string to extract just the token value
  console.log('Retrieved token:', parsedToken); // Log the retrieved token
  axios.defaults.headers.common['Authorization'] = `Bearer ${parsedToken}`;
} else {
  console.warn('No token found in localStorage'); // Log a warning if no token found
}

export default axios;
