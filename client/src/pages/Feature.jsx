import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FullDetails } from "../utilities/ApiFunction";
import FavsBtn from "../components/FavsBtn"
import WatchList from "../components/WatchList";
import Review from "../components/Review";
import HeaderBg from "../components/header/HeaderBg";
import ReviewLikes from "../components/ReviewLikes"
import { useUser } from "../components/userContext";

const Feature = () => {
    const [details, setDetails] = useState();
    const [featureDetails, setFeatureDetails] = useState();
    const { content } = useParams();
   
    const [type, id] = content.split("-");
    const navigate = useNavigate();
    //const token = JSON.parse(localStorage.getItem("user"));
    const { user } = useUser();



    /* useEffect(() => {
        async function test(){
            const testUser = await user;
            console.log(testUser)
        }

        return async() => {
            test();
        } 
    }, []) */

    
    useEffect(()=> {
        async function getApiData(){
            let tmdbDetails = await FullDetails(type, id,);
            let data = await tmdbDetails;
            setDetails(data);
            console.log(user)
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
                {user && <div>check</div>}
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
                    <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                    <p>{review.content}</p>
                    <ReviewLikes
                        review={review}
                    />
                </div>
            ))
            }
        </>    
    );
}
 
export default Feature;