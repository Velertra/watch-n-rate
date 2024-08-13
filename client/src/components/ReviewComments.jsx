import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditComment from "./EditComment";
import CommentLikes from "./CommentLikes";
import { useUser } from "./UserContext";

const ReviewComments = ({ review }) => {
    const [text, setText] = useState('');
    const [comments, setComments] = useState(null);
    const [reviewComments, setReviewComments] = useState();
    const token = JSON.parse(localStorage.getItem("user"));
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
    const { title } = useParams();
    const { user } = useUser(); 

    useEffect(() => {
        async function getComments(){
            try {
                const response = await fetch(`${url}/getcomments/${review._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                let data = await response.json();
                
                setComments(data.comments);

            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }

        
            if(review){
                getComments();
            }
        
    }, [review])
    
    const handleAddComment = async (e) => {
        e.preventDefault();

        
        
        const response = await fetch(`${url}/addcomment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ title, text, featureId: review.feature[0].featureId, featureMongoId: review.feature[0]._id, reviewId: review._id }),
        });
        window.location.reload();
        
        setText('')
      }
    
    const handleDeleteBtn = async (comment) => {
        const newComment = comments.filter((spot, index) => spot._id !== comment)

        const response = await fetch(`${url}/deletecomment/${comment}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token.token}`
            },
        });
    
        const data = await response.json();
        setComments(() => newComment)
    }

    return (
        <div id="rc-section">
            {comments && comments.length !== 0 
            && 
            comments.map((comment, index) => (
                <div id="rc-container" key={index}>
                    <div id="rc-content">
                        <h4 id="rc-c-user">{comment.user[0].username}</h4>
                        <p id="rc-c-date">{new Date(comment.timestamp).toLocaleDateString('en-US', options)}</p>
                        
                    </div>
                    <p id="rc-c-comment">{comment.comment}</p>
                    <div id="frp-comment-bottom">
                        <CommentLikes 
                            comment={comment}
                        />
                        {user?.currentUser.username == comment.user[0].username 
                        &&
                        <div id="rc-btns">
                            <EditComment 
                                comment={comment}
                            />
                            <div id="fr-delete-btn">
                                <button onClick={() => handleDeleteBtn(comment._id)}>delete</button>
                            </div>
                        </div>
                        }
                    </div>
                        
                    
                    
                    

                        
                    
                </div>
            ))}
            <form onSubmit={handleAddComment}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></input>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
}
 
export default ReviewComments;