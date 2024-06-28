import FeatureIcon from "../components/FeatureIcon";
import { useLoaderData, useNavigate } from "react-router-dom";
import ReviewLikes from "../components/ReviewLikes";
import { useContext, useEffect, useState } from "react";
import { useHomePage } from "../components/HomePageContext";
import Popular from "../homepage/Popular";

const HomePage = () => {
    const { series, movies, upcoming/* , hpReviews */ } = useLoaderData();
    const { popular, recentReviews } = useHomePage();
    const navigate = useNavigate();
    const [bgNumber, setBgNumber] = useState();

    useEffect(() => {
        function bgNumber(){
            const number = Math.floor(Math.random() * 18);
            return number;
        }

        return () => {
            const rand = bgNumber()
            setBgNumber(rand);
        } 
    },[upcoming]);
    
    return ( 
        <>
            <div id="header-img-container">
                {/* header image, change number to pick */}
                {bgNumber >= 0 && <img id="header-img" src={"http://image.tmdb.org/t/p/original" + upcoming.results[bgNumber].backdrop_path}></img>}{console.log(bgNumber)}
                <div id="head-img-overlay"></div>
            </div>
            <div id="header-content-container"></div>
            <div id="hp-body">
                <Popular />
                
                <div  id="hp-rr-container">
                <h3 style={{ textDecoration: "underline"}}>Recent Reviews</h3>
                {recentReviews 
                &&
                recentReviews.reviews.slice(0, 5).map((review, index) => (
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
            </div>
            
        </>
     );
}
 
export default HomePage;