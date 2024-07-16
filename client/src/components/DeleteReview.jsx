const DeleteReview = ({ review, remove }) => {
    const token = JSON.parse(localStorage.getItem("user"));
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';

    const handleDelBtn = async (e) => {
        e.preventDefault()

        const response = await fetch(`${url}/deletereview/${review._id}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token.token}`
            },
        });
        
        remove(review);
    
        const data = await response.json();
    }

    return (
        <button onClick={handleDelBtn}>delete</button>
    );
}
 
export default DeleteReview;