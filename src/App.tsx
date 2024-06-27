import { RouterProvider } from 'react-router-dom';

import router from './routes';
import ThemeCustomization from './themes';

function App() {
  return (
    <ThemeCustomization>
      <RouterProvider router={router} />
    </ThemeCustomization>
  );
}

export default App;
