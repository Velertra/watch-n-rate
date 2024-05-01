import { useEffect, useState } from "react";
import { PopularMovies, PopularTv, Upcoming } from "../utilities/ApiFunction"
import FeatureIcon from "../components/FeatureIcon";

const HomePage = () => {
    const [popularTv, setPopularTv] = useState();
    const [popularMovies, setPopularMovies] = useState();

    Upcoming();

    useEffect(()=> {
        async function getPopularTv(){
            let response = await PopularTv();
            let movies = await PopularMovies();
            
            let data = await response;
            
            setPopularTv(data);
            setPopularMovies(movies)
        }

        return() => {
            getPopularTv();
            //abortController.abort();
        }
    }, [])

    return ( 
        <>
            <div>front page</div>
            <h1 style={{color:"red"}}>Tv</h1>
            <div style={{display:"flex"}} id="hp-popular-tv">\
                {popularTv 
                && 
                (
                    popularTv.results.map((show, index) => 
                        <div id="" key={index}>
                            <FeatureIcon
                                type={'tv'}
                                id={show.id}
                            />
                        </div>
                    )
                )}
            </div>
            <h1 style={{color:"red"}}>Movies</h1>
            <div style={{display:"flex"}} id="hp-popular-movies">
                {popularMovies 
                && 
                (
                    popularMovies.results.map((show, index) => 
                        <div id="" key={index}>
                            <FeatureIcon
                                type={'movie'}
                                id={show.id}
                            />
                        </div>
                    )
                )}
            </div>
        </>
     );
}
 
export default HomePage;