import { useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { useUser } from "../components/UserContext";

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenText, setHiddenText] =useState({
    isTyping: false,
    text: ""
  }); 
  const { setCurrentUser } = useUser();
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
     } else {
        setHiddenText(prev =>({ 
          ...prev,
          isTyping: true,
          text: 'The email or mobile number you entered isn’t connected to an account.' 
        }))
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
            <label htmlFor="username">{/* Username: */}</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                placeholder="Username"
                onChange={handleUsernameChange}
              />
              {hiddenText.isTyping && <p class="auth-error">{hiddenText.text}</p>}
            <label htmlFor="password">{/* Password: */}</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
              />
          </div>
        <button class="auth-btn" type="submit">Log In</button>
      </form>
      {/* <div id="login-signup"> */}
        <p id="login-signup">New to the site? <NavLink to="/sign-up">sign-up</NavLink></p>
      {/* </div> */}
      </div>
      <div id="trial-user">
        <p><small>Trial User: gizmo26</small></p>
        <p><small>Password: 123456</small></p>
      </div>
      
    </div>
  );
}
 
export default LogIn;