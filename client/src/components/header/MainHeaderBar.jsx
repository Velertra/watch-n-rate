import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";

const Header = () => {

    return (
        <>
            <header> 
                <div id="header-container">
                    <NavLink style={{textDecorationLine: 'none'}} to="/"><h1>WatchNRate</h1></NavLink>
                    <NavBar />
                    <SearchBar />
                </div>
            </header>
            <div id="header-back"></div>
            <div id="main-body">
                <Outlet/>
            </div>
        </>
    );
}
 
export default Header;