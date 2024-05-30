import { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Choices from "./Choices";
import SearchBar from "./SearchBar";
import LogOut from "./LogOut";
import { FullDetails, MovieImages, PopularMovies, PopularTv, Upcoming } from "../utilities/ApiFunction"

export async function loader({request, params,}){
  let series = await PopularTv();
  let movies = await PopularMovies();
  let upcoming = await Upcoming();
  let movieImg = await MovieImages(movies.results[1].id);
  
  return { series, movies, upcoming, movieImg }
}

const NavBar = () => {
    return ( 
      <>
        <h1>watchNrate</h1>
        <nav>
          <ul style={{display:"flex",gap:"10px", listStyleType: "none"}}>
            <li><NavLink to="/">home</NavLink></li>
            <li><NavLink to="login">login</NavLink></li>
            <li><NavLink to="sign-up">sign-up</NavLink></li>
            <li><NavLink to="review">review</NavLink></li>
            <li><LogOut /></li>
          </ul>
        </nav>
        <SearchBar />
      </>
     );
}
 
export default NavBar;