import { Typography } from '@mui/material';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { NavBar, ContentContainer } from './styled';
import { MenuNavigationRoutes } from '../../models/MenuNavigationRoutes';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import { StyledNavToggleButton, StyledNavToggleGroup } from '../../components/styledComponents';
import { useEffect, useState } from 'react';
import { serverService } from '../../services/httpCommon';
import { envConfig } from '../../config/config';
import { AxiosError } from 'axios';
import Loader from '../../components/Loader/Loader';
import CreatePlaylistPage from '../createPlaylistPage/createPlaylistPage';
import EditProfileForm from '../EditProfile/editProfile';
import { AccountCircle } from '@mui/icons-material';
import { StyledMainBox } from '../styledPages';

function DisplayPlaylistsPage() {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold">
        Your Playlists
      </Typography>
    </div>
  );
}


export const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  console.log("useEffect triggered");
  
  const login = async () => {
    try {
      const response = await serverService.post(
        `${envConfig.BACKEND_SERVICE_URL}/login`
      );
      console.log("Login response:", response);  // Check what response you're getting

      if (response?.data?.user) {
        navigate(NavigationRoutes.MAIN_PAGE);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error logging in:", error.message);
      } else {
        console.error("Error logging in:", error);
      }
      setIsLoading(false);
    }
  };

  login();
}, []);  // Empty dependency array, should only run once


  const currentPath = location.pathname;

  const isCreate =
    currentPath.endsWith(MenuNavigationRoutes.CREATE) ||
    currentPath === NavigationRoutes.MAIN_PAGE;

  const isPlaylists = currentPath.endsWith(MenuNavigationRoutes.LIBRARY);

  const handleToggle = (target: MenuNavigationRoutes) => {
    navigate(`${NavigationRoutes.MAIN_PAGE}${target}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledMainBox>
      <NavBar sx={{ backgroundColor: 'transparent' }} position="fixed">
        <StyledNavToggleGroup>
          <StyledNavToggleButton
            selected={isCreate}
            sx={{ display: 'flex', alignItems: 'center'}}
            onClick={() => handleToggle(MenuNavigationRoutes.CREATE)}
          >
            Create
            <AccountCircle fontSize="large" sx={{ marginRight: '10px'}}/>
          </StyledNavToggleButton>

          <StyledNavToggleButton
            selected={isPlaylists}
            onClick={() => handleToggle(MenuNavigationRoutes.LIBRARY)}
          >
            Library
          </StyledNavToggleButton>
        </StyledNavToggleGroup>
      </NavBar>

      <ContentContainer>
        <Routes>
          <Route path="/" element={<CreatePlaylistPage  />} />
          <Route
            path={MenuNavigationRoutes.CREATE}
            element={<CreatePlaylistPage  />}
          />
          <Route
            path={MenuNavigationRoutes.LIBRARY}
            element={<DisplayPlaylistsPage />}
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
