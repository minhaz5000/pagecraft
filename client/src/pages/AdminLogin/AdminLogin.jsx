import React from 'react'
import Animation from '../Landingpage/Animation'
import '../Signup/Signup.css'
import './AdminLogin.css'
import * as IcoIcons from 'react-icons/im'; 
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '../../Components/TopBar/TopBar';

function showPassFunc() {
    var x = document.getElementById("passInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
function AdminLogin() {
  return (
    <Animation>
    <TopBar login={true} />
        <div className='Login'>
        <div className="center">
        <Link to='/'><h1 className='icon'><i className='libre-icon'><IcoIcons.ImBooks /></i>Admin</h1></Link>
        <form>
            <div className="txt_field">
              <input type="text" name='emailOrHandle' required />
              <span></span>
              <label>Username or Email</label>
            </div>
            
            <div className="txt_field">
                <input type="password" name='password' id='passInput' required />
                <span></span>
                <label>Password</label>
                <div className='showpass' onClick={showPassFunc}><AiIcons.AiFillEyeInvisible /></div> 
            </div>
            
            <input class="login" type="submit" name='login_btn' value="Login" />
        </form>
        </div>
        </div>
    </Animation>
  )
}

export default AdminLogin