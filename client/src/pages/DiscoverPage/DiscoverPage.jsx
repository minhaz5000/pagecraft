import React from 'react'
import { Link } from 'react-router-dom'
import Discover from '../Homepage/Discover/Discover'
import Logo from '../../Components/Logo/Logo'
import Cookies from 'js-cookie';
import './DiscoverPage.css'
import Animation from '../Homepage/Animation';
import TopBar from '../../Components/TopBar/TopBar';

function DiscoverPage() {
  return (
    <Animation>
      <TopBar discover={true} />        
      <div className="discover">
        <Discover />
      </div>
    </Animation>
  )
}

export default DiscoverPage