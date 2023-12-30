import React from 'react';
import { useState } from 'react';
import * as IcoIcons from 'react-icons/im'; 
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css";
import Animation from '../Landingpage/Animation';
import TopBar from '../../Components/TopBar/TopBar';

function showPassFunc() {
  var x = document.getElementById("passInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
function showConfirmPassFunc() {
  var x = document.getElementById("confirmpassInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function Signup() {
  const regex = /\S+@\S+\.\S+/;
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const checkEmail = (e) =>{
    console.log(e.target.value);
    setEmail(e.target.value);
    if(regex.test(email)===false) {
      setError('Please enter valid Email')
    } else {
      setError('');
      return true;
    }
  }
  
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [pass, setPass] = useState('');
  const [pvalid, setPvalid] = useState('');



  const [confirmpass, setConfirmPass] = useState('');
  const [confirmmsg, setConfirmMsg] = useState('');
  
  const checkPass = (e) => {
    console.log(e.target.value);
    setPass(e.target.value);
    if(e.target.value===confirmpass) {
      setConfirmMsg('');
    } else {
      setConfirmMsg('Passwords do not match');
    }
    if(passRegex.test(pass)===false) {
      setPvalid('Please enter a valid password');
    } else {
      setPvalid('');
      return true;
    }
  }

  const checkConfirmPass = (e) => {
    console.log(pass);
    setConfirmPass(e.target.value);
    console.log(e.target.value);
    if(e.target.value===pass) {
      setConfirmMsg('');
    } else {
      setConfirmMsg('Passwords do not match');
      return true;
    }
  }


  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    const data = {
      handle: e.target.handle.value,
      email: e.target.email.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value
    };

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    

    fetch('http://localhost:3050/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
      credentials: 'include' 
    }).then((response) => {
      if (! response.error) {
        navigate("/login");
      } else {
        // invalid login
      }
    }); 
  };


  return (
    <Animation>
    <TopBar login={true} />
    <div className='Signup'>
        <div className="center">
        <Link to='/'><h1 className='icon'><i className='libre-icon'><IcoIcons.ImBooks /></i>Sign up</h1></Link>
        <form onSubmit={Auth}>
            <div className="txt_field">
              <input type="text" name='handle' autoComplete='off' required />
              <span></span>
              <label>Username</label>
            </div>
            <div className="txt_field">
              <input type="text" name='email' onChange={checkEmail} autoComplete='off' required />
              <span></span>
              <label>Email</label>
            </div>
              <p className='email-error'>{error}</p>

            <div className="txt_field">
              <input type="text" name='firstName' autoComplete='off' required />
              <span></span>
              <label>First Name</label>
            </div>


            <div className="txt_field">
              <input type="text" name='lastName' autoComplete='off' required />
              <span></span>
              <label>Last Name</label>
            </div>
            <div className="txt_field">
              <input type="password" name='password' onChange={checkPass} autoComplete='off' id='passInput' required />
              <span></span>
              <label>Password</label>
            <div className='showpass' onClick={showPassFunc}><AiIcons.AiFillEyeInvisible /></div> 
            </div>
            <p className='email-error'>{pvalid}</p>

            <div className="txt_field">
                <input type="password" name='confirmpass' onChange={checkConfirmPass} autoComplete='off' id='confirmpassInput' required />
                <span></span>
                <label>Confirm Password</label>
                <div className='showpass' onClick={showConfirmPassFunc}><AiIcons.AiFillEyeInvisible /></div> 

            </div>
            <p className='email-error'>{confirmmsg}</p>
              <input className='submitsignup' type="submit" name='submit_btn' value="Sign up" />
              <div className="signup_link">
              Have an account? <Link to="/login">Login</Link>
            </div>
        </form>
        </div>
    </div>
  </Animation>  
  )
}

export default Signup