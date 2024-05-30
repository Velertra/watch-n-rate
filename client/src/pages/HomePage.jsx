//import { Upcoming } from "../utilities/ApiFunction"
import FeatureIcon from "../components/FeatureIcon";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
    const { series, movies, upcoming } = useLoaderData();
    console.log(upcoming)
    return ( 
        <>
            <div id="header-img-container">
                <img id="header-img" src={"http://image.tmdb.org/t/p/original" + upcoming.results[2].backdrop_path }></img>
                <div id="head-img-overlay"></div>
            </div>
            <div id="header-content-container">
                
            </div>
            
            <h1 style={{color:"red"}}>Tv</h1>{/* {console.log(Upcoming)} */}
            <div style={{display:"flex"}} id="hp-popular-tv">
                {series 
                && 
                (
                    series.results.map((show, index) => 
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
                {movies 
                && 
                (
                    movies.results.map((show, index) => 
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