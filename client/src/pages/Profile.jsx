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
          const response = await fetch(`http://localhost:3000/getUserProfile`, {
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
            <h1>welcome {user.user.username}</h1>
            <FollowBtn 
              userTwo={userName}
            />
            <Followers 
              followers={user.user.followers.length}
            />
            <Following 
              following={user.user.following.length}
            />
            {user.user.faved.map((feature, index) => (
              <FeatureIcon 
                key={index}
                id={feature.featureId}
                type={feature.type}
              />
          ))}
          </div>
        )}        
        </>
     );
}
 
export default Profile;