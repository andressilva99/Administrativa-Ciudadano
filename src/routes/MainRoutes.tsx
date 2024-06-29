import { lazy } from 'react';
import { RouteObject } from 'react-router';

import MainLayout from '../layout/MainLayout';
import Loadable from '../components/Loadable';

const Home = Loadable(lazy(() => import('../pages/Home')));

const MainRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
  ],
};

export default MainRoutes;
