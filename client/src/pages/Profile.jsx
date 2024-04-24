import { useParams } from "react-router-dom";
import TestToken from "../components/TestToken";

const Profile = () => {
    const { userName } = useParams();

    return ( 
        <>
        <TestToken />
        welcome {userName}
        </>
     );
}
 
export default Profile;