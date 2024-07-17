import { createContext, useContext, useEffect, useState } from "react";
import { PopularMovies, PopularTv, Upcoming } from "../utilities/ApiFunction";

const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
    const [recentReviews, setRecentReviews] = useState(null);
    const [popular, setPopular] = useState();
    const [upcoming, setUpcoming] = useState(null);
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
 
    useEffect(() => {
        async function getPopularFeatures(){
            console.log('popular features running')
            try {
                let series = await PopularTv();
                let movies = await PopularMovies();
                setPopular({movies: movies, series: series});
            } catch (error) {
                console.error('Error fetching popular features:', error);
            }
        }
    
        async function getRecentReviews(){
            console.log('recent reviews running')
            try {
                let featureDB = await fetch(`${url}/getrecentreviews`, {
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