import React, { useState, useEffect } from 'react';

const App = () => {
  const [heading, setHeading] = useState("Mangnificent Monkeys");

  const clickHandler = () => {
    setHeading("Radical Rhinos");
  };

  return (
    <>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
    </>
    
  )
};

export default App
