import { useState } from "react";
import { useUser } from "./UserContext";

const ReviewLikes = ({ review }) => {
    const { user } = useUser();
    const [likes, setLikes] = useState(review.likes.length);
    const [isLiked, setIsLiked] = useState(review.likes.includes(user?.currentUser._id));
    const token = JSON.parse(localStorage.getItem("user"));
    
    const handlelikeBtn = async (e) => {
        e.stopPropagation();

        const likeAmount = isLiked ? likes - 1 : likes + 1;
        setLikes(() => likeAmount);
        setIsLiked(!isLiked)

        const response = await fetch(`http://localhost:3000/reviewlike`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ review })
        });
    
        const data = await response.json();
    }

    return (
        <>
            <h6 id="like-btn" onClick={handlelikeBtn}>
                {isLiked ? 'Unlike' : 'Like'}
            </h6>
            <div id="like-section">
                <h6 style={{color: isLiked ? 'red' : ''}}>
                    &#10084; {likes} likes
                </h6>
            </div>
        </>
    );
}
 
export default ReviewLikes;