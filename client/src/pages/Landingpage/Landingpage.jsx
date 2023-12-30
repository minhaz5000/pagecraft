import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Initial from './Initial/Initial';
import Home from '../Homepage/Home/Home';

function Landingpage() {
  return (
    <Routes>
      <Route path = '/' element={<Initial />} />
      <Route path = '/home' element={<Home />} />
    </Routes>
  )
}

export default Landingpage