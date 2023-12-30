import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultTopbar from '../../Components/DefaultTopbar/DefaultTopbar';
import './BookDetails.css';

function BooksDetails() {

  const {state} = useLocation();
  const book = state;
  console.log(book);

  const navigate = useNavigate();
  const readBook = async () => {
    
    fetch("http://localhost:3050/read?book="+book.title, {
        mode: "cors",
        credentials: "include"
    }).then((result) => {
        result.json().then((jsonResult) => {
            const toc = jsonResult.contents;
            const pages = jsonResult.pages;
            console.log(book);
            navigate('/reader', {
              state: {
                id: book.id,
                title: book.title,
                // chapter: chapter, 
                toc: toc, 
                pages: pages,
                index: book.progress.current_index,
                book: book
              }
            });

        });   
    }, (reason) => {
        console.log(reason);
        navigate('/login');
    });

  };


  const addToWishlist = async () => {
    fetch("http://localhost:3050/wishlist?book="+book.title, {
        method: "POST",
        mode: "cors",
        credentials: "include"
    }).then((result) => {
        result.json().then((jsonResult) => {
            console.log(jsonResult);
            if(!jsonResult.error) {
              // show success message
              alert('Added to Wishlist!');
            } else {
              // show error message
              alert(jsonResult.error);
            }
        });   
    }, (reason) => {
        console.log(reason);
        navigate('/login');
    });
  }

  return (
    <div>
      <DefaultTopbar />

    <div className='bookdetails'>
      <div className='book-card-grid'>
        <div className='bookimg'>
        <img src={"data:" + book.metadata.mimeType + ";base64," + book.metadata.cover} alt={book.metadata.title} style={{height: 500}}/>
        <div className='controlbtns'>
          <button className='details-control-btn' onClick={readBook}>Read Now</button>
          <button className='details-control-btn' onClick={addToWishlist}>Add to wishlist</button>
        </div>
        </div>
        <div className='description'>

          <div className='title'>{book.metadata.title}</div>        
          <div className='author'>{book.metadata.creator}</div>
          <div className='summary'>
          {book.metadata.summary}
          </div>
        </div>
      </div>
      <div className='additional-info'>
        <p className='language'>Language: {book.language}</p>
        <p className='publisher'>Publisher: {book.publisher}</p>
        <p className='topic'>Topic: {book.genre[0].name}</p>
        <p className='format'>Format: ePub</p>
        <p className='year'>Publishing Year: {book.publishing_year}</p>
        <p className='ISBN'>ISBN: {book.isbn}</p>
      </div>
    </div>
    </div>
  )
}

export default BooksDetails