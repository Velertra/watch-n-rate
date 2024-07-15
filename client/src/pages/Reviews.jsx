import FeatureIcon from "../components/FeatureIcon";
import EditReview from "../components/EditReview"
import DeleteReview from "../components/DeleteReview";
import { useNavigate } from "react-router-dom";
import ReviewLikes from "../components/ReviewLikes";
import { useUser } from "../components/UserContext";

const Reviews = () => {
    const { user } = useUser();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const navigate = useNavigate();

    return ( 
        <div id="rp-r-container">{/* {console.log(user)} */}
          <h2>reviews</h2>
          {user && user.currentUser.reviews.map((review, index) => (
            <div key={index} id="rp-r">
              {console.log(user)}
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