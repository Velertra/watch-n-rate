import { useEffect, useState } from "react";
import { FullDetails } from "../utilities/ApiFunction";

const FeatureIcon = ({type, id}) => {
    const [details, setDetails] = useState();

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
        
       
            getDetails();
        

        return() => {
            abortController.abort();
        }
    }, [])

    return ( 
        <>{console.log(details)}
            {details 
            && 
                <div id="feature-icon">
                    <img style={{width: '15vh'}} src={"http://image.tmdb.org/t/p/w500" + details.poster_path}></img>
                    <h4>{details.title || details.name}</h4>
                </div>
            }
        </>
     );
     
}
 
export default FeatureIcon;