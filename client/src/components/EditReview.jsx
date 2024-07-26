import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const EditReview = ({ review }) => {
    const [edit, setEdit] = useState();
    const [text, setText] = useState();
    const token = JSON.parse(localStorage.getItem("user"));
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
    
    const handleEdit = () => {
        setText(review.content)
        setEdit(prevState => !prevState)
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        const response = await fetch(`${url}/changereview/${review._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.token}`
            },
            body: JSON.stringify({ text }),
        });

        window.location.reload();
    }

    return (
        <>
            {!edit 
            ? 
            <button onClick={handleEdit}>edit</button> 
            : 
            <form onSubmit={handleSubmit}>
                <input
                    onChange={onChange}
                    value={text}
                ></input>
            </form>}
        </>
    );
}
 
export default EditReview;