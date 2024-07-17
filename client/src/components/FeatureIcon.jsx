import { useEffect, useState } from "react";
import { FullDetails } from "../utilities/ApiFunction";
import { Link, NavLink, useNavigate } from "react-router-dom";

const FeatureIcon = ({type, id}) => {
    const [details, setDetails] = useState();
    const navigate = useNavigate();

    
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

        
        if(type =='movie' || type == 'tv' ){
            getDetails();
        }

        return() => {
            abortController.abort();
        }
    }, [])

    const handleContentClick = (agent) => {
        //navigate(`/feature/${type + - + agent.id}`)
        
    }

    return ( 
        <>
            {details 
            && 
                <div id="feature-icon" onClick={() => handleContentClick(details)}>
                    <img style={{width: '15vh'}} src={"http://image.tmdb.org/t/p/w500" + details.poster_path}></img>
                    {/* <h4>{details.title || details.name}</h4> */}
                </div>
            }
        </>
     );
     
}
 
export default FeatureIcon;