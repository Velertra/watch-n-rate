import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullDetails, GetCredits } from "../../utilities/ApiFunction";

const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
    const [featureInfo, setFeatureInfo] = useState(null);
    const featureParams = useParams();
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
    
    useEffect(() => {
        
        //setType(input);
        let credits,
        featureInfo,
        reviews;

        async function getFeatureData() {
            if (featureParams && featureParams.content && (featureParams.content.includes("movie") || featureParams.content.includes("tv"))) {
                const [type, id] = featureParams.content.split("-");
                
                try {
                    const featureDeets = await FullDetails(type, id);
                    featureInfo = featureDeets;

                } catch {
                    console.error('accessing feature details is not working');
                    null

                }
                try {
                    const featureReviews = await fetch(`${url}/feature/getfeaturereviews/?type=${type}&featureId=${id}`, {
                        method: 'GET',
                    });
                    const reviewData = await featureReviews.json();
                    reviews = reviewData;

                } catch {
                    console.error('accessing feature reviews is not working');
                    null
                }
                try {
                    const featureCreds = await GetCredits(type, id);
                    credits =  featureCreds;

                } catch {
                    console.error('accessing feature credits is not working');
                    null
                }
                setFeatureInfo({ featureInfo, setFeatureInfo, credits,  reviews, type})

            } else {
                let type,
                featureId;

                try {
                    const response = await fetch(`${url}/review/${featureParams.mongoId}`, {
                        method: 'GET',
                    });
                    if (!response) {
                        console.error('Error fetching single review');
                        return;
                    }
                    const data = await response.json();

                    type = data.review.feature[0].type;
                    featureId = data.review.feature[0].featureId;
    
                    const featureDeets = await FullDetails(type, featureId);

                    featureInfo = featureDeets; 
                    reviews = data;

                } catch {
                    console.error('feature context from review not working');
                    null;
                }
                
                setFeatureInfo({ featureInfo, reviews, type });
            }
        }

        //return () => {
            getFeatureData()
        //}
    }, [featureParams]);
    
    
    return (
        <FeatureContext.Provider value={{ featureInfo }}>
            { children }
        </FeatureContext.Provider>
    );
}
 
export const useFeature = () => {
    return useContext(FeatureContext)
}