import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute"
import ErrorPage from "../pages/ErrorPage";
import NavBar, { loader as navBarLoader } from "../components/NavBar";
import Header from "../components/header/Header";
import Search from "../pages/Search";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";

import Profile from "../pages/Profile";
import Feature, { loader as featureLoader } from "../pages/Feature";
import NewTest from "../pages/NewTest";
import LogIn from "../pages/LogIn";
import Reviews from "../pages/Reviews";
import FeatureReview from "../pages/FeatureReview";
import UseAuthUser from "../components/AuthUser";
import { FeatureProvider } from "../components/feature/FeatureContext";
import { HomePageProvider } from "../components/HomePageContext";


const Router = () => {

    const router = createBrowserRouter([
        { path: "/", element: <Header /> , errorElement: <ErrorPage />, loader: navBarLoader,
            children: [
                { index: true, element: <HomePageProvider><HomePage /></HomePageProvider>, loader: navBarLoader,},
                { path:"search/:code", element: <Search /> },
                { path:"sign-up", element: <SignUp /> },
                { path:"logIn", element: <LogIn />},
                { path: "profile/:userName", element:<Profile />},
                { path: "/review/:mongoId", element: <FeatureReview /> },
                { path: "review", element: <Reviews />},
                { path: "/feature/:content", element: <Feature />, loader: featureLoader, }
            
                /* { element: <ProtectedRoute />, 
                    children: [
                        { path: "review", element: <Reviews /> }
                    ]
                } */

            ]
        },
    ])

    return <RouterProvider router={router} />;
};
 
export default Router;