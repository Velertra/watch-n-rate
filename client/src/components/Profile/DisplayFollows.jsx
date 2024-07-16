import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const DisplayFollows = ({ users }) => {
    const { user } = useUser();
    const [display, setDisplay] = useState(false);
    const [follows, setFollows] = useState();
    const [followers, setFollowers] =useState(users.profileUser?.followers.length);
    const [isFollowing, setIsFollowing] = useState(users.profileUser.followers.some((follows) => follows._id === user?.currentUser._id));
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("user"));
    
    async function handleFollowBtn(){
        const followAmount = isFollowing ? followers - 1 : followers + 1;
        setFollowers(followAmount);
        setIsFollowing(!isFollowing)
       
        let response = await fetch('http://localhost:3000/followList', 
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
              },
            body: JSON.stringify({ userName: users.profileUser.username }) ,
        });

        if (!response.ok) {
            const data = await response.json();
    
            return;
        } 
    }

    const handleFollowClick = (users) => {
        setFollows(users)
        setDisplay(true)
    }

    const updateFollows = (amount) => {
        setFollowers(() => amount)
    }

    return (
        <>
            
            {display 
            && 
            <div id="profile-follows-display">
                <div onClick={() => setDisplay(false)}>&times;</div>
                {follows.map((user, index) => (
                    <div id="pfd-user" onClick={() => navigate(`/profile/${user.username}`)} key={index}>
                        <h4>{user.username}</h4>
                        <div id="pfd-user-details">
                            {(user.liked.length >= 1) && <>recent likes</>}
                            {user.liked.map((like, index) => (
                                <div key={index}>
                                    <h6>{like.title}</h6>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            }
            
            <button onClick={handleFollowBtn}>follow</button>

            <div id="followers-section" onClick={() => handleFollowClick(users.profileUser?.followers)}>
                <span>followers {followers}</span>
            </div>
            <div id="following-section" onClick={() => handleFollowClick(users.profileUser?.following)}>
                <span>following {users.profileUser?.following.length}</span>
            </div>
        </>
    );
}
 
export default DisplayFollows;