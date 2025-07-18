const apiKey = import.meta.env.VITE_REACT_APP_WATCHNRATE;

export async function FeatureSearch(movieTitle) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${movieTitle}&include_adult=true&language=en-US&region=US&page=1`,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + apiKey 
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('API Error:', response.status, response.statusText);
            return null; 
        }
    } catch (error) {
        console.error('Fetch failed:', error);
        return null;
    }
};




export async function Upcoming(){
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
};



export async function PopularTv(){
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
};



export async function PopularMovies(){
     

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
};



export async function FullDetails(type, id){
     

    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}&include_adult=false&?language=en-USregion=US`,
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
};



export async function MovieImages(id){
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
};



export async function GetCredits(type, id){
    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?&include_adult=false&language=en-US`,
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
};

export async function PopularActors(){
    const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
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
};



export async function PersonSearch(page){
    const response = await fetch(
        `https://api.themoviedb.org/3/search/person?query=james%20dean&include_adult=false&language=en-US&page=${page}`,
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
};

export async function PersonsCredits(person){
    const response = await fetch(
        `https://api.themoviedb.org/3/person/${person}/movie_credits?language=en-US`,
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
};

export async function FeatureVideos(featureId, type){
    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${featureId}/videos?language=en-US`,
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
};

export async function BrowseSeries(){
    const rateCount = 5000;
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=${rateCount}`,
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
};