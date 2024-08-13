
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import ReviewComments from "../components/ReviewComments";
import FeatureHeaderImg from "../components/header/FeatureHeadImg"
import { useFeature } from "../components/feature/FeatureContext";
import { useUser } from "../components/UserContext";

const FeatureReview = () => {
    const { featureInfo } = useFeature();
    const { user } = useUser();
    
    return (
      <div id="frp-body">
        {/* {featureInfo 
        && 
        <FeatureHeaderImg 
            featureImg={featureInfo.featureInfo.backdrop_path}
        />} */}
        <div id="frp-feature-info">
            {featureInfo?.reviews && 
            <> 
            <FeatureIcon 
              id={featureInfo.reviews.review.feature[0].featureId}
              type={featureInfo.reviews.review.feature[0].type}
            />
            <div id="frp-feature-details">
                {/* <h3 id="frp-feature-title">{featureInfo.reviews.review.feature[0].title || featureInfo.reviews.review.feature[0].name}</h3> */}
              <p>{featureInfo.reviews.review.author.length !== 0 ? featureInfo.reviews.review.author[0].username : "User Deleted"}</p>
              <p>{new Date(featureInfo.reviews.review.timestamp).toLocaleDateString('en-US'/* , options */)}</p>
              <p>{featureInfo.reviews.review.content}</p>
              <p>&#10084; {" " + featureInfo.reviews.review.likes.length}</p>
            </div>
            
            </>}
        </div>
        <div id="frp-comment-section">
          <h3 style={{ borderBottom: "1px solid white" }}>{(featureInfo && featureInfo.reviews.review.comment.length) + " "}Comments</h3>
           
          <ReviewComments
            review={featureInfo?.reviews.review}
          />
          
        </div>
      </div>
    );
}
 
export default FeatureReview;