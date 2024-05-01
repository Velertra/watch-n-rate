const FollowBtn = ({ userTwo }) => {
    const token = JSON.parse(localStorage.getItem("user"));

    async function handleFollowBtn(){
        if (!userTwo) {
            console.error("Missing required fields in request");
            return;
        }

        let response = await fetch('http://localhost:3000/followList', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
              },
            body: JSON.stringify({ userTwo }),
        });

        if (!response.ok) {
            const data = await response.json();
            //console.error(data.message);
            return;
        }
    }

    return (  
        <button onClick={handleFollowBtn}>follow</button>
    );
}
 
export default FollowBtn;