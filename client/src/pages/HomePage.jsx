import FeatureIcon from "../components/FeatureIcon";
import { useNavigate } from "react-router-dom";
import ReviewLikes from "../components/ReviewLikes";
import { useContext, useEffect, useState } from "react";
import { useHomePage } from "../components/HomePageContext";
import Popular from "../homepage/Popular";
import { useUser } from "../components/UserContext";

const HomePage = () => {
    
    const { popular, recentReviews, upcoming } = useHomePage();
    const navigate = useNavigate();
    const [bgNumber, setBgNumber] = useState();
    const { currentUser } = useUser();

    useEffect(() => {
       

            function bgNumber(){
                const number = Math.floor(Math.random() * 6);
                if(number == 0){
                    return number + 1;
                } else {
                    return number
                }
            }
    
            return () => {
                const rand = bgNumber()
                setBgNumber(rand);
            }
    },[]);
    
    return ( 
        <>
            <div id="header-img-container">
                {/* header image, change number to pick */}
                {/* {upcoming && bgNumber && <img id="header-img" src={"https://image.tmdb.org/t/p/original" + upcoming.results[bgNumber].backdrop_path}></img>} */}
                <div id="head-img-overlay"></div>
            </div>
            <div id="header-content-container"></div>
            <div id="hp-body">
                {/* <Popular /> */}
                
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