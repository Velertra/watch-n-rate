import FeatureIcon from "../components/FeatureIcon";
import { useNavigate } from "react-router-dom";
import ReviewLikes from "../components/ReviewLikes";
import { useEffect, useState } from "react";
import { useHomePage } from "../components/HomePageContext";
import Popular from "../components/homePage/Popular";
import { useUser } from "../components/UserContext";

const HomePage = () => {
    const { recentReviews, upcoming } = useHomePage();
    const navigate = useNavigate();
    const [bgNumber, setBgNumber] = useState();

    useEffect(() => {
        function bgNumber(){
            const number = Math.floor(Math.random() * 2);
            if(number == 0){
                return '0';
            } else {
                return number
            }
        }

        const rand = bgNumber()
        setBgNumber(() => rand);
        
    },[upcoming]);
    
    const cutContent = (content) => {
        const maxLength = 100;
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + "...";
        } else {
            return content;
        }
    }

    return ( 
        <>
            <div id="header-img-container">
                {/* header image, change number to pick */}
                {upcoming && bgNumber && <img id="header-img" onClick={() => navigate(`/feature/movie-${upcoming.results[bgNumber].id}`)} src={"https://image.tmdb.org/t/p/original" + upcoming.results[bgNumber].backdrop_path}></img>}
                <div id="head-img-overlay//"></div>
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
                            {/* <h4 id="r-feature-title">{review.feature[0].title || review.feature[0].name}</h4> */}
                            <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                            <p>{cutContent(review.content)}</p>
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