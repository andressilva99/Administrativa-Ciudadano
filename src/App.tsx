import Locales from './components/Locales';
import RTLLayout from './components/RTLLayout';
import ScrollTop from './components/ScrollTop';
import Routes from './routes';
import ThemeCustomization from './themes';

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
