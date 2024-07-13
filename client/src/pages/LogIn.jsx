import { useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { useUser } from "../components/UserContext";

export async function loader({request, params,}){
  console.log('loader working') 
}

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useUser();
  const location = useLocation();  
  const navigate = useNavigate()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));  
        setCurrentUser(prevUser => ({
          ...prevUser,
          token: data
      }))
        //refreshUser();
        
        navigate(`/`)  
      } 
      

    } catch (error) {
      console.error('Error occurred on login');
    }
    
  }

    return (
      <div id="login-page">
      <div id="login-section">
        <form onSubmit={handleLogIn}>
          <div id="login-inputs">
            <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
          </div>
        <button type="submit">Sign Up</button>
      </form>
      <div id="login-signup">
        <p>New to the site? <NavLink to="/sign-up">sign-up</NavLink></p>
      </div>
      </div>
    </div>
  );
}
 
export default LogIn;