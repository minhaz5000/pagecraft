import React, {useEffect} from 'react'
import Logo2 from '../../../Components/Logo2/Logo2'
import AdvancedSearch from '../../../Components/SearchTopBar/AdvancedSearch/AdvancedSearch'
import { useState } from 'react';
import './SearchResult.css'
import Card from './Card';
import { useLocation, useNavigate } from 'react-router-dom';
function Searchresult() {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const advancedToggle = (e) => {
    e.preventDefault();
    setAdvancedSearch(!advancedSearch);
  }


  const search = useLocation().search;

  const params = new URLSearchParams(search);

  const query = params.get('query')?`query=${params.get('query')}`:'';
  const genre = params.get('genre')?`genre=${params.get('genre')}`:'';
  const title = params.get('title')?`title=${params.get('title')}`:'';
  const author = params.get('author')?`author=${params.get('author')}`:'';
  const edition = params.get('edition')?`edition=${params.get('edition')}`:'';
  const language = params.get('language')?`language=${params.get('language')}`:'';

  const [bookList, setBookList] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
        fetch(`http://localhost:3050/search?${query}&${title}&${author}&${genre}&${edition}&${language}`, {
            mode: "cors",
            credentials: "include"
        }).then((result) => {
            result.json().then((jsonResult) => {
                setBookList(jsonResult.books);
            });
        }, (reason) => {
            console.log(reason);
        });
    };
    fetchData();
}, [query, title, author, genre, edition, language]);

const navigate = useNavigate();
 const onSubmit = (e) => {
    e.preventDefault();
    const query = e.target.query?`query=${e.target.query.value}`:'';
    const genre = e.target.genre?`genre=${e.target.genre.value}`:'';
    const title = e.target.title?`title=${e.target.title.value}`:'';
    const author = e.target.author?`author=${e.target.author.value}`:'';
    const edition = e.target.edition?`edition=${e.target.edition.value}`:'';
    const language = e.target.language?`language=${e.target.language.value}`:'';
    navigate(`/search?${query}&${title}&${author}&${genre}&${edition}&${language}`);
 }
  return (
    <div>
    <div className='toprowsearch'>
      <Logo2 />
      <div className='header-search-main'>
        <form onSubmit={onSubmit} className='search-form-main'>
            <input type={'text'} name='query' className='searchbox-main' placeholder="Search by title, author, ISBN & topic" />
            <input type='submit' hidden/>
            <div className='hidden-filters-main'>{ advancedSearch ? <AdvancedSearch />: <p></p>}</div>
        </form> 
      </div>
      <button className='filter-btn' onClick={advancedToggle}>Filter</button>
    </div>
    <div className='filters-main'>
      <div></div>
      <div>
        <h2 className='titleofcount'>Showing {bookList.length} results</h2>
        <div className='result-of-search'>
        {bookList.map((book, index) => 
          <Card 
            img={"data:" + book.metadata.mimeType + ";base64," + book.metadata.cover}
            title={book.metadata.title} 
            author={book.metadata.creator} 
            id={book.id}
            info={book}
            year = {book.publishing_year}  
          />
        )}
        
        </div>
      </div>
      <div></div>
    </div>

    </div>
  )
}

export default Searchresult