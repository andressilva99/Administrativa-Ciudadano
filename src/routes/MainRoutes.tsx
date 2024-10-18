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
const PenaltyNew = Loadable(lazy(() => import('../pages/penalty/PenaltyNew')));
const PenaltyEdit = Loadable(lazy(() => import('../pages/penalty/PenaltyEdit')));
const PenaltyType = Loadable(lazy (() => import('../pages/penaltyType')));
const PenaltyTypeNew = Loadable(lazy (() => import('../pages/penaltyType/PenaltyTypeNew')));
const PenaltyTypeEdit = Loadable(lazy (() => import('../pages/penaltyType/PenaltyTypeEdit')));
const Bicis = Loadable(lazy(() => import('../pages/bicis')));
const Estacion = Loadable(lazy(() => import('../pages/station')));
const EstacionUsuario = Loadable(lazy(() => import('../pages/stationUser')));
const EstacionUsuarioAdd = Loadable(lazy(() => import('../pages/stationUser/UserStationAdd')));
const EstacionUsuarioEdit = Loadable(lazy(() => import('../pages/stationUser/UserStationEdit')));

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
      path: 'penalty/new',
      element: (
        <ProtectedRoutes requiredPermission="PENALTY_ADD">
          <PenaltyNew />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'penalty/edit/:id',
      element: (
        <ProtectedRoutes requiredPermission="PENALTY_EDIT">
          <PenaltyEdit />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'penaltyType',
      element: (
        <ProtectedRoutes requiredPermission="PENALTY_TYPE_VIEW_N">
          <PenaltyType />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'penaltyType/new',
      element: (
        <ProtectedRoutes requiredPermission="PENALTY_TYPE_ADD">
          <PenaltyTypeNew />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'penaltyType/edit/:id',
      element: (
        <ProtectedRoutes requiredPermission="PENALTY_TYPE_EDIT">
          <PenaltyTypeEdit />
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
    {
      path: 'station',
      element: (
        <ProtectedRoutes requiredPermission="STATION_VIEW_N">
          <Estacion />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'stationUser',
      element: (
        <ProtectedRoutes requiredPermission="STATION_VIEW_N">
          <EstacionUsuario />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'stationUser/add/:id',
      element: (
        <ProtectedRoutes requiredPermission="ADMUSER_STATION_ASSIGN">
          <EstacionUsuarioAdd />
        </ProtectedRoutes>
      ),
    },
    {
      path: 'stationUser/edit/:id',
      element: (
        <ProtectedRoutes requiredPermission="ADMUSER_STATION_ASSIGN">
          <EstacionUsuarioEdit />
        </ProtectedRoutes>
      ),
    },
  ],
};

export default MainRoutes;
