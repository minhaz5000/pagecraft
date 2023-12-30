import React, {useState, useEffect} from 'react';
import {getBook} from '../../../Components/Book/Book';
import './Reading.css';
import Animation from '../Animation';
function Reading() {  
    const [readingList, setReadingList] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem('logged-in-user')) {
            console.log("unauthorized access...");
            /// redirect to 401 page
        } else {
            const user = JSON.parse(localStorage.getItem('logged-in-user'))
            console.log(user.handle);
        }

        const fetchData = async () => {
            fetch("http://localhost:3050/books/reading?count=4", {
                mode: "cors",
                credentials: "include"
            }).then((result) => {
                result.json().then((jsonResult) => {
                    setReadingList(jsonResult.books);
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
        <h2 className='titleofcount'>Resume From Where you left</h2>
        <div className='books'>
            {readingList.map(getBook)}
            </div>
    </div>
    </Animation>
  )
}

export default Reading