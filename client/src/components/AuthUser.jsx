import { useState, useEffect } from 'react';

const useAuthUser = () => {
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localStorage = JSON.parse(window.localStorage.getItem('user'));
      if (!localStorage) {
        setLoading(false);
        return;
      }

      try {
        const checkUser = await fetch('http://localhost:3000/authuser', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        if (checkUser.status === 403) {
          setUser(null);
        } else {
          const response = await checkUser.json();
          setUser(response);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuthUser;
