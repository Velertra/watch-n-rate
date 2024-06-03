
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import ReviewComments from "../components/ReviewComments";

const FeatureReview = () => {
    const [review, setReview] = useState();
    const token = JSON.parse(localStorage.getItem("user"));
    const { mongoId } = useParams();
    

    useEffect(() => {
        async function getReview(){
            const response = await fetch(`http://localhost:3000/review/${mongoId}`, {
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

          setReview(() => data.review);
          //console.log(data)
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
                      id={review.feature[0].featureId}
                      type={review.feature[0].type}
                    />
            <h3 id="review-feature-title">{review.feature[0].title || review.feature[0].name}</h3>
            <h5>{console.log(review)}{review.author[0].username}</h5>
            <h6>{new Date(review.timestamp).toLocaleDateString('en-US'/* , options */)}</h6>
            <p>{review.content}</p></>}
            <h6>0</h6>
        </div>
        <div id="comment-section">
          <h3 style={{ textDecoration: "underline" }}>comment</h3>
          <ReviewComments
            review={review}
          />
        </div>
      </>
    );
}
 
export default FeatureReview;