import { lazy } from 'react';
import { RouteObject } from 'react-router';
import Loadable from '../components/Loadable';
import AuthLayout from '../layout/AuthLayout';

const Login = Loadable(lazy(() => import('../pages/auth/AuthLogin')));

const AuthRoutes: RouteObject = {
  path: '/auth',
  children: [
    {
      path: '',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <Login />
        }
      ]
    }
  ]
};

export default AuthRoutes;
