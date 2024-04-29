import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeatureIcon from "../components/FeatureIcon";

const Profile = () => {
    const { userName } = useParams();
    const [user, setUser] = useState();
    

    useEffect(() => {
      const token = JSON.parse(localStorage.getItem("user"));

        async function getUser(){
          const response = await fetch(`http://localhost:3000/getuser`, {
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
            {user.user.favFeatures.map((feature, index) => (
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