import React from 'react'
import Homepage from './pages/Homepage/Homepage';
import Landingpage from './pages/Landingpage/Landingpage';
import Reader from './pages/Reader/Reader';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import SearchResult from './pages/Homepage/SearchResult/Searchresult';
import Error401 from './pages/Error Page/Error401';
import Error404 from './pages/Error Page/Error404';
import BooksDetails from './pages/BookDetails/BooksDetails';
import { Route, Routes } from 'react-router-dom';
import DiscoverPage from './pages/DiscoverPage/DiscoverPage'
import AdminLogin from './pages/AdminLogin/AdminLogin';
import BookUpload from './pages/BookUpload/BookUpload';
import Pricing from './pages/Pricing/Pricing';
import './App.css'
import UserProfile from './pages/UserProfile/UserProfile';
import Contact from './pages/Contact/Contact';
function App() {


  return (
      <div className='App'>
        <Routes>
          <Route path='*' element={<Landingpage />} />
          <Route path ='/login' element={<Login />} />
          <Route path ='/adminlogin' element={<AdminLogin />} />
          <Route path ='/bookupload' element={<BookUpload />} />
          <Route path ='/discover' element={<DiscoverPage />} />
          <Route path ='/pricing' element={<Pricing />} />
          <Route path ='/contact' element={<Contact />} />
          <Route path ='/signup' element={<Signup />} />
          <Route exact path='/search' element={<SearchResult />} />
          <Route path='/home/*' element={<Homepage/>} />
          <Route path='/reader' element={<Reader/>} />
          <Route path='/unauthorized' element={<Error401 />} />
          <Route path='/book' element={<BooksDetails />} />
          <Route path='*' element={<Error404 />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
  );
}

export default App