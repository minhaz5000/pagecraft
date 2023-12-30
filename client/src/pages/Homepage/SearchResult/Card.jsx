import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Card.css'
function Card(props) {

    const navigate = useNavigate();
  const readBook = async () => {
    fetch("http://localhost:3050/read?book=" + props.info.title, {
      mode: "cors",
      credentials: "include",
    }).then(
      (result) => {
        result.json().then((jsonResult) => {
          const pages = jsonResult.pages;

          navigate("/reader", {
            state: {
              id: props.id,
              title: props.info.title,
              pages: pages,
              index: 0,
              book: props.info
            },
          });
        });
      },
      (reason) => {
        console.log(reason);
      }
    );
  };

    return (
        <div className='wrapper'>
            <Link to='/book' className='card' state={props.info}>
                <img src={props.img} alt={props.title}/>
                <div className='info'>
                    <h1 id='title'>{props.title}</h1>
                    <p>{props.author}</p>
                    <p>{props.year}</p>
                    <div className='button' onClick={readBook}>Read Now</div>
                </div>
            </Link>
        </div>
    );
}

export default Card