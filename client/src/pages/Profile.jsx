import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import { useUser } from "../components/UserContext";
import DisplayFollows from "../components/Profile/DisplayFollows";



const Profile = () => {
  const [userProfile, setUserProfile] = useState();
  const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
  const { profileName } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    
    async function getUser(){
      const response = await fetch(`${url}/getUserProfile/${profileName}`, {
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

      getUser();
      
  }, [profileName, user])

  const handleImgUpload = (e) => {
    console.log(e.target.value)
  }

  return ( 
      <>
      {userProfile 
      &&
      (
        <div>
          {console.log(userProfile.profileUser)}
          <h1>{userProfile.profileUser.username + "'s profile"}</h1>
          <div>
            <input
              id="profile-img-input"
              style={{display: "none"}}
              type="file"
              onChange={(e) => handleImgUpload(e)}
              accept="image/png, image/jpeg"
              />
            <button id="select-img-btn" onClick={() => document.getElementById('profile-img-input').click()} type="button" >select img</button>
            
          </div>
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