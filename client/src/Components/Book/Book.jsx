import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";

function getBook(book) {
  return (
    <Book
      img={"data:" + book.metadata.mimeType + ";base64," + book.metadata.cover}
      title={book.metadata.title}
      author={book.metadata.creator}
      id={book.id}
      info={book}
      year = {book.publishing_year}
    />
  );
}

function Book(props) {
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
              // chapter: chapter,
              // toc: toc,
              pages: pages,
              index: props.info.progress.current_index,
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
    <div className="wrapper">
      <Link to="/book" className="card" state={props.info}>
        <img src={props.img} alt={props.title} />
        <div className="info">
          <h1 id="title">{props.title}</h1>
          <p>{props.author}</p>
          <p>{props.year}</p>
          <div className="button" onClick={readBook}>
            Read Now
          </div>
        </div>
      </Link>
    </div>
  );
}

export { getBook };
export default Book;
