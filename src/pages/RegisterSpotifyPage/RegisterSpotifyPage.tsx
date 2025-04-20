import { Box, Tooltip, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  StyledMenuButton,
  StyledPageTitle,
} from "../../components/styledComponents";
import { redirectToSpotify } from "../../services/spotifyService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SpotifyIcon from "../../../public/assets/spotifyIcon.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";

const RegisterSpotifyPage = () => {
  const spotifyInfo = useSelector((state: RootState) => state.spotifyUser);
  const navigate = useNavigate();

  const fetchSpotifyUser = async () => {
    // const params = new URLSearchParams(window.location.search);
    // const token = params.get("accessToken");
    redirectToSpotify();
  };

  return (
    <Box className="center" sx={{ flexDirection: "column" }}>
      <StyledPageTitle>Connect your spotify account!</StyledPageTitle>
      <Button sx={{ textTransform: "none" }} onClick={() => navigate("/login")}>
        Already Registered? Login
      </Button>
      <Box className="MenuCard">
        <Tooltip title={spotifyInfo.user ? "" : "Connect to Spotify"}>
          <IconButton
            onClick={fetchSpotifyUser}
            sx={{ color: spotifyInfo.user ? green[500] : "#1DB954" }}
            disabled={!!spotifyInfo.user} // Disable button once done
          >
            {spotifyInfo.user ? (
              <CheckCircleIcon style={{ width: 40, height: 40 }} />
            ) : (
              <img
                src={SpotifyIcon}
                alt="Spotify"
                style={{ width: 40, height: 40 }}
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <StyledMenuButton
        disabled={!spotifyInfo.user}
        onClick={() => navigate("/register")}>
        Continue
      </StyledMenuButton>
    </Box>
  );
};

export default RegisterSpotifyPage;
