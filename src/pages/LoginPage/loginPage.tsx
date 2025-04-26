import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import "../../App.css";
import {
  StyledMenuButton,
  StyledPageTitle,
} from "../../components/styledComponents";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { NavigationRoutes } from "../../models/NavigationRoutes";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigate(NavigationRoutes.USER_ACTIONS_PAGE);
    } catch {
      toast.error("Failed to login");
    }
  };

  return (
    <Box className="center" sx={{ flexDirection: "column" }}>
      <StyledPageTitle> Login </StyledPageTitle>
      <Button
        sx={{ textTransform: "none" }}
        onClick={() => navigate(NavigationRoutes.REGISTER)}>
        Dont have an account? Register now!
      </Button>
      <Box className="MenuCard">
        <TextField
          id="email"
          label="email"
          error={!!emailError}
          helperText={emailError}
          onChange={(e) => {
            const email = e.target.value;
            setEmail(email);
            validateEmail(email);
          }}
        />
        <TextField
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledMenuButton onClick={handleLogin}>Login</StyledMenuButton>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default LoginPage;
