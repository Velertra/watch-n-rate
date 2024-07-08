import { useEffect, useState } from "react";
import FeatureIcon from "../components/FeatureIcon";
import EditReview from "../components/EditReview"
import DeleteReview from "../components/DeleteReview";
import DisplayComments from "../components/DisplayComments";
import { useNavigate } from "react-router-dom";
import ReviewLikes from "../components/ReviewLikes";
import { useUser } from "../components/UserContext";

const Reviews = () => {
    //const [reviews, setReviews] = useState('')
    const { user } = useUser();
    const [feature, setFeature] = useState('');
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const token = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

   /*  useEffect(() => {
        async function getReviews(){
            const response = await fetch(`http://localhost:3000/getuserreviews`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.token}`
            },
          });

          if(!response){
            console.error(Error)
            return
          }

          let reviews = await response.json();

          setReviews(() => reviews);

          reviews.reviews.forEach((review) => {
            setFeature((prev) => [...prev, {title: review.feature[0].title, featureId: review.feature[0].featureId}])
            
          })
          
        }

        return async() => {
            getReviews();
        } 
    }, []) */

    return ( 
        <div id="rp-r-container">
          <h2>reviews</h2>
          {user && user.currentUser.reviews.map((review, index) => (
            <div key={index} id="rp-r">
                <FeatureIcon 
                  id={review.feature[0].featureId}
                  type={review.feature[0].type}
                />
                <div id="rp-r-content" onClick={() => navigate(`/review/${review._id}`)}>
                  <h3 id="r-feature-title">{review.feature[0].title || review.feature[0].name}</h3>
                  <h6>{new Date(review.timestamp).toLocaleDateString('en-US', options)}</h6>
                  <p>{review.content}</p>
                  
                  <ReviewLikes
                    review={review}
                  />
                  <EditReview
                  review={review}
                />
                <DeleteReview
                  review={review}
                />
                </div>
                
                {/* <p id="r-content">{review.feature[0].title}</p> */}
            </div>
          ))}
        </div>
    );
}
 
export default Reviews;