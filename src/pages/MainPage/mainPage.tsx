import { Typography } from '@mui/material';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { CreatePlaylist } from '../../components/createPlaylist/createPlaylist';
import { NavBar, NavToggleButton, ContentContainer } from './styled';
import { MenuNavigationRoutes } from '../../models/MenuNavigationRoutes';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import './mainPage.css';
import { AccountCircle } from '@mui/icons-material';
import EditProfileForm from '../EditProfile/editProfile';

// todo: replace with actual component
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

  const currentPath = location.pathname;

  const isCreate =
    currentPath.endsWith(MenuNavigationRoutes.CREATE) ||
    currentPath === NavigationRoutes.MAIN_PAGE;

  const isPlaylists = currentPath.endsWith(MenuNavigationRoutes.LIBRARY);

  const handleToggle = (target: MenuNavigationRoutes) => {
    navigate(`${NavigationRoutes.MAIN_PAGE}${target}`);
  };

  return (
    <div className="main-wrapper">
      <NavBar>
        <div
          className="profile-icon"
          onClick={() => handleToggle(MenuNavigationRoutes.EDIT_PROFILE)}
        >
          <AccountCircle fontSize="large" />
        </div>
        <div className="nav-toggle-group">
          <NavToggleButton
            selected={isCreate}
            onClick={() => handleToggle(MenuNavigationRoutes.CREATE)}
          >
            Create
          </NavToggleButton>

          <NavToggleButton
            selected={isPlaylists}
            onClick={() => handleToggle(MenuNavigationRoutes.LIBRARY)}
          >
            Library
          </NavToggleButton>
        </div>
      </NavBar>

      <ContentContainer>
        <Routes>
          <Route path="/" element={<CreatePlaylist />} />
          <Route
            path={MenuNavigationRoutes.CREATE}
            element={<CreatePlaylist />}
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
    </div>
  );
};
