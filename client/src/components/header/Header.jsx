import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";

const Header = () => {
    const { movies } = useLoaderData();

    return (
        <>
            <div id="header-img-container">
                <img id="header-img" src={"http://image.tmdb.org/t/p/w500" + movies.results[9].backdrop_path }></img>
                <div id="head-img-overlay"></div>
            </div>{console.log(movies)}
            <header>
                <section id="navbar">
                    <NavBar />
                </section>
            </header>
            <div id="header-content-container">
            </div>
            <Outlet/>
        </>
    );
}
 
export default Header;