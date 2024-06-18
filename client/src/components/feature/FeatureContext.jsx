import { createContext, useContext, useEffect, useState } from "react";
import { PopularMovies, PopularTv } from "../../utilities/ApiFunction";

const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
    const [feature, setFeature] = useState(null);
    const [popular, setPopular] = useState()
    console.log("featureData")

    useEffect(() => {
        async function getPopularFeatures(){
            let series = await PopularTv();
            let movies = await PopularMovies();

            setPopular({movies: movies, series: series} );
        }
        
        return async() => {
            getFeatureData();
        } 
    }, [])
    
    
    return (
        <FeatureContext.Provider value={{ feature, setFeature }}>
            { children }
        </FeatureContext.Provider>
    );
}
 
export const useFeature = () => {
    return useContext(FeatureContext)
}