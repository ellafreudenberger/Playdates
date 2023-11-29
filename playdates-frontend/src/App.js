import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminsLogin from './pages/AdminsLogin'
import BookingsCalendar from './components/UserCalendar';
import Nav from './components/Nav';
import DarkModeToggle from './components/DarkModeToggleButton'


const App = () => {
  return (
    <div>
    <span>
    <Nav /> 
    <Routes> 
    <Route path= "/" element= { <Home /> }/>
    <Route path= "/register" element= { <Register /> }/>
    <Route path= "/login" element= { <Login /> }/>
    <Route path= "/admin" element= { <Admin />} />
    <Route path= "/adminlogin" element= { <AdminsLogin />} />
    <Route path= "/calendar" element= {<BookingsCalendar />} />
    <Route path= "/PageNotFound" element= { <PageNotFound /> }/>
    </Routes>
    </span>
    <span>
      <DarkModeToggle />
    </span>
    </div>
  )
}

export default App;

// Routes is a parent containter for all individual routes created 
