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
import FeaturePageReviews from "../components/feature/FeaturePageReviews";


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
                    <FeaturePageReviews
                        reviews={reviews}
                        user={user}
                    />
                    }
                
                <div>similar feature area</div>
            </div>   
        </> 
    );
}
 
export default Feature;