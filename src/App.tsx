import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/homePage';
import LoginPage from './pages/LoginPage/loginPage';
import RegisterPage from './pages/RegisterPage/registerPage';
import UserDetails from './components/userDetails/userDetails';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}> 
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/details" element={<UserDetails />} />
          </Routes>
        </Router>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
