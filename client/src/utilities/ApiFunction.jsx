export async function ApiFunction(movieTitle){
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

export async function Upcoming(){
    const apiKey = import.meta.env.VITE_REACT_APP_watchNRateKey; 
    /* const movieTitle = "star%20wars" */

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?include_adult=false&language=en-US&page=1&region=US`,
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
            
        } else {
            console.error('API Error:', response.status, response.statusText);
        }

}


/* export async function Upcoming(){
    //const apiKey = import.meta.env.VITE_REACT_APP_watchNRateKey; 
    //const movieTitle = "star%20wars"

    const url = 'https://imdb188.p.rapidapi.com/api/v1/getUpcomingMovies?region=US';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0b6e4f08a7msh8b885a9d51d61dbp11d9e4jsnbb5913d5fbfd',
		'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    console.log(result)
} catch (error) {
	console.error(error);
}
} */

export async function PopularTv(){
    const apiKey = import.meta.env.VITE_REACT_APP_watchNRateKey; 

    const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+ apiKey
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}

export async function PopularMovies(){
    const apiKey = import.meta.env.VITE_REACT_APP_watchNRateKey; 

    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+ apiKey
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}

export async function FullDetails(type, id){
    const apiKey = import.meta.env.VITE_REACT_APP_watchNRateKey; 

    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
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
            
        } else {
            console.error('API Error:', response.status, response.statusText);
        }
}

export async function MovieImages(id){
    const apiKey = import.meta.env.VITE_REACT_APP_watchNRateKey; 

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?include_image_language=en`,
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
            
        } else {
            console.error('API Error:', response.status, response.statusText);
        }
}

export async function GetCredits(type, id){
    const apiKey = import.meta.env.VITE_REACT_APP_watchNRateKey;

    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
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
            
        } else {
            console.error('API Error:', response.status, response.statusText);
        }
}