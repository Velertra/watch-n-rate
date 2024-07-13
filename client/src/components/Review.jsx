import { useState } from "react";

const Review = ({ title, type, featureId }) => {
    const [review, setReview] = useState(false)
    const [content, setContent] = useState('');
    const token = JSON.parse(localStorage.getItem("user"));

    function handleOnClick(){
        setReview(prevState => !prevState)
        console.log(content)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        /* const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(e.target[0].value); */

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
        <div id="review-input-container">
          <div>&times;</div>
          <form id="review-input" method="post" onSubmit={handleSubmit}>
            <label>
              <textarea
                  defaultValue={'what do ya think?'}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  cols={50}
              />
            </label>
            <button type="submit">Add Review</button>
          </form> 
        </div>}
        
        </>
    );
}
 
export default Review;