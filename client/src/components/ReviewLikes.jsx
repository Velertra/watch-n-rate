const ReviewLikes = ({ review }) => {
    const token = JSON.parse(localStorage.getItem("user"));
    
    const handlelikeBtn = async (e) => {
        e.stopPropagation();

        const response = await fetch(`http://localhost:3000/reviewlike`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ review })
        });
    
        const data = await response.json();
        console.log(data)
    }

    return (
        <>
            <h6 onClick={handlelikeBtn}>like dis</h6>
            {review && <div id="like-section"><h6>&#10084; {" " + review.likes.length} likes</h6></div>}
        </>
    );
}
 
export default ReviewLikes;