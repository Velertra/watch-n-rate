import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiFunction } from "../utilities/ApiFunction";

const SearchPage = () => {
    const [error, setError] = useState(false);
    const [movieInfo, setMovieInfo] = useState('');
    const { code } = useParams();

    useEffect(() => {
        let abortController = new AbortController();

        async function getMovieInfo() {
            
            let response = await ApiFunction(code, {
            signal: abortController.signal,
            });

            if (!response) {
                setError(true); 
            }
        
            if(!abortController.signal.aborted) {
                let data = await response;

                setMovieInfo(data);
            }
        }

        if(code) {
            getMovieInfo();
        }

        return() => {
            abortController.abort();
        }
    }, [code])

    return ( 
        <div>
            {movieInfo.results && (movieInfo.results).map((movie, index) => {
            return (
                <div style={{display: 'flex'}} key={index}>
                    <img style={{width: '15vh'}} src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}></img>
                    <ul key={index}>
                        <li>
                            <h3 style={{fontSize: '2vh'}}>{movie.title || movie.name}</h3>
                            <p style={{width: '1vh'}}>{movie.popularity}</p>
                            <p style={{fontSize: '1.5vh'}}>{movie.overview}</p>
                        </li>
                    </ul>
                </div>
            )
        })}</div>
     );
}
 
export default SearchPage;