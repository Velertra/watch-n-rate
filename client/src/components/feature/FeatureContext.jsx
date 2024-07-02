import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullDetails, GetCredits } from "../../utilities/ApiFunction";

const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
    const [featureTwo, setFeatureTwo] = useState();
    const [credits, setCredits] = useState();
    const [singleReview, setSingleReview] = useState();
    const [reviews, setReviews] = useState();
    const [type, setType] = useState();
    const featureParams = useParams();
    
    useEffect(() => {
        async function getFeatureData(){
            if( featureParams && featureParams.content && (featureParams.content.includes("movie") || featureParams.content.includes("tv"))){               
                const [input, id] = featureParams.content.split("-");
                setType(input);

                try{  
                    let featureDeets = await FullDetails(input, id,);
                    let deets = await featureDeets;
                    setFeatureTwo(deets);

                } catch{
                    setFeatureTwo(null)
                    console.error('accessing feature content is not working')
                }
                try{  
                    let featureCreds = await GetCredits(input, id);
                    let creds = await featureCreds;
                    setCredits(creds);

                } catch{
                    setCredits(null)
                    console.error('accessing feature content is not working')
                }
                try{  
                    let featureReviews = await fetch(`http://localhost:3000/feature/getfeaturereviews/?type=${input}&featureId=${id}`, {
                        method: 'GET',
                });
                    let featureData = await featureReviews.json(); 
                    setReviews(featureData.feature.reviews && featureData.feature.reviews)

                } catch{
                    setCredits(null)
                    console.error('accessing feature content is not working')
                }
                    
            } else{
                try{
                    const response = await fetch(`http://localhost:3000/review/${featureParams.mongoId}`, {
                        method: 'GET',
                    });
                    if(!response){
                        console.error(Error)
                        return
                    }
                
                    let data = await response.json();
                    setSingleReview(() => data.review);

                    const featureDeets = await FullDetails(data.review.feature[0].type, data.review.feature[0].featureId)
                    setFeatureTwo(featureDeets)

                } catch {
                    console.error('feature context not working')
                }
            } 
            
        }
        console.log(featureParams)
        
        return async() => {
            getFeatureData();
        } 
    }, [])
    
    
    return (
        <FeatureContext.Provider value={{ featureTwo, setFeatureTwo, credits, setCredits, reviews, setReviews, type, singleReview }}>
            { children }
        </FeatureContext.Provider>
    );
}
 
export const useFeature = () => {
    return useContext(FeatureContext)
}