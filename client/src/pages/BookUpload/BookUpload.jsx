import React from 'react'
import './BookUpload.css'
import * as AiIcons from 'react-icons/ai'
import TopBar from '../../Components/TopBar/TopBar'
import Author from './author'
import Topic from './topic'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function BookUpload() {
  const [authorCounter, setAuthorCounter] = useState(1);
  const [topicCounter, setTopicCounter] = useState(1);
 
  //increase counter
  const authorIncrease = () => {
    if(authorCounter<20)
    setAuthorCounter(authorCounter => authorCounter + 1);
    console.log(authorCounter);
  };
  //decrease counter
  const authorDecrease = () => {
    if(authorCounter>1)
    setAuthorCounter(authorCounter => authorCounter - 1);
    console.log(authorCounter);
  };

  //increase counter
  const topicIncrease = () => {
    if(topicCounter<20)
    setTopicCounter(topicCounter => topicCounter + 1);
    console.log(topicCounter);
  };
  //decrease counter
  const topicDecrease = () => {
    if(topicCounter>1)
    setTopicCounter(topicCounter => topicCounter - 1);
    console.log(topicCounter);
  };

  const authors = [];
  for (let i = 1; i <= authorCounter; i++) {
    authors.push(<Author id={i} key={i} />);
  }

  const topics = [];
  for (let i = 1; i <= topicCounter; i++) {
    topics.push(<Topic id={i} key={i} />);
  }

  const [file, setFile] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFile(e.target.files[0]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    formData.append('ebook', file)
    
    fetch('http://localhost:3050/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include' 
    }).then((response) => {
      response.json().then((jsonResponse) => {
        if (! jsonResponse.error) {
          console.log(jsonResponse);
          navigate(0);
        } else {
          // invalid login
          console.log(jsonResponse.error);
          alert('jsonResponse.error');
        }
      });  
      
    }); 

  };

  return (
    <div>
    <TopBar />
    <div className='mainbody'>
    <div className='container-main'>
    <div className='titleadd'>Add New Book</div>
        <form onSubmit={onSubmit}>
        <div className='bookdetails'>
            <div className="input_box">
              <label className="Labeldetails" >Book Name</label>
              <span></span>
              <input type="text" name='title' required />
            </div>
            
            <div className="input_box">
              <label className="Labeldetails" >Langugae</label>
              <span></span>
              <input type="text" name='language' required />
            </div>

            <div className="input_box">
              <label className="Labeldetails" >Publisher</label>
              <span></span>
              <input type="text" name='publisher' required />
            </div>
            

            {/* <div className="input_box">
              <label className="Labeldetails" >Topic</label>
              <span></span>
              <input type="text" name='topic' required />
            </div> */}


            <div className="input_box">
              <label className="Labeldetails" >Format</label>
              <span></span>
              <input type="text" name='format' required />
            </div>

            <div className="input_box">
              <label className="Labeldetails" >Publishing Year</label>
              <span></span>
              <input type="text" name='publishing_year' required />
            </div>


            <div className="input_box">
              <label className="Labeldetails" >Edition</label>
              <span></span>
              <input type="text" name='edition' required />
            </div>

            <div className="input_box">
              <label className="Labeldetails" >ISBN</label>
              <span></span>
              <input type="text" name='isbn' required />
            </div>
            <div className="input_box">
              <label className="Labeldetails" ></label>
              <span></span>
              <input type="text" hidden />
            </div>
            
            <div className='input_box'>
              <label className="LabeldetailsA" >Author</label>
              <span></span>
              <AiIcons.AiFillPlusCircle onClick={authorIncrease} className="authorbtn" />
              <AiIcons.AiFillMinusCircle onClick={authorDecrease} className="authorbtn" />
              {authors}
            </div>

            <div className="input_box">
              <label className="Labeldetails" ></label>
              <span></span>
              <input type="text" hidden />
            </div>
            
            <div className='input_box'>
              <label className="LabeldetailsA" >Topic</label>
              <span></span>
              <AiIcons.AiFillPlusCircle onClick={topicIncrease} className="authorbtn" />
              <AiIcons.AiFillMinusCircle onClick={topicDecrease} className="authorbtn" />
              {topics}
            </div>

            <div className="input_boxz">
              <label className="Labeldetails" >Summary</label>
              <span></span>
                <textarea required />
            </div>

            <input className='addfile' type="file" onChange={onChange} />
            <input className='submitform' type="submit" value="submit" />  
          </div>
        </form>
    </div>
    </div>
    </div>
  )
}

export default BookUpload