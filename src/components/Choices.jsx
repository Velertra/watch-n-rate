import { useEffect, useState } from "react";
import ApiFunction from "../utilities/ApiFunction";

const Choices = ( { show, searchedWord } ) => {
    
    return ( 
        <>
            {show ? <div>{searchedWord}</div> : <>no</>}
        </>
     );


    }
 
export default Choices;
