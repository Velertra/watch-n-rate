import { useState } from "react";
import { useFeature } from "./feature/FeatureContext";
import { useUser } from "./UserContext";
import { Navigate } from "react-router-dom";

const Review = ({ title, type, featureId }) => {
    const [review, setReview] = useState(false)
    const [content, setContent] = useState('');
    const { featureInfo, setFeatureInfo } = useFeature();
    const { user } = useUser()
    const token = JSON.parse(localStorage.getItem("user"));
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';

    function handleOnClick(){
        setReview(prevState => !prevState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch(`${url}/feature/addreview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ content, title, type, featureId }),
          });

          const data = await response.json();
  
          window.location.reload();
          
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
          {console.log(featureInfo)}
          <div onClick={() => setReview(!review)}>&times;</div>
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