import { useEffect, useRef, useState } from 'react';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenText, setHiddenText] =useState({
    isTyping: false,
    text: ""
  }); 
  const [alreadyUser, setAlreadyUser] = useState(true);
  const { setCurrentUser } = useUser();
  const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
  const navigate = useNavigate();
  const renderName = useRef(null);

  const checkUserName = (name) => {
    const allowed = /^[a-zA-Z0-9_]*$/;

    if(!allowed.test(name)){
      setHiddenText(prev =>({ 
        ...prev,
        isTyping: true,
        text: 'Use a-z, 0-9, _'
      }))
    } 
    return name
  }

  const sanitize = (name) => {
    const reg = /[&<>"'/]/ig;
    const symbol = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27',
      "/": '&#;',
  }
  
  return name.replace(reg, (match) => (symbol[match]));
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = async (e) => {
      setHiddenText(prev =>({ 
        ...prev,
        isTyping: true,
        text: 'Checking Users...' 
      }))
   
    const safeName = checkUserName(e.target.value);
    setUsername(safeName);
      
      if (safeName === '' || safeName.length <= 0) {
        setHiddenText(prev =>({ 
          ...prev,
          isTyping: false,
          text: ''
        }))

        
        return;


    } if(safeName.length >= 1 && safeName.length <= 3){
            
        setHiddenText(prev => ({
          ...prev,
          isTyping: true,
          text: "add more stuff"
        }));  
        return;
      }
        if (renderName.current) {
          clearTimeout(renderName.current);
        }
      
        renderName.current = setTimeout(async () => {
      try {
        //await new Promise(resolve => setTimeout(resolve, 3000));

        const response = await fetch(`${url}/checkusers/${safeName}`, {
            method: 'GET'
        });
        //console.log(response)
        if(response.ok){
          const data = await response.json(); 
          console.log(data)
          if(!data && safeName.length > 3){
              setHiddenText(prev => ({
                ...prev,
                isTyping: true,
                text: "User already out there somewhere"
              }));  
           
          } else if(data){
            setTimeout(() => {
              setHiddenText(prev => ({
                ...prev,
                isTyping: true,
                text: "This name seems perfect for you!"
              }));  
            }, 300)
          }
        }
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
    }, 1000);
    
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const safeName = sanitize(username);
    const safePassword = sanitize(password);
   
    if(safeName.length > 3){
      try {
        const response = await fetch((url + '/sign-up'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: safeName, password: safePassword }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          setCurrentUser(prev => ({
            ...prev,
            token: data
          }));
          navigate('/');
        }
      } catch (error) {
        console.log("check")
        console.error('Error occurred:', error);
        
      }
    } else {
      return;
    }
  };

  return (
    <div id='signup-body'>
      <div id='signup-section'>
        <form onSubmit={handleSubmit}>
          <div id='signup-inputs'>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              minLength={2}
              maxLength={15}
              onChange={handleUsernameChange}
              required
            />
          </div>
          {hiddenText.isTyping && <>{hiddenText.text}</>}
          
          <div id='signup-inputs'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              minLength={6}
              maxLength={50}
              placeholder='At least 6 characters'
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
