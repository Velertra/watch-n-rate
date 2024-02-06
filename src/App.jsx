import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar';

const App = () => {
  const [heading, setHeading] = useState("Mangnificent Monkeys");

  const clickHandler = () => {
    setHeading("Radical Rhinos");
  };

  return (
    <>
      <SearchBar />
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
    </>
    
  )
};

export default App
