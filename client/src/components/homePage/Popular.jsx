import { useRef } from "react";
import FeatureIcon from "../FeatureIcon";
import { useHomePage } from "../HomePageContext";

const Popular = () => { 
    const { popular } = useHomePage();
    const moviesRef = useRef(null);
    const tvRef = useRef(null);

    const handleScroll = (direction, refChoice) => {
        if (refChoice.current) {
          const scrollAmount = direction === 'left' ? -183 : 183;
          refChoice.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      };

    return (
        <> 
        {popular
            &&
            <div id="popular-features">
                
                <h1 id="hp-popular-label">Popular Movies</h1>
                <div id="hp-popular-style"></div>
                <div id="hp-popular-lists">
                    <button  onClick={() => handleScroll('left', moviesRef)}>{'<'}</button>
                    <div id="hp-popular-movies" ref={moviesRef}>
                        
                        {popular.movies.results.map((show, index) =>
                            <FeatureIcon
                                type={'movie'}
                                id={show.id}
                                key={index}
                            />
                        )}
                        
                    </div>
                    <button  onClick={() => handleScroll('right', moviesRef)}>{'>'}</button>
                </div>
                
                <h1 id="hp-popular-label">Popular Tv</h1>
                <div id="hp-popular-lists">
                <button  onClick={() => handleScroll('left', tvRef)}>{'<'}</button>
                    <div id="hp-popular-tv" ref={tvRef}>
                        {popular.series.results.map((show, index) => 
                            <FeatureIcon
                                type={'tv'}
                                id={show.id}
                                key={index}
                            />
                        )}
                    </div>
                    <button  onClick={() => handleScroll('right', tvRef)}>{'>'}</button>
                </div>
                
            </div>
            }
        </>
    );
}
 
export default Popular;