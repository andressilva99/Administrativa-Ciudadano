import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router';

import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import ProtectedRoutes from './ProtectedRoutes';

const Home = Loadable(lazy(() => import('../pages/home')));
const User = Loadable(lazy(() => import('../pages/user/UserList')));
const Role = Loadable(lazy(() => import('../pages/role/RoleList')));
const Module = Loadable(lazy(() => import('../pages/module/ModuleList')));
const Penalty = Loadable(lazy(() => import('../pages/penalty')));
const Bicis = Loadable(lazy(() => import('../pages/bicis')));

const MainRoutes: RouteObject = {
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
      element: (
        <ProtectedRoutes requiredPermission="ADMUSER_VIEW_N">
          <User />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'role',
      element: (
        <ProtectedRoutes requiredPermission="ADMROLE_VIEW_N">
          <Role />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'module',
      element: (
        <ProtectedRoutes requiredPermission="MODULE_VIEW_N">
          <Module />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'penalty',
      element: (
        <ProtectedRoutes requiredPermission="PENALTY_VIEW_N">
          <Penalty />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'bicis',
      element: (
        <ProtectedRoutes requiredPermission="PENALTY_VIEW_N">
          <Bicis />
        </ProtectedRoutes>
      ),
    },
  ],
};

export default MainRoutes;
