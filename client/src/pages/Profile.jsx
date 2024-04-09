import { useParams } from "react-router-dom";

const Profile = () => {
    const { userName } = useParams();

    return ( 
        <>
        welcome {userName}
        </>
     );
}
 
export default Profile;