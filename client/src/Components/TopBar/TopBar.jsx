import React from 'react'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import './TopBar.css'
function TopBar(props) {
  return (
    <div>
        <div className="top-row">
        <div className="col-logo">
          <Logo />
        </div>
        <div className="col-links">
          <ul className='toplist'>
            <li className={ props.home ? 'activelanding' : 'inactive' }><Link to={"/"}>Home</Link></li>
            <li className={ props.discover ? 'activelanding' : 'inactive' }><Link to={"/discover"}>Discover</Link></li>
            <li className={ props.pricing ? 'activelanding' : 'inactive' }><Link to={"/pricing"}>Pricing</Link></li>
            <li className={ props.contact ? 'activelanding' : 'inactive' }><Link to={"/contact"}>Contact</Link></li>
            <li className={ props.login ? 'activelanding' : 'inactive' }><Link to={Cookies.get('access_token')?'/home':'/login'}>Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TopBar