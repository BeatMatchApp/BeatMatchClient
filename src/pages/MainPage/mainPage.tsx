import { AppBar, Typography, Container } from "@mui/material";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { CreatePlaylist } from "../../components/createPlaylist/createPlaylist";
import styled from "styled-components";

// ===== Constants =====
const NAVBAR_HEIGHT = 64;

// ===== Styled Components =====

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f9f9f9;
  overflow: hidden;
  position: relative;
`;

const NavBar = styled(AppBar)`
  background-color: white;
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  z-index: 2;
`;

const NavToggleGroup = styled.div`
  display: flex;
  gap: 16px;
  background-color: #f0f0f0;
  border-radius: 30px;
  padding: 4px;
`;

// todo: change purple to theme color
const NavToggleButton = styled.button<{ selected: boolean }>`
  all: unset;
  padding: 6px 20px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? "purple" : "transparent"};
  color: ${({ selected, theme }) => (selected ? "#fff" : "purple")};
  transition: all 0.2s ease-in-out;
  border-color: #ffffff;
`;

const ContentContainer = styled(Container).attrs(() => ({
  disableGutters: true,
  maxWidth: false,
}))`
  padding: 0;
  margin: 0;
  padding-top: ${NAVBAR_HEIGHT}px;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 1;
`;

// ===== Pages =====

function DisplayPlaylistsPage() {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold">
        Your Playlists
      </Typography>
    </div>
  );
}

// ===== Main Component =====

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
