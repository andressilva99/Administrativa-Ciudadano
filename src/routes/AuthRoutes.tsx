import { lazy } from 'react';
import { RouteObject } from 'react-router';
import Loadable from '../components/Loadable';
import AuthLayout from '../layout/AuthLayout';
import ProtectedRoutes from './ProtectedRoutes';

const Login = Loadable(lazy(() => import('../pages/auth/AuthLogin')));

const AuthRoutes: RouteObject = {
  path: '/auth',
  element: (
    <ProtectedRoutes>
      <AuthLayout />,
    </ProtectedRoutes>
  ),
  children: [
    {
      path: 'login',
      element: <Login />,
    },
  ],
};

export default AuthRoutes;
