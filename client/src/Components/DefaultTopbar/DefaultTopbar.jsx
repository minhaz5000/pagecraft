import React from 'react'
import Logo2 from "../../Components/Logo2/Logo2"
import Loggeduser from "../../Components/Loggeduser/Loggeduser"
import './DefaultTopbar.css'
import { Link } from 'react-router-dom'
function DefaultTopbar() {
  return (
    <div>
        <div className='usertopbar'>
            <Logo2 />
            {/* <Loggeduser /> */}
        </div>
    </div>
  )
}

export default DefaultTopbar
