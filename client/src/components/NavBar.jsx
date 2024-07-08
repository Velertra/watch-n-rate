import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Choices from "./Choices";
import SearchBar from "./SearchBar";
import LogOut from "./LogOut";
import { FullDetails, GetCredits, MovieImages, PopularMovies, PopularTv, Upcoming } from "../utilities/ApiFunction"
import { useUser } from "./UserContext";


export async function loader({request, params,}){
  
  const token = JSON.parse(localStorage.getItem("user"));
  let series = await PopularTv();
  let movies = await PopularMovies();
  let upcoming = await Upcoming();
  let movieImg = await MovieImages(movies.results[1].id);
 /*  let recentReviews = await fetch("http://localhost:3000/getrecentreviews", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const hpReviews = await recentReviews.json()
   */
  
  return { series, movies, upcoming, movieImg/* , hpReviews */ }
}

const NavBar = () => {
  const { user } = useUser();

    return ( 
      <>
          <nav>
            <ul style={{display:"flex",gap:"10px", listStyleType: "none"}}>
              <li><NavLink to="/">home</NavLink></li>
              {!user && <li><NavLink to="login">login</NavLink></li>}
              {!user && <li><NavLink to="sign-up">sign-up</NavLink></li>}
              {user &&<li><NavLink to="review">reviews</NavLink></li>}
              {user && user.currentUser && <li><NavLink to={`profile/` + user.currentUser.username}>profile</NavLink></li>}
              {user && <li><LogOut /></li>}
            </ul>
          </nav>
      </>
     );
}
 
export default NavBar;