import { UserProvider } from './components/UserContext';
import Router from './utilities/Router';


const App = () => {

  return (
    <UserProvider>
      <Router />
    </UserProvider>
  )
};

export default App