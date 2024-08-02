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
        <div id="fp-body">
            {featureInfo 
            && 
            <>
            <FeatureHeaderImg 
                featureImg={featureInfo.featureInfo.backdrop_path}
            />
            </>}
            <div id="fp-content">
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
                <div id="split-feature-section">
                    {featureInfo?.credits 
                    && 
                    <FeatureMetaData
                        feature={featureInfo.credits}
                    />}
                    
                    <div id="extra-feature-details">
                    {featureInfo
                    &&
                    <div id="fp-youtube-spot">
                        <iframe 
                            id="feature-vid"
                            src={`https://www.youtube.com/embed/${featureInfo.featureVidId}?si=oxwxJv6kq5A6Ewby`} 
                            title="YouTube video player" 
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>

                        </iframe>

                    </div>}
                        {featureInfo?.reviews
                        &&
                        <div id="feature-review-section">
                        Comments
                        <FeaturePageReviews
                            reviews={featureInfo.reviews.feature.reviews}
                            user={user}
                        />
                        </div>
                        }
                    </div>

                </div>
                
                
            </div>
             
            
        </div> 
    );
}
 
export default Feature;