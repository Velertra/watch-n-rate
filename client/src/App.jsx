import React from 'react';
import Router from './utilities/Router';
import useAuthUser from './components/AuthUser';
import { UserProvider } from './components/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  )
};

export default App