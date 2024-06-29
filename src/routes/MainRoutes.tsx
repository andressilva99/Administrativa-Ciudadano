import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router';

import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

const Home = Loadable(lazy(() => import('../pages/Home')));
const User = Loadable(lazy(() => import('../pages/user/UserList')));
const Role = Loadable(lazy(() => import('../pages/role/RoleList')));
const Module = Loadable(lazy(() => import('../pages/module/ModuleList')));

const MainRoutes: RouteObject = {
  path: '/',
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
          element: <Home />,
        },
        {
          path: 'user',
          element: <User />,
        },
        {
          path: 'role',
          element: <Role />,
        },
        {
          path: 'module',
          element: <Module />,
        },
      ],
    },
  ],
};

export default MainRoutes;
