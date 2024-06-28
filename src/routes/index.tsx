import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import Loadable from '../components/Loadable';

const Home = Loadable(lazy(() => import('../pages/Home')));

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Home />
        }
      ]
    }
  ]);
}
