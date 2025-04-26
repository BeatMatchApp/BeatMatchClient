import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/homePage";
import LoginPage from "./pages/LoginPage/loginPage";
import RegisterPage from "./pages/RegisterPage/registerPage";
import UserDetails from "./components/userDetails/userDetails";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RegisterSpotifyPage from "./pages/RegisterSpotifyPage/RegisterSpotifyPage";
import { NavigationRoutes } from "./models/NavigationRoutes";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path={NavigationRoutes.HOME} element={<HomePage />} />
            <Route path={NavigationRoutes.LOGIN} element={<LoginPage />} />
            <Route
              path={NavigationRoutes.REGISTER}
              element={<RegisterPage />}
            />
            <Route
              path={NavigationRoutes.REGISTER_SPOTIFY}
              element={<RegisterSpotifyPage />}
            />
            <Route
              path={NavigationRoutes.USER_ACTIONS_PAGE}
              element={<UserDetails />}
            />
          </Routes>
        </Router>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
