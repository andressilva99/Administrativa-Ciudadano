import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router';

import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import ProtectedRoutes from '../components/ProtectedRoutes';

const Home = Loadable(lazy(() => import('../pages/home')));
const User = Loadable(lazy(() => import('../pages/user/UserList')));
const Role = Loadable(lazy(() => import('../pages/role/RoleList')));
const Module = Loadable(lazy(() => import('../pages/module/ModuleList')));

const MainRoutes: RouteObject = {
  path: '/',
  element: <ProtectedRoutes />,
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/home" />,
        },
        {
          path: '/home',
          element: (
            <ProtectedRoutes>
              <Home />  
            </ProtectedRoutes>
          ),
        },
        {
          path: 'user',
          element: (
            <ProtectedRoutes>
              <User />  
            </ProtectedRoutes>
          ),
        },
        {
          path: 'role',
          element: (
            <ProtectedRoutes>
              <Role />  
            </ProtectedRoutes>
          ),
        },
        {
          path: 'module',
          element: (
            <ProtectedRoutes>
              <Module />  
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ],
};

export default MainRoutes;
