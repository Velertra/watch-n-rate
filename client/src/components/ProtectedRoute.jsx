import { Navigate, Outlet, Route } from "react-router-dom";
import UseAuthUser from "./AuthUser";

const ProtectedRoute = async ({ component, ...rest }) => {
  let {user, loading} = UseAuthUser();
  
/* 
  if(AuthUser){
    return user ? <Outlet /> : <Navigate to={"/login"}/>
  } */
 
  if (loading) {
    // Render a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <AppLayout>
      render={(props) =>
        false ? (
          <component {...props} />
        ) : (
          <Navigate to="/Login" />
        )
      }
    </AppLayout>
  )

};

export default ProtectedRoute;

/*   return (
    <>
    <Route
      {...rest}
      element={(props) =>
        true ? (
          <Component {...props} />
        ) : (
          <Navigate to="/Login" />
        )
      }
    />
    </>
  )
 */