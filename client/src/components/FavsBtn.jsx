import { useEffect } from "react";

const FavsBtn = ({ title, type, featureId}) => {
    const token = JSON.parse(localStorage.getItem("user"));
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';
    
    function handleFavsBtn(e){
        e.stopPropagation()
    }
        
    async function addFav(){
        if (!title || !type || !featureId) {
            console.error("Missing required fields in request body");
            return;
        }

        let response = await fetch(`${url}/feature/addtouserliked`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
              },
            body: JSON.stringify({ title, type, featureId}),
        });
        const data = await response.json();
        if (!response.ok) {
            console.error(data.message);
            return;
        } else {
            console.log(data);
        }
    }
    
    return ( 
        <button onClick={addFav}>fav</button>
     );
}
 
export default FavsBtn;


/*  const token = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        let abortController = new AbortController();

        async function getDetails(){
            let response = await fetch('http://localhost:3000/favMovies', {
                signal: abortController.signal
            }, 
            {
                method: 'POST',
                headers: {
                Authorization: `Bearer ${token.token}`
                },
                body: JSON.stringify({ title, type, id }),
              }
            
        );
            
            if(!abortController.signal.aborted){
                let data = await response;
            }
        }
        
        if(id){
            getDetails();
        }

        return() => {
            abortController.abort();
        }
    }, []) */