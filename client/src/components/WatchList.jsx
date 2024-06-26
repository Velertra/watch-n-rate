const WatchList = ({ title, type, featureId}) => {
    const token = JSON.parse(localStorage.getItem("user"));

    async function addToWatchList(){
        if (!title || !type || !featureId) {
            console.error("Missing required fields in request body");
            return;
        }

        let response = await fetch('http://localhost:3000/addtowatchlist', 
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token}`
              },
            body: JSON.stringify({ title, type, featureId}),
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data)
            
            return;
        }
    }

    return ( 
        <button onClick={addToWatchList}>watchlist</button>
    );
}
 
export default WatchList;