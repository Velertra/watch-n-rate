import { useState,  } from "react";

const GetUser = async( {token} ) => {
        try {
            const response = await fetch(`http://localhost:3000/getcurrentuserinfo`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log('check')
                const data = await response.json();
                return data;
            }
        } catch {
            console.error('Failed to fetch user data');
            return null;
        }
    
}
 
export default GetUser;