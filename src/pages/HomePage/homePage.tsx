import { Box } from "@mui/material";
import "../../App.css";
import { StyledMenuButton } from "../../components/styledComponents";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { serverService } from "../../services/httpCommon";
import { envConfig } from "../../config/config";
import { AxiosError } from "axios";
import { NavigationRoutes } from "../../models/NavigationRoutes";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      try {
        const response = await serverService.post(
          `${envConfig.BACKEND_SERVICE_URL}/login`
        );

        navigate(NavigationRoutes.USER_ACTIONS_PAGE);
        return response?.data?.user;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            navigate(NavigationRoutes.REGISTER_SPOTIFY);
          } else {
            console.error("Error logging in:", error.message);
          }
        } else {
          console.error("Error logging in:", error);
        }
      }
    };

    login();
  }, []);

  return (
    <>
      <Box className="MenuCard">
        <img
          width="300em"
          src={`/assets/logo.png`}
          loading="lazy"
          className="logoImg"
        />
        <StyledMenuButton onClick={() => navigate(NavigationRoutes.LOGIN)}>
          Login
        </StyledMenuButton>
        <StyledMenuButton
          onClick={() => navigate(NavigationRoutes.REGISTER_SPOTIFY)}>
          Register
        </StyledMenuButton>
      </Box>
    </>
  );
}

export default HomePage;
