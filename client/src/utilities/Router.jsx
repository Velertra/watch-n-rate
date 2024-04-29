import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute"
import ErrorPage from "../pages/ErrorPage";
import NavBar from "../components/NavBar";
import Search from "../pages/Search";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import Feature from "../pages/Feature";
import NewTest from "../pages/NewTest";
import newTest from "../pages/NewTest";

const Router = () => {
    const router = createBrowserRouter([
        { path: "/", element: <NavBar />, errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage />},
                { path:"search/:code", element: <Search /> },
                { path:"sign-up", element: <SignUp /> },
                { path:"login", element: <SignIn />},
                { path: "feature/:content", element: < Feature/> },
                { path: "profile/:userName", element:<Profile />},
                /* set up protected routes, use "NewTest" as a page */
                
                /* { element: <ProtectedRoute />,
                children: [
                    { path: "profile/:userName", element:<Profile />, ProtectedRoute},
                    { path: "newtest", element:<NewTest />}
                ]
            } */
            ]
        }
    ])

    return <RouterProvider router={router} />;
};
 
export default Router;