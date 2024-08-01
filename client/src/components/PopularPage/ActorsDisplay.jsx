import { useEffect, useRef, useState } from "react";
import { PopularActors } from "../../utilities/ApiFunction";
import { Link } from "react-router-dom";


const ActorsDisplay = () => {
    const [actorsList, setActorsList] =useState();
    const actorRef = useRef(null);

    const handleScroll = (direction, refChoice) => {
        if (refChoice.current) {
          const scrollAmount = direction === 'left' ? -183 : 183;
          refChoice.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      };

    useEffect(() => {
        async function fetchActors(){
            const actorsData = await PopularActors()
            setActorsList(() => actorsData)
        }

        fetchActors();
    },[])

    return (
        <>
            {actorsList
            &&
            <div id="hp-popular-lists">
                <button  onClick={() => handleScroll('left', actorRef)}>{'<'}</button>
                    <div id="hp-popular-tv" ref={actorRef}>
                        {actorsList.results.map((actor, index) => 
                            
                                <div key={index} id="feature-icon-container">
                                    <div id="feature-icon">
                                        <Link /* to={`/feature/${type + - + actor.id}`} */><img id="feature-icon-img" src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}></img></Link>
                                        {/* <h4>{actor.title || actor.name}</h4> */}
                                    </div>
                                    <div>
                                        <h6 id="feature-icon-name">{/* {cutContent(actor.title || actor.name)} */}</h6>
                                    </div>
                                </div>
                            
                        )}
                    </div>
                    <button  onClick={() => handleScroll('right', actorRef)}>{'>'}</button>
                </div>}
        </>
    );
}
 
export default ActorsDisplay;