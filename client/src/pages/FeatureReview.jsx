
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import ReviewComments from "../components/ReviewComments";
import FeatureHeaderImg from "../components/header/FeatureHeadImg"
import { useFeature } from "../components/feature/FeatureContext";

const FeatureReview = () => {
    const { featureInfo } = useFeature();
    
    return (
      <>
        {featureInfo 
        && 
        <FeatureHeaderImg 
            featureImg={featureInfo.featureInfo.backdrop_path}
        />}
        <div id="feature-info">
            {featureInfo?.reviews && 
            <> 
            <FeatureIcon 
              id={featureInfo.reviews.review.feature[0].featureId}
              type={featureInfo.reviews.review.feature[0].type}
            />
            <h3 id="review-feature-title">{featureInfo.reviews.review.feature[0].title || featureInfo.reviews.review.feature[0].name}</h3>
            <h5>{featureInfo.reviews.review.author.length !== 0 ? featureInfo.reviews.review.author[0].username : "User Deleted"}</h5>
            <h6>{new Date(featureInfo.reviews.review.timestamp).toLocaleDateString('en-US'/* , options */)}</h6>
            <p>{featureInfo.reviews.review.content}</p>
            <h6>&#10084; {" " + featureInfo.reviews.review.likes.length}</h6>
            </>}
        </div>
        <div id="comment-section">
          <h3 style={{ borderBottom: "1px solid white" }}>{(featureInfo && featureInfo.reviews.review.comment.length) + " "}Comments</h3>
          <ReviewComments
            review={featureInfo?.reviews.review}
          />
        </div>
      </>
    );
}
 
export default FeatureReview;