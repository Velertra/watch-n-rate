
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import ReviewComments from "../components/ReviewComments";

const FeatureReview = () => {
    const [review, setReview] = useState();
    const token = JSON.parse(localStorage.getItem("user"));
    const { title, username } = useParams();
    

    useEffect(() => {
        async function getReview(){
            const response = await fetch(`http://localhost:3000/review/${username}/${title}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.token}`
            },
          });

          if(!response){
            console.error(Error)
            return
          }

          let data = await response.json();

          setReview(() => data);
          console.log(data)
        }

        return async() => {
            getReview();
        } 
    }, [])
    
    return (
      <>
        <div id="feature-info">
            {review && <> 
                <FeatureIcon 
                      id={review.review.feature[0].featureId}
                      type={review.review.feature[0].type}
                    />
            <h3 id="review-feature-title">{review.review.feature[0].title || review.review.feature[0].name}</h3>
            <h6>{new Date(review.review.timestamp).toLocaleDateString('en-US'/* , options */)}</h6>
            <p>{review.review.content}</p></>}
        </div>
        <div id="comment-section">
          <ReviewComments
            review={review}
          />
        </div>
      </>
    );
}
 
export default FeatureReview;