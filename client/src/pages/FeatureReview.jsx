
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import ReviewComments from "../components/ReviewComments";
import FeatureHeaderImg from "../components/header/FeatureHeadImg"
import { useFeature } from "../components/feature/FeatureContext";

const FeatureReview = () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const { mongoId } = useParams();
    const { featureTwo, singleReview } = useFeature();
    
    return (
      <>
      {singleReview 
                && 
                <FeatureHeaderImg 
                    featureImg={singleReview.backdrop_path}
                />}
        <div id="feature-info">{console.log(featureTwo)}
            {singleReview && 
            <> 
            <FeatureIcon 
              id={singleReview.feature[0].featureId}
              type={singleReview.feature[0].type}
            />
                    
            <h3 id="review-feature-title">{singleReview.feature[0].title || singleReview.feature[0].name}</h3>
            <h5>{singleReview.author.length !== 0 ? singleReview.author[0].username : "User Deleted"}</h5>
            <h6>{new Date(singleReview.timestamp).toLocaleDateString('en-US'/* , options */)}</h6>
            <p>{singleReview.content}</p>
            <h6>&#10084; {" " + singleReview.likes.length}</h6>
            </>}
        </div>
        <div id="comment-section">
          <h3 style={{ borderBottom: "1px solid white" }}>{(singleReview && singleReview.comment.length) + " "}Comments</h3>
          <ReviewComments
            review={singleReview}
          />
        </div>
      </>
    );
}
 
export default FeatureReview;