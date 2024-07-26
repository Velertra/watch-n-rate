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
  return { series, movies, upcoming, movieImg }
}

const NavBar = () => {
  const { user } = useUser();

    return ( 
      <>
          <nav>
            <ul id="nav-list" style={{display:"flex",gap:"10px", listStyleType: "none"}}>
              {!user && <li><NavLink to="login">LOGIN</NavLink></li>}
              {!user && <li><NavLink to="sign-up">SIGN-UP</NavLink></li>}
              {user?.currentUser && <li><NavLink to={`profile/` + user.currentUser.username}>PROFILE</NavLink></li>}
              {user?.currentUser &&<li><NavLink to="review">REVIEWS</NavLink></li>}              
              <li><NavLink>POPULAR</NavLink></li>
              {user?.currentUser && <li><LogOut /></li>}
            </ul>
          </nav>
      </>
     );
}
 
export default NavBar;