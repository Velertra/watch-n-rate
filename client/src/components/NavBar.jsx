import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Choices from "./Choices";
import SearchBar from "./SearchBar";
import { ApiFunction } from "../utilities/ApiFunction";
import LogOut from "./LogOut";

const NavBar = () => {
    return ( 
      <>
        <section>
            <NavLink to="/">Home</NavLink>
            <NavLink to="login">login</NavLink>
            {/* area for favs tabs */}
            <NavLink to="sign-up">sign-up</NavLink>
            <LogOut />
            <SearchBar />
        </section>
        <Outlet />
      </>
     );
}
 
export default NavBar;