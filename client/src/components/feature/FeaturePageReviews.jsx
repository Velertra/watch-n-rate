import { useNavigate } from "react-router-dom";
import ReviewLikes from "../ReviewLikes";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import EditReview from "../EditReview";

const FeaturePageReviews = ({ reviews}) => {
    const token = JSON.parse(localStorage.getItem("user"));
    const { user } = useUser();
    const navigate = useNavigate();

    const handleDeleteBtn = async (reviewId) => {
        
        const response = await fetch(`http://localhost:3000/deletereview/${reviewId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token.token}`
            },
        });
       
        const data = await response.json();
    }

    return (
        <>
            {reviews.map((review, index) => (
                <div id="fr-container" key={index}>
                    <div id="fr-details-container" onClick={() => navigate(`/review/${review._id}`)}>
                        <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                        <p>{review.content}</p>
                        <ReviewLikes 
                            review={review}
                        />
                    </div>
                    <div id="fr-btns">
                        {user?.currentUser?.username == review.author[0]?.username
                        &&
                        <>
                        <button onClick={() => handleDeleteBtn(review._id)}>delete</button>
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