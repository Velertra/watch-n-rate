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
            />{console.log(featureInfo)}
            </>}
             
            {featureInfo 
            && 
            <FeatureDetails 
                feature={featureInfo.credits}
                details={featureInfo.featureInfo}
                type={featureInfo.type}
            />
            }

            {featureInfo 
            && 
            <FeatureMetaData
                feature={featureInfo.credits}
            />}
            <div id="feature-review-section">
            {featureInfo 
            &&
            <FeaturePageReviews
                reviews={featureInfo.reviews.feature.reviews}
                user={user}
            />
            }
            </div>
        </> 
    );
}
 
export default Feature;