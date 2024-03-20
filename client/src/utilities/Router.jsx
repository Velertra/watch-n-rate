import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import NavBar from "../components/NavBar";
import Search from "../pages/Search";
import HomePage from "../pages/HomePage";

const Router = () => {
    const router = createBrowserRouter([
        { path: "/", element: <NavBar />, errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage />},
                { path:"search/:code", element: <Search /> }
            ]
        }
    ])

    return <RouterProvider router={router} />;
};
 
export default Router;