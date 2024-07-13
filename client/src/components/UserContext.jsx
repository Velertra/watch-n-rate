import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState( {'currentUser': null, 'token': JSON.parse(localStorage.getItem("user"))});
    
    

    useEffect(() => {
        async function getData(){
            try{
                const response = await fetch(`http://localhost:3000/getcurrentuserinfo`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${currentUser.token.token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    
    
                    setCurrentUser(prevUser => ({
                        ...prevUser,
                        currentUser: data
                    }))
                }
            } catch {
                setCurrentUser(null);
                console.error('Failed to fetch user data');
            }
        }

      return() => {
        getData();
      }
    }, [currentUser?.token?.token])
    
    return (
        <UserContext.Provider value={{ user: currentUser?.currentUser , setCurrentUser, }}>
            { children }
        </UserContext.Provider>
    );
}
 
export const useUser = () => {
    return useContext(UserContext)
}