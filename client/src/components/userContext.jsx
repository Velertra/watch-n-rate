import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const token = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        async function getdata(){
            const response = await fetch(`http://localhost:3000/getcurrentuserinfo`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.token}`
            },
          });

          if(!response){
            console.error(Error)
            return
          }
          let data = await response.json();

          setUser(() => data);

          //console.log(data)
        }

        return async() => {
            getdata();
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