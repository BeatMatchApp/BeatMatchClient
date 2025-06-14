import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { NavBar } from './styled';
import { MenuNavigationRoutes } from '../../models/MenuNavigationRoutes';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import {
  StyledMainBox,
  StyledNavToggleButton,
  StyledNavToggleGroup,
} from '../../components/styledComponents';
import { useEffect, useState } from 'react';
import { serverService } from '../../services/httpCommon';
import { envConfig } from '../../config/config';
import { AxiosError } from 'axios';
import Loader from '../../components/Loader/Loader';
import CreatePlaylistPage from '../createPlaylistPage/createPlaylistPage';
import LibraryPage from '../LibraryPage/LibraryPage';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import EditProfileForm from '../EditProfile/editProfile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Container, Grid, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from '../../styles/consts';
import { logout } from '../../services/userService';

export const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await serverService.post(
          `${envConfig.BACKEND_SERVICE_URL}/login`
        );

        if (response?.data?.user) {
          navigate(NavigationRoutes.MAIN_PAGE);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Error logging in:', error.message);
        } else {
          console.error('Error logging in:', error);
        }
        setIsLoading(false);
      }
    };

    login();
  }, []);

  const currentPath = location.pathname;

  const isCreate = currentPath.endsWith(MenuNavigationRoutes.CREATE);

  const isPlaylists =
    currentPath.endsWith(MenuNavigationRoutes.LIBRARY) ||
    currentPath === NavigationRoutes.MAIN_PAGE;

  const handleToggle = (target: MenuNavigationRoutes) => {
    navigate(`${NavigationRoutes.MAIN_PAGE}${target}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(NavigationRoutes.REGISTER_SPOTIFY);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={1}>
      <StyledMainBox className="full-page">
        <Grid sx={{ padding: '10px' }}>
          <NavBar sx={{ backgroundColor: 'transparent' }} position="fixed">
            <IconButton
              sx={{ position: 'absolute', left: '0' }}
              onClick={() => handleToggle(MenuNavigationRoutes.EDIT_PROFILE)}
            >
              <ManageAccountsIcon
                fontSize="large"
                sx={{
                  color: theme.palette.customColors.medium,
                }}
              />
            </IconButton>

            <StyledNavToggleGroup>
              <StyledNavToggleButton
                selected={isCreate}
                sx={{ display: 'flex', alignItems: 'center' }}
                onClick={() => handleToggle(MenuNavigationRoutes.CREATE)}
              >
                Create
                <AddCircleOutlineIcon
                  fontSize="large"
                  sx={{ marginRight: '5px' }}
                />
              </StyledNavToggleButton>

              <StyledNavToggleButton
                selected={isPlaylists}
                sx={{ display: 'flex', alignItems: 'center' }}
                onClick={() => handleToggle(MenuNavigationRoutes.LIBRARY)}
              >
                Library
                <LibraryMusicIcon
                  fontSize="large"
                  sx={{ marginRight: '5px' }}
                />
              </StyledNavToggleButton>
            </StyledNavToggleGroup>

            <IconButton
              sx={{ position: 'absolute', right: '0' }}
              onClick={handleLogout}
            >
              <LogoutIcon
                fontSize="large"
                sx={{
                  color: theme.palette.customColors.medium,
                }}
              />
            </IconButton>
          </NavBar>
        </Grid>
        <Grid size="grow" sx={{ overflow: 'auto', height: '100%' }}>
          <Container sx={{ height: '100%', padding: '5px' }}>
            <Routes>
              <Route path="/" element={<LibraryPage />} />
              <Route
                path={MenuNavigationRoutes.CREATE}
                element={<CreatePlaylistPage />}
              />
              <Route
                path={MenuNavigationRoutes.LIBRARY}
                element={<LibraryPage />}
              />
              <Route
                path={MenuNavigationRoutes.EDIT_PROFILE}
                element={<EditProfileForm />}
              />
            </Routes>
          </Container>
        </Grid>
      </StyledMainBox>
    </Grid>
  );
};
