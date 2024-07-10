import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        async function getData(){
            try{
                const response = await fetch(`http://localhost:3000/getcurrentuserinfo`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    },
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch {
                setUser(null);
                console.error('Failed to fetch user data');
            }
        }

        return() => {
            if(token){
                getData();
            }
            
        }
    }, [token])
    
    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            { children }
        </UserContext.Provider>
    );
}
 
export const useUser = () => {
    return useContext(UserContext)
}