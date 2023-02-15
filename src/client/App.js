import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login'
import Navbar from './Components/Navbar/Navbar';
import Movie from './Components/Movie/Movie';

const App = () => {
  return (
    <div className='main'>
      <BrowserRouter>
        {/* Component 'Navbar' must be placed within browser router so that navbar links work */}
        <Navbar
          leftItems={{
            home: '/',
            home2: '/',
            l: '/login',
            m: '/movie',
          }}
        />
        <div className='routes'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/movie" element={<Movie />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
