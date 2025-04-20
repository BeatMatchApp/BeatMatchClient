import { Box, Tooltip, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledPageTitle } from "../../components/styledComponents";
import { redirectToSpotify } from "../../services/spotifyService";
import SpotifyIcon from "../../../public/assets/spotifyIcon.png";

const RegisterSpotifyPage = () => {
  const navigate = useNavigate();

  const fetchSpotifyUser = async () => {
    redirectToSpotify();
  };

  return (
    <Box className="center" sx={{ flexDirection: "column" }}>
      <StyledPageTitle>Connect your spotify account!</StyledPageTitle>
      <Button sx={{ textTransform: "none" }} onClick={() => navigate("/login")}>
        Already Registered? Login
      </Button>
      <Box className="MenuCard">
        <Tooltip title={"Connect to Spotify"}>
          <IconButton onClick={fetchSpotifyUser} sx={{ color: "#1DB954" }}>
            <img
              src={SpotifyIcon}
              alt="Spotify"
              style={{ width: 40, height: 40 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default RegisterSpotifyPage;
