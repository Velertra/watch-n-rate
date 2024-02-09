import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar';
import Choices from './components/Choices';

const App = () => {
  const [choice, setChoice] = useState({
    program: "",
    display: false
  });

  function onEnter(text){
    setChoice({
      program: text,
      display: true
    })
  }

  return (
    <>
      <SearchBar
        onEnter={onEnter}
      />
      <Choices 
        show={choice.display}
        searchedWord={choice.program}
      />
    </>
    
  )
};

export default App
