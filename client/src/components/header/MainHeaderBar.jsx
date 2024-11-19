import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../NavBar";

const Header = () => {

    return (
        <>
            <header> 
                    <NavBar />
            </header>
            <div id="header-back"></div>
            <div id="main-body">
                <Outlet/>
            </div>
        </>
    );
}
 
export default Header;