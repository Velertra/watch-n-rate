import { useNavigate } from "react-router-dom";
import ReviewLikes from "../ReviewLikes";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import EditReview from "../EditReview";
import { useFeature } from "./FeatureContext";
import DeleteReview from "../DeleteReview";

const FeaturePageReviews = ({ reviews}) => {
    const token = JSON.parse(localStorage.getItem("user"));
    const [featureReviews, setFeatureReviews] = useState(reviews);
    const { user, setCurrentUser } = useUser();
    const { featureInfo, setFeatureInfo } = useFeature();
    const navigate = useNavigate();

    const remove = async (review) => {
        const newReviews = featureReviews.filter((spot, index) => spot._id !== review._id)

        setFeatureReviews(() => newReviews);
    }

    return (
        <>
            {featureReviews.map((review, index) => (
                <div id="fr-container" key={index}>
                    <div id="fr-details-container" onClick={() => navigate(`/review/${review._id}`)}>
                        <h5>{review?.author.length !== 0 ? review?.author[0].username : "User Deleted"}</h5>
                        <p>{review?.content}</p>
                        <ReviewLikes 
                            review={review}
                            user={user}
                        />
                    </div>
                    <div id="fr-btns">
                        {user?.currentUser?.username == review?.author[0]?.username
                        &&
                        <>
                        {/* <button onClick={() => handleDeleteBtn(review)}>delete</button> */}
                        <DeleteReview
                            review={review}
                            remove={remove}
                        />
                        <EditReview 
                            review={review}
                        />
                        </>}
                    </div>
                    
                </div>
            ))}
        </>
    );
}
 
export default FeaturePageReviews;