import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FeatureSearch } from "../utilities/ApiFunction";
import { useNavigate } from "react-router-dom"
import FavsBtn from "../components/FavsBtn";
import { Image } from "cloudinary-react";

const SearchPage = () => {
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
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
                let response = await FeatureSearch(code, {
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
                let response = await fetch(`${url}/searchthruusers/${code}`, {
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
                userSearch: userData?.user
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
        navigate(`/feature/${(agent.media_type || agent.media_type)+ - + agent.id}`)
    }

    const cutContent = (content) => {
        const maxLength = 300;
        if (content?.length > maxLength) {
            return content.substring(0, maxLength) + "...";
        } else {
            return content;
        }
    }

    return ( 
        <div id="search-body">
            <div id="sp-profile-section">
                {searchInfo?.userSearch
                &&
                <div id="sp-profile-container" onClick={() => navigate(`/profile/${searchInfo.userSearch?.username}`)}>
                    
                    <div id="sp-profile-img-container">
                        <Image id="sp-profile-img" cloudName="dockrhn34n4" publicId={searchInfo.userSearch?.imagePath}/>
                    </div>
                    <h3 id="sp-profile-name">{searchInfo.userSearch?.username}</h3>
                    <div id="sp-content">
                        <div><h4 id="sp-recent-label">Recents</h4></div>
                    {searchInfo.userSearch?.liked.map((like, index) => (
                        
                            <h6 key={index}>{like.title}</h6>
                        
                    ))}
                    </div>
                </div>
                }
            </div>

            <div id="sp-feature-section">
                {searchInfo?.featureSearch?.results && (searchInfo.featureSearch.results).map((movie, index) => {
                return (
                    <div id="movie-content" style={{display: 'flex'}} onClick={() => handleContentClick(movie)} key={index}>
                        <img style={{width: '15vh'}} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}></img>
                        <div id="movie-details">
                            <ul key={index}>
                                <li>
                                    <h3 style={{fontSize: '2vh'}}>{movie.title || movie.name}</h3>
                                    <p style={{fontSize: '3vh'}}>&#10025;{movie.vote_average}</p>
                                    <p style={{fontSize: '1.5vh'}}>{cutContent(movie.overview)}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
                })}
            </div>
            
        </div>
     );
}
 
export default SearchPage;