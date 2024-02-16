import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminsLogin from './pages/AdminsLogin';
import BookingsCalendar from './components/UserCalendar';
import PlaydatesNav from './components/Nav';
import Footer from './components/Footer';

const App = () => {
  // State to track the user's authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check user's authentication status when the component mounts
    const checkAuthStatus = async () => {
      try {
        // Perform your authentication check & sending a request to the backend
        const response = await fetch('/check-auth', {
          method: 'GET',
          credentials: 'include' // Include cookies in the request
        });
        if (response.ok) {
          setIsLoggedIn(true); // User is authenticated
        } else {
          setIsLoggedIn(false); // User is not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div>
      <PlaydatesNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protected route for the Admin page */}
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/dogsitters" />} />
        <Route path="/dogsitters" element={<AdminsLogin />} />
         {/* Protected route for the Scheduling page */}
        <Route path="/calendar" element={isLoggedIn ? <BookingsCalendar />: <Navigate to="/login" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
