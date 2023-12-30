import React from 'react';
import * as IcoIcons from 'react-icons/im'; 
import './Logo.css';

function Logo() {
  return (
    <div className='parent-logo'>
      <div class="child1">
        <i className='libre-icon'><IcoIcons.ImBooks /></i>
      </div>
      <div class="child2">
        PageCraft
      </div>
    </div>

  )
}

export default Logo