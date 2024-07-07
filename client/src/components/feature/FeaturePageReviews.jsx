import { useNavigate } from "react-router-dom";
import ReviewLikes from "../ReviewLikes";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";

const FeaturePageReviews = ({ reviews}) => {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <>
            {user !== null ? reviews.map((review, index) => (
                        <div onClick={() => navigate(`/review/${review._id}`)} key={index}>
                            <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                            <p>{review.content}</p>
                            <ReviewLikes
                                review={review}
                            />
                            {user?.currentUser?.username == review.author[0]?.username && <><button>delete</button><button>edit</button></>}{/* <div>{(user.currentUser.username == review.author[0].username) && <><div><button>edit</button><button>delete</button></div></>}</div> */}
                            {console.log(user)}</div>
                    )) : 
                    reviews.map((review, index) => (
                        <div onClick={() => navigate(`/review/${review._id}`)} key={index}>
                            <h5>{review.author.length !== 0 ? review.author[0].username : "User Deleted"}</h5>
                            <p>{review.content}</p>
                            <ReviewLikes
                                review={review}
                            />
                        {console.log('no user')}</div>
                    ))
                    }
        </>
    );
}
 
export default FeaturePageReviews;