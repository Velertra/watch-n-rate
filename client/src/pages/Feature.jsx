import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullDetails } from "../utilities/ApiFunction";
import FavsBtn from "../components/FavsBtn"
import WatchList from "../components/WatchList";
import Review from "../components/Review";

const Feature = () => {
    const [details, setDetails] = useState();
    const { content } = useParams();
    const [type, id] = content.split("-");

    useEffect(()=> {
        let abortController = new AbortController();  

        async function getDetails(){
            let response = await FullDetails(type, id, {
                signal: abortController.signal
            });
            
            if(!abortController.signal.aborted){
                let data = await response;
                setDetails(data);
            }
        }
        
        if(content){
            getDetails();
        }

        return() => {
            abortController.abort();
        }
    }, [])

    return ( 
        <>
            {details 
            && 
            <div>
                <div id="details-content" style={{display: 'flex'}}>
                    <img style={{width: '15vh'}} src={"http://image.tmdb.org/t/p/w500" + details.poster_path}></img>
                    <div id="feature-details">
                        <ul>
                            <li>
                                <h3 style={{fontSize: '2vh'}}>{details.title || details.name}</h3>
                                <p style={{width: '1vh'}}>{details.popularity}</p>
                                <p style={{fontSize: '1.5vh'}}>{details.overview}</p>
                            </li>
                        </ul>
                        <FavsBtn
                            title={details.title || details.name}
                            type={type}
                            featureId={details.id}
                        />
                        <WatchList
                            title={details.title || details.name}
                            type={type}
                            featureId={details.id}
                        />
                        <Review />
                    </div>
                </div>
            </div>}
        </>    
    );
}
 
export default Feature;