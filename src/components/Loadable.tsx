import { ComponentType, LazyExoticComponent, Suspense } from 'react';

// project import
import Loader, { LoaderProps } from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (
  Component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>
) =>
  (props: LoaderProps) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
