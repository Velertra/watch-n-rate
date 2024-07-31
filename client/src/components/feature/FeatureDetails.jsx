import FavsBtn from "../FavsBtn";
import FeatureIcon from "../FeatureIcon";
import Review from "../Review";
import WatchList from "../WatchList";

const FeatureDetails = ({ feature, details, type, user }) => {

    return (
        
            <div id="details-content">
                {/* <div id="feature-poster">
                    <img style={{width: '15vh'}} src={"https://image.tmdb.org/t/p/w500" + details.poster_path}></img>
                </div> */}
                <div id="fp-feature-icon">
                    <FeatureIcon
                        type={type}
                        id={feature.id}
                    />
                </div>
                <div id="feature-details">
                    <div id="fp-title">
                        <h3 id="fp-feature-name">{details.title || details.name}</h3>
                        <h5 id="fp-year">{new Date((details.release_date || details.first_air_date)).getFullYear()}</h5>
                        {feature && <h6 id="fp-diretor">{feature.crew[0] && feature.crew[0].name}</h6>}
                    </div>
                        <p>{details.vote_average}</p>
                        <p>{details.tagline}</p>
                        <p>{details.overview}</p>
                    </div>
                {user 
                &&
                <div id="fp-btns">
                    <FavsBtn
                            title={details.title || details.name}
                            type={type}
                            featureId={details.id}
                    />
                    <WatchList
                        title={details.title || details.name}
                        type={type}
                        featureId={details.id}
                    />
                    <Review 
                        title={details.title || details.name}
                        type={type}
                        featureId={details.id}
                    />
                </div>}
            </div>
    );
}
 
export default FeatureDetails;