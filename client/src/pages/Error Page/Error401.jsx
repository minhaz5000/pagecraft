import React from 'react';
import './ErrorPage.css';

function Error401() {

    var code = '401';    //fetch this from props
    var msg401 = 'Stop in the name of law! You are not authorized to access this page';
  return (
    <div className='ErrorPage'>
        <h1 className='ErrorCode'>{code}!</h1>
        <img className='ErrorImg' src={require('./401.jpg') } />
        <p className='ErrorMsg'>{msg401}</p>
        <a className='homefromerror' href='/'>Go back home</a>
    </div>
  )
}

export default Error401