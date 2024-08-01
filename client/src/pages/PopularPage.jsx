import { useEffect } from "react";
import Popular from "../components/homePage/Popular";
import ActorsDisplay from "../components/PopularPage/ActorsDisplay";
import PopUsersDisplay from "../components/PopularPage/PopUsersDisplay";

const PopularPage = () => {
    


    return (
        <div id="popular-page-body">
            <h1>Weekly Actors</h1>
            <ActorsDisplay />
            <h1>Users</h1>
            <PopUsersDisplay />
            <Popular />
        </div>
    );
}
 
export default PopularPage;