import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import FollowBtn from "../components/FollowBtn";
import Followers from "../components/Followers";
import Following from "../components/Following";
import { useUser } from "../components/UserContext";
import DisplayFollows from "../components/Profile/DisplayFollows";



const Profile = () => {
  const [userProfile, setUserProfile] = useState();
  
    const { profileName } = useParams();
    const { user } = useUser();

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem("user"));
      
        async function getUser(){
          const response = await fetch(`http://localhost:3000/getUserProfile/${profileName}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token?.token}`
            },
          });

          if(!response){
            console.error(Error)
            return
          }

          let userInfo = await response.json();
          setUserProfile(() => userInfo);
        }

        return async() => {
          getUser();
        } 

    }, [profileName, user])

    return ( 
        <>
        {userProfile 
        &&
        (
          <div>
            {console.log(userProfile.profileUser)}
            <h1>{userProfile.profileUser.username + "'s profile"}</h1>
            <DisplayFollows
              users={userProfile}
            />
            
            {userProfile.profileUser.liked.map((feature, index) => (
              <FeatureIcon 
                key={index}
                type={feature.type}
                id={feature.featureId}
              />
          ))}
          <div>watchlist</div>
          {userProfile.profileUser.watchlist.map((feature, index) => (
              <FeatureIcon 
                key={index}
                type={feature.type}
                id={feature.featureId}
              />
          ))}
          </div>
        )}        
        </>
     );
}
 
export default Profile;