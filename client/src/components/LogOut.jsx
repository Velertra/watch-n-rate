import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const LogOut = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleLogOutClick = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigate('/')
    }

    return ( 
        <NavLink onClick={handleLogOutClick}>logout</NavLink>
     );
}
 
export default LogOut;