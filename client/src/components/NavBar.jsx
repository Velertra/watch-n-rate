import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Choices from "./Choices";
import SearchBar from "./SearchBar";
import { ApiFunction } from "../utilities/ApiFunction";

export async function loader(){
  const choice = await ApiFunction()
}

const NavBar = () => {

    return ( 
      <>
        <section>
            <NavLink to="/">Home</NavLink>
            <NavLink to="sign-up">sign-up</NavLink>
            <SearchBar />
        </section>
        <Outlet />
      </>
     );
}
 
export default NavBar;