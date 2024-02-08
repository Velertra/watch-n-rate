import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar';
import Choices from './components/Choices';

const App = () => {
  const [choice, setChoice] = useState(false);
  const [searchText, setSearchText] = useState()
   const mounted = useRef();

  function onEnter(text){
    setSearchText(() => text)
    setChoice(() => true)
  }
/*
  useEffect(() => {
    if(mounted.current){
      console.log(searchText)
    } else {
        mounted.current = true;
    }
  }, [choice]) */
 

  return (
    <>
      <SearchBar
        onEnter={onEnter}
      />
      <Choices 
        show={choice}
        searchedWord={searchText}
      />
    </>
    
  )
};

export default App
