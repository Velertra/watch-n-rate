import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogOutClick = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return ( 
        <button onClick={handleLogOutClick}>logout</button>
     );
}
 
export default LogOut;