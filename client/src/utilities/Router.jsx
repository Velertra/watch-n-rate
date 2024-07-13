import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import { loader as navBarLoader } from "../components/NavBar";
import Header from "../components/header/MainHeaderBar";
import Search from "../pages/Search";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";

import Profile from "../pages/Profile";
import Feature from "../pages/Feature";
import LogIn from "../pages/LogIn";
import Reviews from "../pages/Reviews";
import FeatureReview from "../pages/FeatureReview";
import { UserProvider } from "../components/UserContext";
import { FeatureProvider } from "../components/feature/FeatureContext";
import { HomePageProvider } from "../components/HomePageContext";
/* figure it out (ScrollToTop) */


const Router = () => {

    const router = createBrowserRouter([
        { path: "/", element: <UserProvider><HomePageProvider><Header /></HomePageProvider></UserProvider> , errorElement: <ErrorPage />, loader: navBarLoader,
            children: [
                { index: true, element: <HomePage /> },
                { path:"search/:code", element: <Search /> },
                { path:"sign-up", element: <SignUp /> },
                { path:"logIn", element: <LogIn />},
                { path: "profile/:profileName", element:<Profile key={Math.random()}/>},
                { path: "/feature/:content", element: <FeatureProvider key={Math.random()}><Feature /></FeatureProvider>},
                { path: "/review/:mongoId", element: <FeatureProvider key={Math.random()}><FeatureReview /></FeatureProvider> },
                { path: "review", element: <Reviews />},
                
            ]
        },
    ])

    return <RouterProvider router={router} />;
};
 
export default Router;