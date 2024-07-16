const apiKey = import.meta.env.VITE_REACT_APP_WATCHNRATE;

export async function ApiFunction(movieTitle){
     
    /* const movieTitle = "star%20wars" */

    const response = await fetch(
        `http://api.themoviedb.org/3/search/multi?query=${movieTitle}&include_adult=false&language=en-US&page=1`,
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
     
    /* const movieTitle = "star%20wars" */

    const response = await fetch(
        `http://api.themoviedb.org/3/movie/upcoming?include_adult=false&language=en-US&page=1&region=US`,
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



export async function PopularTv(){
     

    const url = 'http://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
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
     

    const url = 'http://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
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
     

    const response = await fetch(
        `http://api.themoviedb.org/3/${type}/${id}?language=en-US`,
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
     

    const response = await fetch(
        `http://api.themoviedb.org/3/movie/${id}/images?include_image_language=en`,
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
    

    const response = await fetch(
        `http://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
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