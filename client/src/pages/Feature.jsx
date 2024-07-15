import FeatureHeaderImg from "../components/header/FeatureHeadImg";
import { useUser } from "../components/UserContext";
import { useFeature } from "../components/feature/FeatureContext";
import FeatureDetails from "../components/feature/FeatureDetails";
import FeatureMetaData from "../components/feature/FeatureMetaData";
import FeaturePageReviews from "../components/feature/FeaturePageReviews";

const Feature = () => {
    const { user } = useUser();
    const { featureInfo } = useFeature();
    
    return ( 
        <>
            {featureInfo 
            && 
            <>
            <FeatureHeaderImg 
                featureImg={featureInfo.featureInfo.backdrop_path}
            />
            </>}
             
            {featureInfo
            && 
            <>
            <FeatureDetails 
                feature={featureInfo.credits}
                details={featureInfo.featureInfo}
                type={featureInfo.type}
                user={user}
            />
            </>
            }

            {featureInfo?.credits 
            && 
            <FeatureMetaData
                feature={featureInfo.credits}
            />}
            <div id="feature-review-section">
            {featureInfo?.reviews
            &&
            <>
            <FeaturePageReviews
                reviews={featureInfo.reviews.feature.reviews}
                user={user}
            />
            </>
            }
            </div>
        </> 
    );
}
 
export default Feature;