import { useEffect, useState } from "react";
import { BrowseSeries } from "../utilities/ApiFunction"

const SearchPage = () => {
    const [seriesInfo, setSeriesInfo] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            const result = await BrowseSeries();
            setSeriesInfo(result)
        };
        fetchInfo()
    }, []);

    return (
        <div id="browser-woswer">{console.log(seriesInfo)}
                {seriesInfo?.results && (seriesInfo.results).map((movie, index) => {
                return (
                    <div id="movie-content" onClick={() => handleContentClick(movie)} key={index}>
                        <img id="sp-feature-img" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}></img>
                        <div id="movie-details">
                            <ul key={index}>
                                <li>
                                    <h3>{movie.title || movie.name}</h3>
                                    <p>&#10025;{movie.vote_average}</p>
                                    {/* <p>{cutContent(movie.overview)}</p> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                )
                })}
            </div>
    );
}

export default SearchPage;