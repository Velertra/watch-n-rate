const DeleteReview = ({ review }) => {
    const token = JSON.parse(localStorage.getItem("user"));

    const handleDelBtn = async (e) => {
        e.preventDefault()

        const response = await fetch(`http://localhost:3000/deletereview/${review._id}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token.token}`
            },
        });
    
        const data = await response.json();
        console.log(data)
    }

    return (
        <button onClick={handleDelBtn}>delete</button>
    );
}
 
export default DeleteReview;