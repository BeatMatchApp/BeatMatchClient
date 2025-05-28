import { Typography } from "@mui/material";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { CreatePlaylist } from "../../components/createPlaylist/createPlaylist";
import {
  MainWrapper,
  NavBar,
  NavToggleGroup,
  NavToggleButton,
  ContentContainer,
} from "./styled";
import { MenuNavigationRoutes } from "../../models/MenuNavigationRoutes";
import { NavigationRoutes } from "../../models/NavigationRoutes";
import "./mainPage.css";

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

  const handleToggle = (target: MenuNavigationRoutes) => {
    navigate(`${NavigationRoutes.MAIN_PAGE}${target}`);
  };

  return (
    <div className="main-wrapper">
      <NavBar position="fixed">
        <div className="nav-toggle-group">
          <NavToggleButton
            selected={isCreate}
            onClick={() => handleToggle(MenuNavigationRoutes.CREATE)}>
            Create
          </NavToggleButton>

          <NavToggleButton
            selected={!isCreate}
            onClick={() => handleToggle(MenuNavigationRoutes.LIBRARY)}>
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
        </Routes>
      </ContentContainer>
    </div>
  );
};
