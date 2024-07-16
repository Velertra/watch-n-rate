const Choices = ( { show, searchedWord } ) => {

    const shortSummery = (text) => {
        if (text.length > 100) {
          return text.substring(0, 200) + "...";
        } else {
          return text;
        }
    };
    
    return ( 
        <>
            {show ? <div>{console.log(searchedWord)}{searchedWord.map((selection, index) => {
                return (
                    <div style={{display: 'flex'}} key={index}>
                        <img style={{width: '15vh'}} src={"https://image.tmdb.org/t/p/w500" + selection.poster_path}></img>
                        <ul key={index}>
                            <li>
                                <h3 style={{fontSize: '2vh'}}>{selection.title || selection.name}{console.log(selection)}</h3>
                                <p style={{width: '1vh'}}>{selection.popularity}</p>
                                <p style={{fontSize: '1.5vh'}}>{selection.overview}</p>
                            </li>
                        </ul>
                    </div>
                )
            })}</div> : null}
        </>
     );


    }
 
export default Choices;