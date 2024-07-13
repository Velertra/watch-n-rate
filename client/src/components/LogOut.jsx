import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const LogOut = () => {
    const { setCurrentUser } = useUser();
    const navigate = useNavigate();

    const handleLogOutClick = () => {
        localStorage.removeItem('user')
        setCurrentUser({
            currentUser: null,
            token: null
        })
        //refreshUser();
        navigate('/')
    }

    return ( 
        <NavLink onClick={handleLogOutClick}>logout</NavLink>
     );
}
 
export default LogOut;