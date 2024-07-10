import { createContext, useContext, useEffect, useState } from "react";
import { PopularMovies, PopularTv, Upcoming } from "../utilities/ApiFunction";

const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
    const [recentReviews, setRecentReviews] = useState(null);
    const [popular, setPopular] = useState();
    const [upcoming, setUpcoming] = useState(null);

    useEffect(() => {
        async function getPopularFeatures(){
            try {
                let series = await PopularTv();
                let movies = await PopularMovies();
                setPopular({movies: movies, series: series});
            } catch (error) {
                console.error('Error fetching popular features:', error);
            }
        }
    
        async function getRecentReviews(){
            try {
                let featureDB = await fetch(`http://localhost:3000/getrecentreviews`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                let data = await featureDB.json();
                setRecentReviews(data);

            } catch (error) {
                console.error('Error fetching recent reviews:', error);
            }
        }

        async function getUpcoming(){
            try{
                let data = await Upcoming();
                setUpcoming(data);

            } catch{
                console.error('Error fetching upcoming feature data');
            }
        }
        
        return() => {
            getPopularFeatures();
            getRecentReviews();
            getUpcoming();
        } 
    }, [])
    
    return (
        <HomePageContext.Provider value={{ recentReviews, setRecentReviews, popular, setPopular, upcoming }}>
            { children }
        </HomePageContext.Provider>
    );
}
 
export const useHomePage = () => {
    return useContext(HomePageContext);
}