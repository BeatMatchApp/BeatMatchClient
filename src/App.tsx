import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/homePage";
import LoginPage from "./pages/LoginPage/loginPage";
import UserDetails from "./components/userDetails/userDetails";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RegisterSpotifyPage from "./pages/RegisterSpotifyPage/RegisterSpotifyPage";
import { NavigationRoutes } from "./models/NavigationRoutes";
import { ToastContainer } from "react-toastify";
import ProfileForm from "./pages/ProfileForm/profileForm";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/consts";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <>
              <Routes>
                <Route path={NavigationRoutes.HOME} element={<HomePage />} />
                <Route path={NavigationRoutes.LOGIN} element={<LoginPage />} />
                <Route
                  path={NavigationRoutes.REGISTER_SPOTIFY}
                  element={<RegisterSpotifyPage />}
                />
                <Route
                  path={NavigationRoutes.USER_ACTIONS_PAGE}
                  element={<UserDetails />}
                />
                <Route
                  path={NavigationRoutes.PROFILE_FORM}
                  element={<ProfileForm />}
                />
              </Routes>
              <ToastContainer />
            </>
          </Router>
        </Provider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
