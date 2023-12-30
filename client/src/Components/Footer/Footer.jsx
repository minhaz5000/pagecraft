import React from 'react'
import './Footer.css'
function Footer() {
    const d = new Date();
    let year = d.getFullYear();
  return (
    <div className='footer'>
        <p className='copyright'>Team FMA ©{2023}</p>
        
    </div>
  )
}

export default Footer