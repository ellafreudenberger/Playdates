import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Nav from './components/Nav'


const App = () => {
  return (
    <div> 
    <Nav /> 
    <Routes> 
    <Route path= "/" element= { <Home /> }/>
    <Route path= "/register" element= { <Register /> }/>
    <Route path= "/login" element= { <Login /> }/>
    <Route path= "/PageNotFound" element= { <PageNotFound /> }/>
    </Routes>
    </div>
  )
}

export default App;

// Routes is a parent containter for all individual routes created 
