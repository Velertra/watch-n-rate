import { useState } from "react";
import { useUser } from "./UserContext";

const CommentLikes = ({ comment }) => {
    const { user } = useUser();
    const [likes, setLikes] = useState(comment.likes.length);
    const [isLiked, setIsLiked] = useState(comment.likes.includes(user?.currentUser._id));
    const token = JSON.parse(localStorage.getItem("user"));
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
    
    const handlelikeBtn = async (e) => {
        e.stopPropagation();

        const likeAmount = isLiked ? likes - 1 : likes + 1;
        setLikes(() => likeAmount);
        setIsLiked(!isLiked)

        const response = await fetch(`${url}/CommentLike`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ comment })
        });
    
        const data = await response.json();
        console.log(data)
    }

    return (
        <div id="rc-like-section">
            <h6 id="like-btn" onClick={handlelikeBtn}>
                {isLiked ? 'Unlike' : 'Like'}
            </h6>
            <div id="like-section">
                <h6 style={{color: isLiked ? 'red' : ''}}>
                    &#10084; {likes} likes
                </h6>
            </div>
        </div>
    );
}
 
export default CommentLikes;