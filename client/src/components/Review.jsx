import { useState } from "react";

const Review = ({ title, type, featureId }) => {
    const [review, setReview] = useState(false)
    const [content, setContent] = useState('');
    const token = JSON.parse(localStorage.getItem("user"));

    function handleOnClick(){
        setReview(prevState => !prevState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/feature/addreview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ content, title, type, featureId }),
          });
    
          const data = await response.json();
          
          
        } catch (error) {
          console.error('Error occurred:', error);
        }
      };

    return (  
        <>
         <button onClick={handleOnClick}>review</button>
        {review 
        && 
        <form onSubmit={handleSubmit}>
            <input 
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></input>
        </form>} 
        </>
    );
}
 
export default Review;