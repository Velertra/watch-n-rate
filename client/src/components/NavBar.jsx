import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Choices from "./Choices";
import SearchBar from "./SearchBar";
import LogOut from "./LogOut";
import { PopularMovies, PopularTv, Upcoming } from "../utilities/ApiFunction"

export async function loader(){
  let series = await PopularTv();
  let movies = await PopularMovies();
  let upcoming = await Upcoming();
  
  return { series, movies, upcoming}
}

const NavBar = () => {
    return ( 
      <>
        <nav>
          <ul style={{display:"flex",gap:"10px", listStyleType: "none"}}>
            <li><NavLink to="/">home</NavLink></li>
            <li><NavLink to="login">login</NavLink></li>
            <li><NavLink to="sign-up">sign-up</NavLink></li>
            <li><NavLink to="review">review</NavLink></li>
            <li><LogOut /></li>
          </ul>
        </nav>
      </>
     );
}
 
export default NavBar;