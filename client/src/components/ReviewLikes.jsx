import { useEffect, useState } from "react";
import { useUser } from "./UserContext";

const ReviewLikes = ({ review }) => {
    const { user } = useUser();
    const [likes, setLikes] = useState(review.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
    const token = JSON.parse(localStorage.getItem("user"));
    
    const handlelikeBtn = async (e) => {
        e.stopPropagation();

        const likeAmount = isLiked ? likes - 1 : likes + 1;
        setLikes(() => likeAmount);
        setIsLiked(!isLiked)

        const response = await fetch(`${url}/reviewlike`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ review })
        });
    
        const data = await response.json();
    }

    useEffect(() => {
        if(review.likes.includes(user?.currentUser?._id)){
            setIsLiked(() => true);
        } else {
            setIsLiked(() => false);
        }
    }, [user])

    return (
        <>
            {user
            &&
            <h6 id="like-btn" onClick={handlelikeBtn}>
                {isLiked ? 'Unlike' : 'Like'}
            </h6>}
            <div id="like-section">
                <h6 style={{color: isLiked && 'red'}}>
                    &#10084; {likes} likes
                </h6>
            </div>
        </>
    );
}
 
export default ReviewLikes;