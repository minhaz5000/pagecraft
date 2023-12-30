import React, {useState, useEffect, useRef, useCallback} from 'react';
import * as AiIcons from 'react-icons/ai'; //for aiICons icons
import './Reader.css';
import Sidebar from '../../Components/TableofContents/Sidebar.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './loader';
import ReaderTopbar from '../../Components/ReaderTopbar/ReaderTopbar';
function Reader() {
  const location = useLocation();
  const navigate = useNavigate();

  const [countPages, setCountPages] = useState(1);
  const pages = location.state ? location.state.pages : null;
  const book = location.state ? location.state.title : null;
  const info = location.state ? location.state.book : null;
  const [currentPageIndex, setCurrentPageIndex] = useState(location.state ? location.state.index : 0);
  const [fontSize, setFontSize] = useState(1);
  const [contents, setContents] = useState([""]);
  const iframeRefs = useRef();
  iframeRefs.current = [];

  // loading information
  const [loading, setLoading] = useState(true);
  const [hasMore, sethasMore] = useState(false);  

  const addToRefs = (el) => {
    if(el && !iframeRefs.current.includes(el)) {
      el.addEventListener('load', () => {
        el.contentWindow.document.body.style.fontSize = fontSize + "em";
        el.style.height = el.contentWindow.document.body.scrollHeight + 50 + 'px';
        el.style.height = el.contentWindow.document.documentElement.scrollHeight + 5 + 'px';
      })
      iframeRefs.current.push(el);
    }
  }  
  

  const reloadIframe = () => {
    for (let i=0; i<countPages; i++){
      iframeRefs.current[i].contentDocument.location.reload();
    }
  }

  const increaseFontSize = () => {
    setFontSize(Math.min(5, fontSize + .1));
    reloadIframe();
  }

  const decreaseFontSize = () => {
    setFontSize(Math.max(.5, fontSize - .1));
    reloadIframe();
  }

  const fetchData = useCallback(async (idx) => {
    console.log("loading chapter "+(currentPageIndex+idx));
    console.log(currentPageIndex);
    console.log(countPages);
    fetch("http://localhost:3050/read?book="+book+"&chapter="+pages[currentPageIndex+idx].id, {
        mode: "cors",
        credentials: "include"
    }).then((result) => {
        result.json().then((jsonResult) => {
          if(idx < countPages) {
            setContents((contents) => contents.map((oldContent, i) => {
              if(i === idx) {
                setLoading(false);
                return jsonResult.chapter;
              } else {
                return oldContent;
              }
            }));
            
          } else {
            setContents((contents) => {
              if(contents.includes(jsonResult.chapter)) return contents;
              setCountPages(countPages + 1);
              setLoading(false);
              info.progress.current_index = currentPageIndex + idx - 1;
              return [...contents, jsonResult.chapter]
            })
          }
          
          sethasMore(pages.length > countPages);

        });   
    }, (reason) => {
        console.log(reason);
    });
  }, [book, countPages, currentPageIndex, pages]);
  

  const handleScroll = useCallback(async (e) => {  
    if(loading) return;
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
      && hasMore) {

      setLoading(true);
      fetchData(countPages);
    }

  }, [loading, hasMore, countPages, fetchData])

  useEffect(() => {
    // check logged in user
    if(!localStorage.getItem("logged-in-user")) {
      navigate("/login");
    }

    if(!location.state) {
      navigate("error");
    }

    fetchData(0);

    // scrolling
    window.addEventListener("scroll", handleScroll);

    handleScroll();

  }, [fetchData, handleScroll, location.state, navigate, currentPageIndex]);


  return (
    <div>
      <div className='bookheaderbar'>
        <ReaderTopbar info={info}/>
        <header className='book-name'>
          <span>{book}</span>  
        </header>
      </div>
      <div className='body'>
      <div className='main-container'>
      
        <aside className='sidebar'>
          <Sidebar 
            pages={pages} 
            id={location.state.id}
            book={book} 
            reloadIframe={reloadIframe}
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            info={info}
          />
        </aside>
      
        <main className='content'>
          <div className='book'>
            {contents.map((content, index) => {
              return (<iframe key={index} className='iframe' ref={addToRefs} title="content" srcDoc={content} ></iframe>);
            })}
          </div>
          <div>
            {loading && (<Loader />)}
          </div>
        </main>
      
      </div>

    </div>
    </div>
  )
}

export default Reader