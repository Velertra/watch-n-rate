import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

const PopUsersDisplay = () => {
    const [topUsers, setTopUsers] = useState();
    const url = import.meta.env.VITE_NODE === 'production' ? import.meta.env.VITE_PORT_URL : 'http://localhost:3000';

    useEffect(() => {
        async function getUserInfo(){
            try {
                let topUserData = await fetch(`${url}/getpopularusers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                let data = await topUserData.json();
                console.log(data)
                setTopUsers(data);

            } catch (error) {
                console.error('Error fetching top user:', error);
            }
        }

        getUserInfo();
    }, [])

    return (
        <>
            {topUsers
            &&
            <div id="hp-popular-lists">
                <button /* onClick={() => handleScroll('left', tvRef)} */>{'<'}</button>
                    <div id="hp-popular-tv" /* ref={tvRef} */>
                        {topUsers.slice(0, 5).map((user, index) => 
                            <div key={index} id="feature-icon-container">
                            <div id="feature-icon">
                                <Link to={`/profile/${user.author[0].username}`}>
                                    <div id="profile-img-container">
                                        <Image
                                            id='profile-img'
                                            cloudName="dockrhn34n4" 
                                            publicId={user.author[0].imagePath}
                                        />
                                    </div>
                                </Link>
                                <h4>{ user.author[0].username || "" }</h4>
                            </div>
                            <div>
                                <h6 id="feature-icon-name">{/* {cutContent(user.author[0].title || user.author[0].name)} */}</h6>
                            </div>
                        </div>
                        )}
                    </div>
                <button /* onClick={() => handleScroll('right', tvRef)} */>{'>'}</button>
            </div>
            }
        </>
    );
}
 
export default PopUsersDisplay;