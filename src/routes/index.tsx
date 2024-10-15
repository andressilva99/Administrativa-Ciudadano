import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import Loadable from '../components/Loadable';

import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

const NotFound = Loadable(lazy(() => import('../pages/NotFound')))

export default function Routes() {
  return useRoutes([
    MainRoutes, 
    AuthRoutes,
    {
      path: '*',
      element:  <NotFound />
    }
  ]);
}
