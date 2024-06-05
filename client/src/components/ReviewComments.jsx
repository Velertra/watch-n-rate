import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditComment from "./EditComment";
import CommentLikes from "./CommentLikes";

const ReviewComments = ({ review }) => {
    const [text, setText] = useState('');
    const [comments, setComments] = useState(null);
    const token = JSON.parse(localStorage.getItem("user"));
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const { title } = useParams();

    useEffect(() => {
        async function getComments(){
            try {
                const response = await fetch(`http://localhost:3000/getcomments/${review._id}`, {
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
        
        const response = await fetch('http://localhost:3000/addcomment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ title, text, featureId: review.feature[0].featureId, featureMongoId: review.feature[0]._id, reviewId: review._id }),
        });
        setText('')
      }

      const handleEditBtn = async (commentId) => {
        const response = await fetch(`http://localhost:3000/editcomment/${commentId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token.token}`
            },
        });
    
        const data = await response.json();
        console.log(data)
    }
    
    const handleDeleteBtn = async (commentId) => {
        const response = await fetch(`http://localhost:3000/deletecomment/${commentId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token.token}`
            },
        });
    
        const data = await response.json();
        console.log(data)
    }

    return (
        <div id="rc-section">
            {comments && comments.length !== 0 
            && 
            comments.map((comment, index) => (
                <div id="rc-container" key={index}>
                    <div id="rc-content">
                        <h4 id="rc-c-user">{comment.user.length !== 0 ? review.user[0].username : "User Deleted"}</h4>
                        <p id="rc-c-comment">{comment.comment}</p>
                    </div>
                    <CommentLikes 
                        comment={comment}
                    />
                    <p id="rc-c-date">{new Date(comment.timestamp).toLocaleDateString('en-US', options)}</p>
                    <div id="rc-btns">
                        <EditComment 
                            comment={comment}
                        />
                        <button onClick={() => handleDeleteBtn(comment._id)}>delete</button>
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