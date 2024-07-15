import { useState } from "react";
import { useUser } from "./UserContext";

const FollowBtn = ({ userProfile, updateFollows, followers }) => {
    const { user } = useUser();
    const userName = userProfile?.username;
    const token = JSON.parse(localStorage.getItem("user"));

    
    async function handleFollowBtn(){

        let response = await fetch('http://localhost:3000/followList', 
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
              },
            body: JSON.stringify( { userName } ),
        });

        if (!response.ok) {
            const data = await response.json();
    
            return;
        }
    }

    return (  
        <button onClick={handleFollowBtn}>follow</button>
    );
}
 
export default FollowBtn;