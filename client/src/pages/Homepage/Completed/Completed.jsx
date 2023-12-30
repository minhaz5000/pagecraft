import React, {useState, useEffect} from 'react';
import './Completed.css';
import {getBook} from '../../../Components/Book/Book';
import Animation from '../Animation';
function Completed() {

    const [completedList, setCompletedList] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem('logged-in-user')) {
            console.log("unauthorized access...");
            /// redirect to 401 page
        } else {
            const user = JSON.parse(localStorage.getItem('logged-in-user'))
            console.log(user.handle);
        }

        const fetchData = async () => {
            fetch("http://localhost:3050/books/completed?count=4", {
                mode: "cors",
                credentials: "include"
            }).then((result) => {
                result.json().then((jsonResult) => {
                    setCompletedList(jsonResult.books);
                });
            }, (reason) => {
                console.log(reason);
            });
        };
        fetchData();
    }, []);

    return (
        <Animation>
            <div className='group'>
            <h2 className='titleofcount'>The Books You've Read</h2>
            <div className='books'>
                    {completedList.map(getBook)}
                </div>
        </div>
    </Animation>
        
      )
}

export default Completed