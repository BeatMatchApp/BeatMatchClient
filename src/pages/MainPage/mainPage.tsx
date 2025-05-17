import { Typography } from "@mui/material";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import {
  MainWrapper,
  NavBar,
  NavToggleGroup,
  NavToggleButton,
  ContentContainer,
} from "./styled";
import { MenuNavigationRoutes } from "./mainPage.model";
import { NavigationRoutes } from "../../models/NavigationRoutes";
import CreatePlaylistPage from "../createPlaylistPage/createPlaylistPage";

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
    <MainWrapper>
      <NavBar position="fixed">
        <NavToggleGroup>
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
        </NavToggleGroup>
      </NavBar>

      <ContentContainer>
        <Routes>
          <Route path="/" element={<CreatePlaylistPage />} />
          <Route path="/create" element={<CreatePlaylistPage />} />
          <Route path="/library" element={<DisplayPlaylistsPage />} />
        </Routes>
      </ContentContainer>
    </MainWrapper>
  );
};
