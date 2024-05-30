import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";

const Header = () => {
    const { movies, movieImg } = useLoaderData();
    console.log()

    return (
        <>
            
            <header>
                <section id="navbar">
                    <NavBar />
                </section>
            </header>
            
            <Outlet/>
        </>
    );
}
 
export default Header;