import { useState } from "react";

const GetUser = async( token ) => {
    let user;
    
        try {
            const response = await fetch(`http://localhost:3000/getcurrentuserinfo`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token && token.token}`
                },
            });

            //console.log(token)
            if (response.ok) {
                const data = await response.json();
                
                user = data;
            }
        } catch {
            user = null;
            console.error('Failed to fetch user data');
        }
    
    return { user, token };
}
 
export default GetUser;