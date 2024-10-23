import Locales from './components/Locales';
import RTLLayout from './components/RTLLayout';
import ScrollTop from './components/ScrollTop';
import Routes from './routes';
import ThemeCustomization from './themes';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas, far);
 
function App() {
  return (
    <ThemeCustomization>
      <RTLLayout>
        <Locales>
          <ScrollTop>
            <Routes />
          </ScrollTop>
        </Locales>
      </RTLLayout>
    </ThemeCustomization>
  );
}

export default App;
