import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";
import { useUser } from "../components/UserContext";
import DisplayFollows from "../components/Profile/DisplayFollows";
import ReviewLikes from "../components/ReviewLikes";
import { Image } from "cloudinary-react";
//import { Cloudinary } from '@cloudinary/url-gen';


const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [imgId, setImgId] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"));
  const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
  const { profileName } = useParams();
  const cloudinaryImg = import.meta.env.VITE_IMG_ID;
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
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
      } else {
          let userInfo = await response.json();
          setUserProfile(() => userInfo);
          console.log(userInfo.profileUser.imagePath)
          setImgId(() => userInfo.profileUser.imagePath)
      }
    }
      getUser(); 

  }, [profileName, user]);


  const handleImgUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", cloudinaryImg);

    const response = await fetch('https://api.cloudinary.com/v1_1/dockrhn34n4/image/upload', {
      method: 'POST',
      body: formData,
    });
    
    if(response.ok){
      const data = await response.json();
      const fileId = data.public_id
      setImgId(() => fileId);
      
      /* save to database here */
      const imgfile = await fetch(`${url}/saveprofileimg`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify({ imgPath: fileId }),
      })
    }
  }

  return ( 
      <>
      {userProfile 
      &&
      (<div id="profile-body">
          <div id="profile-header">
            <div id="profile-img-container">
              <Image
                id='profile-img'
                cloudName="dockrhn34n4" 
                publicId={imgId}
              />
            </div>
            <div id="p-details-section">
            <h1>{userProfile.profileUser.username}</h1>
              {userProfile.profileUser.username === user?.currentUser?.username
              &&
              <div>
                <input
                  id="profile-img-input"
                  style={{display: "none"}}
                  type="file"
                  onChange={(e) => handleImgUpload(e)}
                  accept="image/png, image/jpeg"
                  />
                <button id="select-img-btn" onClick={() => document.getElementById('profile-img-input').click()} type="button" >select img</button>  
              </div>}
              
                <DisplayFollows
                  userProfile={userProfile}
                />
              
            </div>
          </div>
          <div id="profile-content">
            <h3>Liked</h3>
            <div id="p-liked-section">
              {userProfile.profileUser.liked.slice(0, 6).map((feature, index) => (
                <FeatureIcon 
                  key={index}
                  type={feature.type}
                  id={feature.featureId}
                />
              ))}
            </div>
          <h3>Watch List</h3>
          <div id="p-watchlist-section">
            {userProfile.profileUser.watchlist.slice(0, 6).map((feature, index) => (
                <FeatureIcon 
                  key={index}
                  type={feature.type}
                  id={feature.featureId}
                />
            ))}
          </div>
          <div id="p-recent-reviews">
            {userProfile.profileUser.reviews.slice(0, 5).map((review, index) => (
                <div id="hp-rr" onClick={() => navigate(`/review/${review._id}`)} key={index}>

                    <FeatureIcon 
                    id={review.feature[0].featureId}
                    type={review.feature[0].type}
                    />
                    <div id="hp-rr-content">
                      <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                      <h4 id="r-feature-title">{review.feature[0].title || review.feature[0].name}</h4>
                      <p>{review.content}</p>
                    </div>
                </div>
            ))}
          </div>
          </div>
        </div>
      )}        
      </>
    );
}
 
export default Profile;