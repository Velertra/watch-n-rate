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
  const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpcnN0dXNlciIsImlhdCI6MTcyMDgyMDcwNywiZXhwIjoxNzIwODQ1OTA3fQ.Q5Jop2NaIT6IV1op1VFpE50PugZC0PE77WYYUZ-EPH0 */
    try {
      const response = await fetch(`${url}/login`, {
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