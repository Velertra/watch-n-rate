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

    const cutContent = (content) => {
        const maxLength = 17;
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + "";
        } else {
            return content;
        }
    }

    return ( 
        <>
            {details 
            && 
            <div id="feature-icon-container">
                <div id="feature-icon">
                    <Link to={`/feature/${type + - + details.id}`}><img id="feature-icon-img" src={"https://image.tmdb.org/t/p/w500" + details.poster_path}></img></Link>
                    {/* <h4>{details.title || details.name}</h4> */}
                </div>
                <div>
                    <h6 id="feature-icon-name">{cutContent(details.title || details.name)}</h6>
                </div>
            </div>
            }
        </>
     );
     
}
 
export default FeatureIcon;