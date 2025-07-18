import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Header from "../components/header/MainHeaderBar";
import Search from "../pages/Search";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";

import Profile from "../pages/Profile";
import Feature from "../pages/Feature";
import LogIn from "../pages/LogIn";
import Reviews from "../pages/Reviews";
import FeatureReview from "../pages/FeatureReview";
import { FeatureProvider } from "../components/feature/FeatureContext";
import { HomePageProvider } from "../components/HomePageContext";
import PopularPage from "../pages/PopularPage";
import PersonSearchPage from "../pages/PersonSearchPage";
import BrowsePage from "../pages/BrowsePage";

const Router = () => {

    const router = createBrowserRouter([
        { path: "/", element: <HomePageProvider><Header /></HomePageProvider> , errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage /> },
                { path:"search/:code", element: <Search /> },
                { path:"sign-up", element: <SignUp /> },
                { path:"logIn", element: <LogIn />},
                { path:"popular", element: <PopularPage /> },
                { path:"searchpeople/:person", element: <PersonSearchPage /> },
                { path: "profile/:profileName", element:<Profile key={Math.random()}/>},
                { path: "/feature/:content", element: <FeatureProvider key={Math.random()}><Feature /></FeatureProvider>},
                { path: "/review/:mongoId", element: <FeatureProvider key={Math.random()}><FeatureReview /></FeatureProvider> },
                { path: "review", element: <Reviews />},
                { path: "browse", element: <BrowsePage />}
                
            ]
        },
    ])

    return <RouterProvider router={router} />;
};
 
export default Router;