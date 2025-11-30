import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export const AnonymousRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
};