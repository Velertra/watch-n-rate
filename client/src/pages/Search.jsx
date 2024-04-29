import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiFunction } from "../utilities/ApiFunction";
import { useNavigate } from "react-router-dom"
import FavsBtn from "../components/FavsBtn";

const SearchPage = () => {
    const [error, setError] = useState(false);
    const [movieInfo, setMovieInfo] = useState('');
    const { code } = useParams();
    const navigate = useNavigate();

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


    function handleContentClick(agent) {
        console.log(agent.title || agent.name)
        navigate(`/feature/${(agent.media_type || agent.media_type)+ - + agent.id}`)

    }

    function handleFavClick(agent) {
        console.log(agent.title || agent.name)
        console.log(agent)
    }

    return ( 
        <div>
            {movieInfo.results && (movieInfo.results).map((movie, index) => {
            return (
                <div id="movie-content" style={{display: 'flex'}} onClick={() => handleContentClick(movie)} key={index}>
                    <img style={{width: '15vh'}} src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}></img>
                    <div id="movie-details">
                        <ul key={index}>
                            <li>
                                <h3 style={{fontSize: '2vh'}}>{movie.title || movie.name}</h3>
                                <p style={{width: '1vh'}}>{movie.popularity}</p>
                                <p style={{fontSize: '1.5vh'}}>{movie.overview}</p>
                            </li>
                        </ul>
                        <FavsBtn
                            title={movie.title || movie.name}
                            type={movie.media_type}
                            featureId={movie.id}
                        />
                    </div>
                </div>
            )
        })}</div>
     );
}
 
export default SearchPage;