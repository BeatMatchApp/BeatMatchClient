import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import '../../App.css';
import {
  StyledCardBox,
  StyledMenuButton,
  StyledPageTitle,
} from '../../components/styledComponents';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/userService';
import { toast } from 'react-toastify';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import ShinyCard from '../../components/ShinyCard/ShinyCard';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigate(NavigationRoutes.MAIN_PAGE);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Failed to login');
    }
  };

  return (
    <Box className="center fullHeight">
      <Box sx={{ width: { xs: '80vw', sm: '50vw' } }}>
        <ShinyCard colors={['#8d92f6', '#a2dfd0']}>
          <StyledPageTitle> Login </StyledPageTitle>
          <StyledCardBox sx={{ gap: '10px' }}>
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
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <StyledMenuButton
              sx={{ marginBottom: '10px' }}
              onClick={handleLogin}
            >
              Login
            </StyledMenuButton>
          </StyledCardBox>

          <Button
            sx={{ textTransform: 'none', width: '100%' }}
            onClick={() => navigate(NavigationRoutes.PROFILE_FORM)}
          >
            Dont have an account? Register now!
          </Button>
        </ShinyCard>
      </Box>
    </Box>
  );
}

export default LoginPage;
