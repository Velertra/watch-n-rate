import { useEffect, useState } from "react";

const Choices = ( { show, searchedWord } ) => {
    
    return ( 
        <>
            {show ? <div>{searchedWord.map((selection, index) => {
                return (
                    <div key={index}>
                        <div>{selection.title}{console.log(selection)}</div>
                    </div>
                )
            })}</div> : <>no</>}
        </>
     );


    }
 
export default Choices;
