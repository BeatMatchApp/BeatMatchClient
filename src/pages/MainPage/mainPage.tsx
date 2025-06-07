import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { NavBar, ContentContainer } from './styled';
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
import { Box } from '@mui/material';
import theme from '../../styles/consts';

export const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect triggered');

    const login = async () => {
      try {
        const response = await serverService.post(
          `${envConfig.BACKEND_SERVICE_URL}/login`
        );
        console.log('Login response:', response);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledMainBox>
      <NavBar sx={{ backgroundColor: 'transparent' }} position="fixed">
        <Box
          sx={{ position: 'absolute', right: '0' }}
          onClick={() => handleToggle(MenuNavigationRoutes.EDIT_PROFILE)}
        >
          <ManageAccountsIcon
            fontSize="large"
            sx={{
              marginRight: '5px',
              color: theme.palette.customColors.medium,
            }}
          />
        </Box>

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
            <LibraryMusicIcon fontSize="large" sx={{ marginRight: '5px' }} />
          </StyledNavToggleButton>
        </StyledNavToggleGroup>
      </NavBar>

      <ContentContainer>
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
      </ContentContainer>
    </StyledMainBox>
  );
};
