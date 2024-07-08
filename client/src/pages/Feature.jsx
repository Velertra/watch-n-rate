import FeatureHeaderImg from "../components/header/FeatureHeadImg";
import { useUser } from "../components/UserContext";
import { useFeature } from "../components/feature/FeatureContext";
import FeatureDetails from "../components/feature/FeatureDetails";
import FeatureMetaData from "../components/feature/FeatureMetaData";
import FeaturePageReviews from "../components/feature/FeaturePageReviews";

const Feature = () => {
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