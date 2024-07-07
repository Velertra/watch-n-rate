import { createContext, useContext, useEffect, useState } from "react";
import GetUser from "../hooks/GetUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = JSON.parse(localStorage.getItem("user"));
    

    useEffect( ()=> {
        const getData = async () => {
            const {user} = await GetUser(token);
            console.log(user)
            setUser(user)

        }
            
        return() => {
            getData()    
        }
    }, []);

    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}
 
export const useUser = () => {
    return useContext(UserContext)
}