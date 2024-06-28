import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FullDetails, GetCredits } from "../utilities/ApiFunction";
import FavsBtn from "../components/FavsBtn"
import WatchList from "../components/WatchList";
import Review from "../components/Review";
import FeatureHeaderImg from "../components/header/FeatureHeadImg";
import ReviewLikes from "../components/ReviewLikes"
import { useUser } from "../components/UserContext";
import FeatureCredits from "../components/feature/FeatureCredits";
import { useFeature } from "../components/feature/FeatureContext";
import FeatureDetails from "../components/feature/FeatureDetails";
import FeatureMetaData from "../components/feature/FeatureMetaData";

export async function loader({request, params}){
    const [type, id] = params.content.split("-");
    let feature = await GetCredits(type, id);
    return { feature };
}

const Feature = () => {
    const [details, setDetails] = useState();
    const [featureDetails, setFeatureDetails] = useState();
    const { content } = useParams();
    const [type, id] = content.split("-");
    const navigate = useNavigate();
    const { feature } = useLoaderData();
    const { user } = useUser();
    
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
            setFeatureDetails(featureData.feature.reviews && featureData.feature.reviews);
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
                <FeatureHeaderImg 
                    featureImg={details.backdrop_path}
                />}
            <div id="feature-content">
                 {/* {user && <div>{user.currentUser.username}</div>} */}
                {details 
                && 
                <FeatureDetails 
                    feature={feature}
                    details={details}
                    type={type}
                />
                }
                <FeatureMetaData
                    feature={feature}
                />
                    <div>movies clips or news</div>
                    {/* reviews */}
                    {featureDetails 
                    &&
                    featureDetails.map((review, index) => (
                        <div onClick={() => navigate(`/review/${review._id}`)} key={index}>
                            <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                            <p>{review.content}</p>
                            <ReviewLikes
                                review={review}
                            />
                            <div>{(user && (user.currentUser.username == review.author[0].username)) && <><div><button>edit</button><button>delete</button></div></>}{/* {review.author.length !== 0 && (review.author[0].username == user.currentUser.username && (<div><button>edit</button><button>delete</button></div>))} */}</div>
                        </div>
                    ))
                    }
                
                <div>similar feature area</div>
            </div>   
        </> 
    );
}
 
export default Feature;