import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";

const Header = () => {
    const { movies, movieImg } = useLoaderData();
    console.log()

    return (
        <>
            <header> 
                <div id="header-container">
                    <h1>watchNrate</h1>
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