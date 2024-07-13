import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiFunction } from "../utilities/ApiFunction";
import { useNavigate } from "react-router-dom"
import FavsBtn from "../components/FavsBtn";

const SearchPage = () => {
    const [error, setError] = useState(false);
    const [movieInfo, setMovieInfo] = useState('');
    const [searchInfo, setSearchInfo] = useState();
    const { code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let abortController = new AbortController();

        async function getSearchInfo() {
            let featureData,
            userData;
            try{
                let response = await ApiFunction(code, {
                signal: abortController.signal,
            });

            if (!response) {
                setError(true); 
            }
        
            if(!abortController.signal.aborted) {
                featureData = await response;
            }    
            } catch {
                console.error("feature search did not run correctly");
            }

            try{
                let response = await fetch(`http://localhost:3000/searchthruusers/${code}`, {
                    method: 'GET',
                    header:{signal: abortController.signal,}
                });
    
                if (!response) {
                    setError(true); 
                }
            
                if(!abortController.signal.aborted) {
                    userData = await response.json();
                }    
             

            } catch {
                console.error("error using search for user");
            }

            setSearchInfo({
                featureSearch: featureData,
                //userSearch: userData
            })
            
        }

        if(code) {
            getSearchInfo();
        }
        return() => {
            abortController.abort();
        }
    }, [code])


    function handleContentClick(agent) {
        console.log(agent.title || agent.name)
        navigate(`/feature/${(agent.media_type || agent.media_type)+ - + agent.id}`)
    }

    return ( 
        <div>{console.log(searchInfo)}
            {searchInfo?.featureSearch?.results && (searchInfo.featureSearch.results).map((movie, index) => {
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
                        {/* <FavsBtn
                            title={movie.title || movie.name}
                            type={movie.media_type}
                            featureId={movie.id}
                        /> */}
                    </div>
                </div>
            )
        })}</div>
     );
}
 
export default SearchPage;