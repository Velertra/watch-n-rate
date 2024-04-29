import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ path, element }) => {
    const user = localStorage.getItem('user');

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Route path={path} element={element} />;
};

export default ProtectedRoute;