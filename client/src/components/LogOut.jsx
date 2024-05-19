import { NavLink, useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogOutClick = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return ( 
        <NavLink onClick={handleLogOutClick}>logout</NavLink>
     );
}
 
export default LogOut;