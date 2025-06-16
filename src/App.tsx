import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/loginPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RegisterSpotifyPage from './pages/RegisterSpotifyPage/RegisterSpotifyPage';
import { NavigationRoutes } from './models/NavigationRoutes';
import { ToastContainer } from 'react-toastify';
import { MainPage } from './pages/MainPage/mainPage';
import ProfileForm from './pages/ProfileForm/profileForm';
import { ThemeProvider } from '@mui/material';
import theme from './styles/consts';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const setVisibleScreenHeight = () => {
      const vh: number = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVisibleScreenHeight();

    window.addEventListener('resize', setVisibleScreenHeight);

    return () => {
      window.removeEventListener('resize', setVisibleScreenHeight);
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <>
              <Routes>
                <Route path={NavigationRoutes.HOME} element={<MainPage />} />
                <Route path={NavigationRoutes.LOGIN} element={<LoginPage />} />
                <Route
                  path={NavigationRoutes.REGISTER_SPOTIFY}
                  element={<RegisterSpotifyPage />}
                />
                <Route
                  path={NavigationRoutes.PROFILE_FORM}
                  element={<ProfileForm />}
                />
                <Route
                  path={NavigationRoutes.MAIN_PAGE + '/*'}
                  element={<MainPage />}
                />
                <Route
                  path="*"
                  element={<Navigate to={NavigationRoutes.HOME} replace />}
                />
              </Routes>
              <ToastContainer position="bottom-center" />
            </>
          </Router>
        </Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
