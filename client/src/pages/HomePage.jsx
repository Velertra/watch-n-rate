//import { Upcoming } from "../utilities/ApiFunction"
import FeatureIcon from "../components/FeatureIcon";
import { useLoaderData, useNavigate } from "react-router-dom";
import ReviewLikes from "../components/ReviewLikes";

const HomePage = () => {
    const { series, movies, upcoming, hpReviews } = useLoaderData();
    const navigate = useNavigate();
    
    return ( 
        <>
            <div id="header-img-container">
                {/* header image, change number to pick */}
                <img id="header-img" src={"http://image.tmdb.org/t/p/original" + upcoming.results[7].backdrop_path }></img>
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
            <div  id="hp-rr-container">
            <h3 style={{ textDecoration: "underline"}}>Recent Reviews</h3>
            {hpReviews 
            &&
            hpReviews.reviews.slice(0, 5).map((review, index) => (
                <div id="hp-rr" onClick={() => navigate(`/review/${review._id}`)} key={index}>
                    <FeatureIcon 
                      id={review.feature[0].featureId}
                      type={review.feature[0].type}
                    />
                    <div id="hp-rr-content">
                        <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                        <h4 id="r-feature-title">{review.feature[0].title || review.feature[0].name}</h4>
                        <p>{review.content}</p>
                        <ReviewLikes
                            review={review}
                        />
                    </div>
                </div>
            ))
            }
            </div>
        </>
     );
}
 
export default HomePage;