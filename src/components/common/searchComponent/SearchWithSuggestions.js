// components/SearchWithSuggestions.js
import React, { useState } from 'react';
import './SearchWithSuggestions.css'; // Import your CSS file
import { FaSearch } from 'react-icons/fa';

const SearchWithSuggestions = ({ data,onClickSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchInput = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);

    const filteredSuggestions = data.filter(item =>
      item.toLowerCase().includes(inputText.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setSuggestions([]);
  };

  const handleSearchButtonClick = (event) => {
    event.preventDefault();
    if(searchText){
    onClickSearch(searchText);
    }
  };

  // const handleBlurSearch = (event) =>{
  //   event.preventDefault();
  //   if(!event.target.value){
  //     setSuggestions([])
  //   }
  // }

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchInput}
          // onBlur={handleBlurSearch}
          placeholder="Search..."
        />
        <button className="search-button" onClick={handleSearchButtonClick}>
        <FaSearch className='search-icon'/>
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchWithSuggestions;
