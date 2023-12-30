import React from 'react';
import * as IcoIcons from 'react-icons/im'; 
import { Link } from 'react-router-dom';
import './Logo2.css';

function Logo2() {
  return (
    <Link to='/'>
    <div className='parent-logo2'>
      <div class="child12">
        <i className='libre-icon2'><IcoIcons.ImBooks /></i>
      </div>
      <div class="child22">
        PageCraft
      </div>
    </div>
  </Link>
  )
}

export default Logo2