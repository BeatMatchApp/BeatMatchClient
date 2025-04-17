import { Box } from "@mui/material";
import "../../App.css";
import { StyledMenuButton } from "../../components/styledComponents";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Box className="MenuCard">
        <img width="300em" src={`/assets/logo.png`} loading="lazy" className="logoImg" />
        <StyledMenuButton onClick={() => navigate('/login')}>Login</StyledMenuButton>
        <StyledMenuButton onClick={() => navigate('/register')}>Register</StyledMenuButton>
      </Box>
    </>
  );
}

export default HomePage;

