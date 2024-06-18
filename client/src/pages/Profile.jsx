import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import FollowBtn from "../components/FollowBtn";
import Followers from "../components/Followers";
import Following from "../components/Following";

const Profile = () => {
    const { userName } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem("user"));

        async function getUser(){
          const response = await fetch(`http://localhost:3000/getUserProfile/${userName}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.token}`
            },
          });

          if(!response){
            console.error(Error)
            return
          }

          let userInfo = await response.json();
          console.log(userInfo)
          setUser(() => userInfo);
        }

        return async() => {
          getUser();
        } 

    }, [])

    return ( 
        <>
        {user 
        &&
        (
          <div>
            <h1>{user.profileUser.username},s profile</h1>
            <FollowBtn 
              userProfile={userName}
            />
            <Followers 
              followers={user.profileUser.followers.length}
            />
            <Following 
              following={user.profileUser.following.length}
            />
            {}
            
            {user.profileUser.faved.map((feature, index) => (
              <FeatureIcon 
                key={index}
                type={feature.type}
                id={feature.featureId}
              />
          ))}
          <div>watchlist</div>
          {user.profileUser.watchlist.map((feature, index) => (
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