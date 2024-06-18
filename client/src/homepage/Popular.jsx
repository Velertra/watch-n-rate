import FeatureIcon from "../components/FeatureIcon";
import { useHomePage } from "../components/HomePageContext";

const Popular = () => { 
    const { popular } = useHomePage();
    return (
        <>
        {popular
            &&
            <div id="popular-features">
                <h1 style={{color:"red"}}>Tv</h1>
                <div style={{display:"flex"}} id="hp-popular-tv">
                    {popular.series.results.map((show, index) => 
                        <div id="" key={index}>
                            <FeatureIcon
                                type={'tv'}
                                id={show.id}
                            />
                        </div>
                    )}
                </div>
                <h1 style={{color:"red"}}>Movies</h1>
                <div style={{display:"flex"}} id="hp-popular-movies">
                    {popular.movies.results.map((show, index) => 
                        <div id="" key={index}>
                            <FeatureIcon
                                type={'movie'}
                                id={show.id}
                            />
                        </div>
                    )}
                </div>
            </div>
            }
        </>
    );
}
 
export default Popular;