import React, { useEffect } from 'react';

import Discover from './Discover/Discover';
import Wishlist from './Wishlist/Wishlist';
import Completed from './Completed/Completed';
import Reading from './Reading/Reading';
import Home from './Home/Home';
import Logo from '../../Components/Logo/Logo';
import Sidenav from '../../Components/Sidenav/Sidenav';

import { AnimatePresence } from 'framer-motion';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';

import './Homepage.css';
import SearchResult from './SearchResult/Searchresult';
import SearchTopBar from '../../Components/SearchTopBar/SearchTopBar';
import Footer from '../../Components/Footer/Footer';

function Homepage() {

  const navigate = useNavigate();
  
  useEffect(()=>{
    // check logged in user
    if(!localStorage.getItem("logged-in-user")) {
        navigate("/unauthorized");
    }

  });

  return (
    <div className='Homepage'>
    <div className='header'><SearchTopBar /></div>
      <div className='containerhome'>
        <Sidenav />
        <div className='sidenav-content'>
          <AnimatePresence exitBeforeEnter>    
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/discover' element={<Discover />} />
              <Route path='/reading' element={<Reading />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/completed' element={<Completed />} />
              <Route path='/query' element={<SearchResult />} />
              <Route path='/*' element={<Navigate to="/home" />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Homepage