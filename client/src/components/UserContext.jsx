import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        async function getData(){
           try{
            const response = await fetch(`http://localhost:3000/getcurrentuserinfo`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token && token.token}`
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            }
            } catch{
                setUser(null)
                console.error('accessing user content is working')
            }
        }
        return async() => {
            getData();
            
        } 
    }, [])
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}
 
export const useUser = () => {
    return useContext(UserContext)
}