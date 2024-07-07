import { useEffect, useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleUsernameChange = async (e) => {
    setUsername(e.target.value);
      
      if (e.target.value === '' || e.target.value.length <= 1) {
        return;
    } else {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/checkusers/${e.target.value}`, {
            method: 'GET'
        });

        const data = await response.json();
        console.log(data);

      } catch (error) {
          console.error('Error fetching user data:', error);
      }
    }
};

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

  };

 /*  useEffect(() => {
    async function checkUsers() {
      const response = await fetch(`http://localhost:3000/checkusers/${username}`, {
        method: 'GET'
      })

      const data = response.json();
      //setloading(() => data);
    }

    return () => {
      
      checkUsers()
    }
  }, [username]) */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data)
      
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
      {loading && <>searching...</>}
      
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
