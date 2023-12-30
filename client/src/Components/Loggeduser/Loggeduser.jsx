import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Loggeduser.css';;

function Loggeduser() {

        const [isActive, setIsActive] = useState(false);
        const user = JSON.parse(localStorage.getItem('logged-in-user'));

        const logout = async () => {
                fetch('http://localhost:3050/logout', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        },
                        credentials: 'include' 
                });
                localStorage.removeItem('logged-in-user');
        }

        return (
        <div className="dropdown">
                <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>{user?user.handle:"User"}</div>
                {isActive && user ? <div className="dropdown-content">
                        <Link to="/user" className="dropdown-item">
                                Settings
                        </Link>
                        <a href='/' onClick={logout} className="dropdown-item">
                                Log out
                        </a>
                </div>: <div></div>}
                
        </div>
        );
}
export default Loggeduser