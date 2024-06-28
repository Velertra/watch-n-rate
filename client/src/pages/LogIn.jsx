import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

      const token = await response.json();
      console.log(token)

      localStorage.setItem("user", JSON.stringify(token));

      navigate(`/`)
      
      if (response.ok) {
        // Success, do something here
        //console.log('User signed up successfully');
      } else {
        // Handle error responses
        //console.error('Failed to sign up');
      }
    } catch (error) {
      //console.error('Error occurred:', error);
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
        <p>New to the site? <NavLink /* style={{color: "white"}} */ to="/sign-up">sign-up</NavLink></p>
      </div>
      </div>
    </div>
  );
}
 
export default LogIn;