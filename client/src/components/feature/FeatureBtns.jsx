import FavsBtn from "../FavsBtn";
import Review from "../Review";
import WatchList from "../WatchList";

const FeatureBtns = ( { details, type }) => {
    return (
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
        </div>
    );
}
 
export default FeatureBtns;