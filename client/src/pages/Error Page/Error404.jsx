import React from 'react';
import './ErrorPage.css';

function Error404() {

    var code = '404';    //fetch this from props
    var msg404 = 'Look like you\'re lost. The page you are looking for not avaible!'
  return (
    <div className='ErrorPage'>
        <h1 className='ErrorCode'>{code}!</h1>
        <img className='ErrorImg' src={require('./404.gif')} />
        <p className='ErrorMsg'>{msg404}</p>
        <a className='homefromerror' href='/'>Go back home</a>

    </div>
  )
}

export default Error404