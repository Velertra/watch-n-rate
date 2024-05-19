import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";

const Header = () => {
    const { movies } = useLoaderData();

    return (
        <>
            <div id="header-img-content">
                <img id="header-img" src={"http://image.tmdb.org/t/p/w500" + movies.results[1].backdrop_path }></img>
                <div id="head-img-overlay"></div>
            </div>{console.log(movies)}
            <header>
                <section id="header-content">
                    <h1>watchNrate</h1>
                    <NavBar />
                    <SearchBar />
                </section>
            </header>
            <Outlet/>
        </>
    );
}
 
export default Header;