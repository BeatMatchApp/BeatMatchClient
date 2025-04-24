import { Box } from "@mui/material";
import "../../App.css";
import { StyledMenuButton } from "../../components/styledComponents";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      const response = await serverService.post(
        `${envConfig.BACKEND_SERVICE_URL}/user/login`,
        { userDetails: loginUserDetails }
      );

      return response;
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
        <StyledMenuButton onClick={() => navigate("/login")}>
          Login
        </StyledMenuButton>
        <StyledMenuButton onClick={() => navigate("/register/spotify")}>
          Register
        </StyledMenuButton>
      </Box>
    </>
  );
}

export default HomePage;
