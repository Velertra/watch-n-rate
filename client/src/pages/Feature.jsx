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
    const navigate = useNavigate();
    const { user } = useUser();
    const { featureTwo, credits, reviews, type } = useFeature();
    
    
    return ( 
        <>
            {featureTwo 
                && 
                <FeatureHeaderImg 
                    featureImg={featureTwo.backdrop_path}
                />}
                {featureTwo && <>{console.log(featureTwo)}</>}
            <div id="feature-content">
                 {/* {user && <div>{user.currentUser.username}</div>} */}
                {featureTwo 
                && 
                <FeatureDetails 
                    feature={credits}
                    details={featureTwo}
                    type={type}
                />
                }
                {credits 
                && 
                <FeatureMetaData
                    feature={credits}
                />}
                    <div>movies clips or news</div>
                    {/* reviews */}
                    {reviews 
                    &&
                    reviews.map((review, index) => (
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