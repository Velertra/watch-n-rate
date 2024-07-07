import { createContext, useContext, useEffect, useState } from "react";
import { PopularMovies, PopularTv } from "../utilities/ApiFunction";

const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
    const [recentReviews, setRecentReviews] = useState(null);
    const [popular, setPopular] = useState()
    

    useEffect(() => {
        async function getPopularFeatures(){
            let series = await PopularTv();
            let movies = await PopularMovies();
            setPopular({movies: movies, series: series} );
        }
        async function getRecentReviews(){
            let featureDB = await fetch(`http://localhost:3000/getrecentreviews`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                  }
            });

            let data = await featureDB.json();
            
            setRecentReviews(data);
        }
        
        return async() => {
            getPopularFeatures();
            getRecentReviews();
        } 
    }, [])
    
    return (
        <HomePageContext.Provider value={{ recentReviews, setRecentReviews, popular, setPopular }}>
            { children }
        </HomePageContext.Provider>
    );
}
 
export const useHomePage = () => {
    return useContext(HomePageContext)
}