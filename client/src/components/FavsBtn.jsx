import { useEffect } from "react";

const FavsBtn = ({ title, type, featureId}) => {
    const token = JSON.parse(localStorage.getItem("user"));

    function handleFavsBtn(e){
        e.stopPropagation()
    }
        
    async function addFav(){
        if (!title || !type || !featureId) {
            console.error("Missing required fields in request body");
            return;
        }

        console.log(featureId)
        let response = await fetch('http://localhost:3000/feature/addfav', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
              },
            body: JSON.stringify({ title, type, featureId}),
        });

        if (!response.ok) {
            const data = await response.json();
            //console.error(data.message);
            return;
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