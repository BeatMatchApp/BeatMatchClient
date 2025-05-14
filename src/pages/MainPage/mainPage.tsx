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
  const isCreate = currentPath.endsWith("/create") || currentPath === "/main";

  const handleToggle = (target: "create" | "library") => {
    navigate(`/main/${target}`);
  };

  return (
    <MainWrapper>
      <NavBar position="fixed">
        <NavToggleGroup>
          <NavToggleButton
            selected={isCreate}
            onClick={() => handleToggle("create")}>
            Create
          </NavToggleButton>

          <NavToggleButton
            selected={!isCreate}
            onClick={() => handleToggle("library")}>
            Library
          </NavToggleButton>
        </NavToggleGroup>
      </NavBar>

      <ContentContainer>
        <Routes>
          <Route path="/" element={<CreatePlaylist />} />
          <Route path="/create" element={<CreatePlaylist />} />
          <Route path="/library" element={<DisplayPlaylistsPage />} />
        </Routes>
      </ContentContainer>
    </MainWrapper>
  );
};
