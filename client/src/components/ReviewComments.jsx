import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewComments = ({ review }) => {
    const [text, setText] = useState('');
    const token = JSON.parse(localStorage.getItem("user"));
    const { title } = useParams();

    useEffect(() => {
        console.log(review)
        async function getComments(){
            const response = await fetch(`http://localhost:3000/getcomments/${review.review._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
          });

          if(!response){
            console.error(Error)
            return
          }

          let data = await response.json();

          console.log(data)
        }

        return async() => {
            getComments();
        } 
    }, [])
    
    const handleAddComment = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:3000/addcomment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ title, text, featureId: review.review.feature[0].featureId, featureMongoId: review.review.feature[0]._id, reviewId: review.review._id }),
        });

        setText('')
      }

    return (
        <div>
            <div>comments</div>
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