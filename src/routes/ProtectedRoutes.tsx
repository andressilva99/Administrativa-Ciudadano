import React, { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUserPermissions, selectUserRoot } from '../store/reducers/slices/userSlice';

interface ProtectedRouteProps {
  requiredPermission?: string;
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ requiredPermission, children }) => {
  const location = useLocation();
  const moduleList = useSelector(selectUserPermissions) || [];
  const isRoot = useSelector(selectUserRoot);
  const isAuthenticated = !!window.localStorage.getItem('access_token');

  if (!isAuthenticated && location.pathname !== '/auth/login') {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && location.pathname === '/auth/login') {
    return <Navigate to="/home" replace />;
  }

  if (requiredPermission && !moduleList.includes(requiredPermission) && !isRoot) {
    return <Navigate to="/home" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
