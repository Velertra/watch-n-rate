import { useNavigate } from "react-router-dom";
import ReviewLikes from "../ReviewLikes";
import { useUser } from "../UserContext";

const FeaturePageReviews = ({ reviews, user }) => {
    //const { user } = useUser();
    const navigate = useNavigate();

    return (
        <>
            {reviews.map((review, index) => (
                        <div onClick={() => navigate(`/review/${review._id}`)} key={index}>
                            <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                            <p>{review.content}</p>
                            <ReviewLikes
                                review={review}
                            />
                            {user && (user.currentUser.username == review.author[0].username) ? <><button>delete</button><button>edit</button></> : null}{/* <div>{(user.currentUser.username == review.author[0].username) && <><div><button>edit</button><button>delete</button></div></>}</div> */}
                        </div>
                    ))}
        </>
    );
}
 
export default FeaturePageReviews;