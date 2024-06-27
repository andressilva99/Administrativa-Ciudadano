import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));

const MainRoutes = {
  path: '/',
  element: <Home />
};

export default MainRoutes;
