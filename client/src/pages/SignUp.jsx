import { useEffect, useState } from 'react';
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
  const navigate = useNavigate();

  const checkUserName = (name) => {
    const allowed = /^[a-zA-Z0-9_]*$/;

    if(!allowed.test(name)){
      console.log('this shouldnt work')
      console.log(name)
      setHiddenText(prev =>({ 
        ...prev,
        isTyping: true,
        text: 'Use a-z, 0-9, _'
      }))

      return name
    } else {
      console.log('This is good. this is ok')
      return name
    }
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
    //setTimeout(() => {
      setHiddenText(prev =>({ 
        ...prev,
        isTyping: true,
        text: 'Checking Users...'
      }))
    //}, 700)
   
    const safeName = checkUserName(e.target.value);
    setUsername(safeName);
      
      if (e.target.value === '' || e.target.value.length <= 0) {
        setHiddenText(prev =>({ 
          ...prev,
          isTyping: false,
          text: ''
        }))
        return;
    } else {
      try {
        const response = await fetch(`http://localhost:3000/checkusers/${safeName}`, {
            method: 'GET'
        });

        if(response.ok){
          const data = await response.json(); 

          if(!data && safeName.length > 3){
            setTimeout(() => {
              setHiddenText(prev => ({
                ...prev,
                isTyping: true,
                text: "User already out there somewhere"
              }));  
            }, 700)
          } else if(safeName.length < 3){
            setTimeout(() => {
              setHiddenText(prev => ({
                ...prev,
                isTyping: true,
                text: "add more stuff"
              }));  
            }, 700)
          }else {
            setTimeout(() => {
              setHiddenText(prev => ({
                ...prev,
                isTyping: true,
                text: "This name seems perfect for you!"
              }));  
            }, 700)
          }
        }
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const safeName = sanitize(username);
    const safePassword = sanitize(password);
   
    if(safeName.length > 3){
      try {
        const response = await fetch('http://localhost:3000/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: safeName, password: safePassword }),
        });
  
        const data = await response.json();
        console.log(data)
        
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          setCurrentUser(prev => ({
            ...prev,
            token: data
          }));
          navigate('/');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    } else {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
      {hiddenText.isTyping && <>{hiddenText.text}</>} {/* (alreadyUser ?  <>Checking...</> : <>Taken</>)  */}
      
      <div>
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
  );
};

export default SignUp;
