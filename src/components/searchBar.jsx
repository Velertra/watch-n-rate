import React, { useState } from 'react';
import ApiFunction from '../utilities/ApiFunction';

const SearchBar = () => {
    const [text, setText] = useState("");

    function handleChange(e){
        setText(e.target.value);
    }

    function handleKeyDown(e){
        if(e.key === 'Enter') {
            const search = sanitizeText(text)
            console.log(search)
            ApiFunction(text/* search */);
        }
    }

    function sanitizeText(result){
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
           /*  "'": '&#x27;', */
            "/": '&#x2F;',
        }
        const reg = /[&<>"/]/ig;
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