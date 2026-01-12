
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const ProtectedRoute = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    if (userInfo) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
