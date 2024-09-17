import React, { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

interface ProtectedRouteProps {
    children?: ReactNode;
    requiredPermission?: string;
}


const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children, requiredPermission }) => {
    const location = useLocation();

    const accessToken = window.localStorage.getItem('access_token');

    const isAuthenticated = !!accessToken;

    let userPermissions: string[] = [];

    if(!isAuthenticated && location.pathname !== '/auth/login') {
        return <Navigate to="/auth/login" replace />;
    }

    if(isAuthenticated && location.pathname === '/auth/login') {
        return <Navigate to="/home" replace />;
    }

    if (requiredPermission && !userPermissions.includes(requiredPermission)) {
        return <Navigate to="/home" replace />;
    }

    return children ? <> {children} </> : <Outlet />;
};

export default ProtectedRoutes