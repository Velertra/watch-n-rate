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
                    try{
                        const [input, id] = featureParams.content.split("-");
                        setType(input);
                        let featureDeets = await FullDetails(input, id,);
                        let featureCreds = await GetCredits(input, id);
                        let featureReviews = await fetch(`http://localhost:3000/feature/getfeaturereviews/?type=${input}&featureId=${id}`, {
                            method: 'GET',
                        });

                        
                        let deets = await featureDeets;
                        let creds = await featureCreds;
                        let featureData = await featureReviews.json(); 
                        
                        setCredits(creds);
                        setFeatureTwo(deets);
                        setReviews(featureData.feature.reviews && featureData.feature.reviews)

                    } catch{
                        setFeatureTwo(null)
                        console.error('accessing feature content is not working')
                    }
                } else{
                    try{
                        console.log(featureParams.mongoId)
                        const response = await fetch(`http://localhost:3000/review/${featureParams.mongoId}`, {
                            method: 'GET',
                        });
                        if(!response){
                            console.error(Error)
                            return
                        }
                  
                        let data = await response.json();
                        setSingleReview(() => data.review);
                        console.log(data)

                    } catch {
                        console.error('feature context not working')
                    }
                } 
            
        }
        
        return async() => {
            getFeatureData();
        } 
    }, [])
    
    
    return (
        <FeatureContext.Provider value={{ featureTwo, setFeatureTwo, credits, setCredits, reviews, setReviews, type }}>
            { children }
        </FeatureContext.Provider>
    );
}
 
export const useFeature = () => {
    return useContext(FeatureContext)
}