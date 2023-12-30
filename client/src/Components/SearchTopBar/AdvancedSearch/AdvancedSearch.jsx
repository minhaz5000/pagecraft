import React from 'react';
import './AdvancedSearch.css';
import DropdownSearch from './DropdownSearch/DropdownSearch';

const language = [
  { label: 'Bengali', value: 'Bengali' },
  { label: 'English', value: 'English' },
];

// const edition = [
//   { label: '1', value: '1' },
//   { label: '2', value: '2' },
//   { label: '3', value: '3' },
//   { label: '4', value: '4' },
// ];


// const author = [
//   { label: 'A', value: 'A' },
//   { label: 'B', value: 'B' },
//   { label: 'C', value: 'C' },
//   { label: 'D', value: 'D' },
// ];

const genre = [
  { label: 'Art', value: 'Art' },
  { label: 'Biology', value: 'Biology' },
  { label: 'Business', value: 'Business' },
  { label: 'Computer', value: 'Computer' },
  { label: 'Design', value: 'Design' },
  { label: 'Economy', value: 'Economy' },
  { label: 'Histoy', value: 'Histoy' },
  { label: 'Law', value: 'Law' },
  { label: 'Literature', value: 'Literature' },
  { label: 'Math', value: 'Math' },
  { label: 'Medicine', value: 'Medicine' },
  { label: 'Sociology', value: 'Sociology' },
  { label: 'Philosophy', value: 'Philosophy' },
  { label: 'Politics', value: 'Politics' },
  { label: 'Technology', value: 'Technology' },
];

// const publisher = [
//   { label: 'A', value: 'A' },
//   { label: 'B', value: 'B' },
//   { label: 'C', value: 'C' },
//   { label: 'D', value: 'D' },
// ];

function AdvancedSearch() {
  return (
    <div className='advancedSearchblock'>
        <div className="filter">
          <div className='fix'><DropdownSearch dat={language} plc="Language" mul={false} name="language" /></div>
          <div className='fix'><input placeholder='Author' className='filtertext' type='text' name='author'/></div>
          <div className='fix'><DropdownSearch dat={genre} plc="Book Genre" mul={true} name="genre"/></div>
          <div className='fix'><input placeholder='Edition' className='filternumber' type='number' min="1" max="99" name='edition'/></div>
        </div>
    </div>
  )
}

export default AdvancedSearch