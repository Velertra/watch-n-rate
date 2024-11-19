import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState( {'currentUser': null, 'token': JSON.parse(localStorage.getItem("user"))});
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
    

    useEffect(() => {
        async function getData(){
            
            try{
                const response = await fetch(`${url}/getcurrentuserinfo`, {
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

                } else {
                    console.error(`Fetch error: ${response.status} ${response.statusText}`);
                    setCurrentUser(prevUser => ({
                        ...prevUser,
                        currentUser: null
                    }))
                }
            } catch {
                
                setCurrentUser(prevUser => ({
                    ...prevUser,
                    currentUser: null
                }))
            }
        }
        
        getData();
     
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