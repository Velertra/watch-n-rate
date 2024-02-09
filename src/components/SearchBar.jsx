import React, { useState } from 'react';
import ApiFunction from '../utilities/ApiFunction';


const SearchBar = ( { onEnter } ) => {
    const [text, setText] = useState("");

    function handleChange(e){
        setText(e.target.value);
    }

    async function handleKeyDown(e){
        if(e.key === 'Enter') {
            const search = sanitizeText(text);
            const result = await ApiFunction(search);
            onEnter(result.results);
            setText(() => "");
        }
    }

    //also updates words for API use
    function sanitizeText(result){
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "/": '&#x2F;',
            " ": '%20;'
        }
        const reg = /[&<>"/ ]/ig;
        return result.replace(reg, (match) => (map[match]));
    }

    return ( 
        <>
            <label htmlFor="search-bar"></label>
            <input
                id='search-bar'
                value={text}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e)=> handleKeyDown(e)}
            />
            
        </>
     );
}
 
export default SearchBar;