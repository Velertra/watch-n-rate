import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FullDetails } from "../utilities/ApiFunction";
import FavsBtn from "../components/FavsBtn"
import WatchList from "../components/WatchList";
import Review from "../components/Review";
import HeaderBg from "../components/header/HeaderBg";

const Feature = () => {
    const [details, setDetails] = useState();
    const [featureDetails, setFeatureDetails] = useState();
    const { content } = useParams();
    const [type, id] = content.split("-");
    const navigate = useNavigate();
    //const token = JSON.parse(localStorage.getItem("user"));

    useEffect(()=> {
        async function getApiData(){
            let tmdbDetails = await FullDetails(type, id,);
            let data = await tmdbDetails;
            setDetails(data);
        }
        async function getfeatureData(){
            let featureDB = await fetch(`http://localhost:3000/feature/getfeaturereviews/?type=${type}&featureId=${id}`, {
                method: 'GET',
            });

            let featureData = await featureDB.json(); 
            setFeatureDetails(featureData.feature.reviews && featureData.feature.reviews)
            
        }
        

        return() => {
            getApiData();
            getfeatureData();
        }
    }, [])
    
    return ( 
        <>
            {details 
            && 
            <div>
                <HeaderBg 
                    featureImg={details.backdrop_path}
                />
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
                        <Review 
                            title={details.title || details.name}
                            type={type}
                            featureId={details.id}
                        />
                    </div>
                </div>
            </div>}
            {featureDetails 
            &&
            featureDetails.map((review, index) => (
                <div onClick={() => navigate(`/review/${review._id}`)} key={index}>
                    <h5>{review.author[0].username}</h5>
                    <p>{review.content}</p>
                    <h5>*/ Where likes will go /*</h5>
                </div>
            ))
            }
        </>    
    );
}
 
export default Feature;