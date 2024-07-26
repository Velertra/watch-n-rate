import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { Image } from "cloudinary-react";

const DisplayFollows = ({ userProfile }) => {
    const { user } = useUser();
    const [display, setDisplay] = useState(false);
    const [follows, setFollows] = useState();
    const [followers, setFollowers] = useState(userProfile.profileUser?.followers.length);
    const [isFollowing, setIsFollowing] = useState(userProfile?.profileUser.followers.some((follows) => follows._id === user?.currentUser._id));
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("user"));
    
    async function handleFollowBtn(){
        const followAmount = isFollowing ? followers - 1 : followers + 1;
        setFollowers(followAmount);
        setIsFollowing(!isFollowing)
       
        let response = await fetch(`${url}/followList`, 
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
              },
            body: JSON.stringify({ userName: userProfile.profileUser.username }) ,
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

  /*   useEffect(() => {
        return () => {
            setCurrentProfile(() => userProfile)
        }
    }, [userProfile]) */

    return (
        <>
            {display 
            && 
            <div id="profile-follows-display">
                <div onClick={() => setDisplay(false)}>&times;</div>
                {follows.map((user, index) => (
                    <div id="pfd-user" onClick={() => {navigate(`/profile/${user.username}`); setDisplay(() => false)}} key={index}>
                        <Image style={{"height": '70px', 'backgroundColor': "white", "borderRadius": "50%" }} cloudName="dqckw3rn4" publicId={user.imagePath}/>
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
            
            <div id="p-follow-section">
                {user 
                && 
                userProfile.profileUser.username !== user?.currentUser?.username
                && 
                <button onClick={handleFollowBtn}>{isFollowing ? 'unfollow' : 'follow'}</button>
                }

                <div id="followers-section" onClick={() => handleFollowClick(userProfile.profileUser?.followers)}>
                    {console.log(followers)}
                    <p>followers {followers}</p>
                    
                </div>
                <div id="following-section" onClick={() => handleFollowClick(userProfile.profileUser?.following)}>
                    <p>following {userProfile?.profileUser?.following.length}</p>
                </div>
            </div>
        </>
    );
}
 
export default DisplayFollows;