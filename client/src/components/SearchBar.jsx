import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { useNavigate, redirect, useActionData } from 'react-router-dom';

const SearchBar = ( ) => {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    

    function handleChange(e){
        setText(e.target.value);
    }

    function handleKeyDown(e){
        if(e.key === 'Enter') {
            e.preventDefault();
            const search = sanitizeText(text)
            navigate(`/search/${search}`)
            setText(() => '');
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
        <form /* Form method='post' action={'/search/' + text} */>
            <label htmlFor="search-bar"></label>
            <input
                id='search-bar'
                name='search'
                value={text}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e)=> handleKeyDown(e)}
            />
        </form>
     );
}

export default SearchBar;