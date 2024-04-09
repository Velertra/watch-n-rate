import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import NavBar from "../components/NavBar";
import Search from "../pages/Search";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";

const Router = () => {
    const router = createBrowserRouter([
        { path: "/", element: <NavBar />, errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage />},
                { path:"search/:code", element: <Search /> },
                { path:"sign-up", element: <SignUp /> },
                { path:"login", element: <SignIn />},
                { path: "profile/:userName", element: <Profile />}
            ]
        }
    ])

    return <RouterProvider router={router} />;
};
 
export default Router;