import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import PropertyList from './components/PropertyList';
import PropertyPage from './components/PropertyPage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  const authValue = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
    isAuthenticated: !!user
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('https://real-esate-backend.vercel.app/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="text-center p-4 text-blue-600">Loading...</div>;

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authValue}>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/property/:id" element={user ? <PropertyPage /> : <Navigate to="/login" />} />
          <Route path="/property" element={user ? <PropertyList /> : <Navigate to="/login" />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
