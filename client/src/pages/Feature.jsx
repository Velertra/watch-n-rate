import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FullDetails, GetCredits } from "../utilities/ApiFunction";
import FavsBtn from "../components/FavsBtn"
import WatchList from "../components/WatchList";
import Review from "../components/Review";
import HeaderBg from "../components/header/HeaderBg";
import ReviewLikes from "../components/ReviewLikes"
import { useUser } from "../components/UserContext";
import FeatureCredits from "../components/feature/FeatureCredits";
import { useFeature } from "../components/feature/FeatureContext";

export async function loader({request, params}){
    //console.log(params)
    const [type, id] = params.content.split("-");
    let feature = await GetCredits(type, id);
    //console.log(feature)
    //let feature = await featureData;
    return { feature };
}

const Feature = () => {
    const [details, setDetails] = useState();
    const [featureDetails, setFeatureDetails] = useState();
    const { content } = useParams();
    const [type, id] = content.split("-");
    const navigate = useNavigate();
    const { feature } = useLoaderData();
    const { user } = useUser();
    
    useEffect(()=> {
        async function getApiData(){
            let tmdbDetails = await FullDetails(type, id,);
            let data = await tmdbDetails;
            setDetails(data);
        }
        async function getfeatureData(){
            let featureDB = await fetch(`http://localhost:3000/feature/getfeaturereviews/?type=${type}&featureId=${id}`, {
                method: 'GET',
            });

            let featureData = await featureDB.json(); 
            setFeatureDetails(featureData.feature.reviews && featureData.feature.reviews);
        }

        return() => {
            getApiData();
            getfeatureData();
        }
    }, [])
    
    return ( 
        <>
            {details 
            && 
            <div>
                <HeaderBg 
                    featureImg={details.backdrop_path}
                />
                {user && <div>{user.currentUser.username}</div>}
                <div id="details-content" style={{display: 'flex'}}>
                    <img style={{width: '15vh'}} src={"http://image.tmdb.org/t/p/w500" + details.poster_path}></img>
                    <div id="feature-details">
                        <div id="fp-title">
                            <h3 id="fp-feature-name" style={{fontSize: '2vh'}}>{details.title || details.name}</h3>
                            <h5 id="fp-year">{new Date((details.release_date || details.first_air_date)).getFullYear()}</h5>{console.log(details)}
                            <h6 id="fp-diretor">{feature.crew[0] && feature.crew[0].name}</h6>
                        </div>
                            <p style={{width: '1vh'}}>{details.popularity}</p>
                            <p style={{fontSize: '1.5vh'}}>{details.overview}</p>
                    </div>
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
                </div>
            </div>}
            <ul>
                <li>cast</li>
                <li>crew</li>
                <li>details</li>
                <li>genres</li>
                <li>releases</li>
            </ul>
            
            <FeatureCredits
                feature={feature.cast}
            />
            
            <FeatureCredits
                feature={feature.crew}
            />
            <div>movies clips or news</div>
            {featureDetails 
            &&
            featureDetails.map((review, index) => (
                <div onClick={() => navigate(`/review/${review._id}`)} key={index}>
                    <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                    <p>{review.content}</p>
                    <div>{review.author.length !== 0 && (review.author[0].username == user.currentUser.username && (<div><button>edit</button><button>delete</button></div>))}</div>
                    <ReviewLikes
                        review={review}
                    />
                </div>
            ))
            }
            <div>similar feature area</div>
        </>    
    );
}
 
export default Feature;