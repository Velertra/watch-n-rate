export default async function ApiFunction(movieTitle){
    const apiKey = import.meta.env.VITE_REACT_APP_watchNRateKey; 
    /* const movieTitle = "star%20wars" */

    const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${movieTitle}&include_adult=false&language=en-US&page=1`,
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer '+ apiKey 
            }
        }
    )
        if (response.ok) {
            const data = await response.json();
            return data;
            //console.log(data.results);
        } else {
            console.error('API Error:', response.status, response.statusText);
        }
}