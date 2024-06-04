import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('appointment-session'));
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem('appointment-session'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/homepage" replace /> : <Login onLogin={() => setUser(localStorage.getItem('appointment-session'))} />
          }
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/homepage" replace /> : <Register onRegister={() => setUser(localStorage.getItem('appointment-session'))} />
          }
        />
        <Route
          path="/homepage"
          element={
            user ? <Homepage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={
            user ? <Navigate to="/homepage" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
