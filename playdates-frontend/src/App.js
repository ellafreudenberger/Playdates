import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminsLogin from './pages/AdminsLogin';
import BookingsCalendar from './components/UserCalendar';
import PlaydatesNav from './components/Nav';

const App = () => {
  return (
    <div>
      <PlaydatesNav /> 
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlogin" element={<AdminsLogin />} />
        <Route path="/calendar" element={<BookingsCalendar />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;

// Routes is a parent container for all individual routes created 