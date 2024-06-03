const FollowBtn = ({ userProfile }) => {
    const token = JSON.parse(localStorage.getItem("user"));

    async function handleFollowBtn(){
        if (!userProfile) {
            console.error("Missing required fields in request");
            return;
        }

        let response = await fetch('http://localhost:3000/followList', 
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
              },
            body: JSON.stringify({ userProfile }),
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