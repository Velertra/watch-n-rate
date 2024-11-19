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
            <ul id="nav-list">
              <li className="left-head">
                <NavLink  style={{textDecorationLine: 'none'}} to="/">
                  <div id="home-btn">
                    <img id="homepage-icon" type="image/svg+xml" src="/homeBtnImg.svg"></img>
                    <div id="home-btn-text">WatchNRate</div>
                  </div>
                </NavLink>
              </li>
              <li id="pages">
                <ul>
                  {!user && <li><NavLink to="login">LOGIN</NavLink></li>}
                  {!user && <li><NavLink to="sign-up">SIGNUP</NavLink></li>}
                  {user?.currentUser && <li><NavLink to={`profile/` + user.currentUser.username}>PROFILE</NavLink></li>}
                  {user?.currentUser &&<li><NavLink to="review">REVIEWS</NavLink></li>}              
                  <li><NavLink to="popular">POPULAR</NavLink></li>
                  {user?.currentUser && <li><LogOut /></li>}
                </ul>
              </li>
              <li className="right-head"><SearchBar /></li>
            </ul>
          </nav>
      </>
     );
}
 
export default NavBar;