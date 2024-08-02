import { useEffect, useState } from "react";
import { PersonsCredits, PersonSearch } from "../utilities/ApiFunction";
import { Link, useParams } from "react-router-dom";

const PersonSearchPage = () => {
    const { person } = useParams();
    
    
    const [personList, setPersonList] = useState();

    useEffect(() => {
        async function fetchActors(){
            const personData = await PersonsCredits(person)
            setPersonList(() => personData);
            console.log(personData)
        }

        if(person){
            fetchActors();
        }
        
    },[person]) 

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
        
            {personList
            &&
            <div id="person-search-body">
                {personList.cast.map((person, index) => 
                <div key={index} id="feature-icon-container">
                <div id="feature-icon">
                    <Link to={`/feature/movie-${ person.id}`}><img id="feature-icon-img" src={("https://image.tmdb.org/t/p/w500" + person.poster_path || "/client/public/TGsKci01 (1).svg")}></img></Link>
                    <p id="psp-title">{cutContent(person.title || person.name)}</p>
                </div>
                <div>
                    <h6 id="feature-icon-name">{/* {cutContent(details.title || details.name)} */}</h6>
                    <div>{}</div>
                </div>
                </div>
            )} 
            </div>
            
            }
        </>
    );
}
 
export default PersonSearchPage;