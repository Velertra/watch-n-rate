const CommentLikes = ({ comment }) => {
    const token = JSON.parse(localStorage.getItem("user"));
    
    const handlelikeBtn = async (e) => {
        e.stopPropagation();

        const response = await fetch(`http://localhost:3000/CommentLike`, {
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
            <h6 onClick={handlelikeBtn}>like dis</h6>
            {comment && <h6>&#10084; {" " + comment.likes.length}</h6>}
        </div>
    );
}
 
export default CommentLikes;