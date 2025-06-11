import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  StyledMenuButton,
  StyledPageTitle,
} from '../../components/styledComponents';
import { DatePicker } from '@mui/x-date-pickers';
import { register } from '../../services/userService';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import {
  validateBirthDate,
  validateEmail,
  validateName,
} from '../../shared/fieldValidations';
import { formatDate } from '../../shared/dateFormatter';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface Props {
  handleNextStep: () => void;
}

interface Errors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

const RegisterPage: React.FC<Props> = ({ handleNextStep }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: null as Date | null,
  });

  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== newUser.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const validatePassword = (password: string) => {
    if (password.length <= 5) {
      setErrors((prev) => ({
        ...prev,
        password: 'Must be at least 5 characters',
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const disableContinue = () => {
    if (Object.values(newUser).some((value) => value === '')) return true;
    if (Object.values(errors).some((erorr) => erorr !== '')) return true;
    return false;
  };

  const handleContinue = async () => {
    if (disableContinue()) return;

    try {
      if (newUser.birthDate) {
        await register({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          birthDate: formatDate(newUser.birthDate),
        });

        toast.success(
          'Congratulations! we are exited to find out all about your music taste :)'
        );
        handleNextStep();
      } else {
        toast.info("Birth date can't be empty.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message.includes('User already exists.')) {
          toast.error('User already exists. Please login.');
        } else {
          toast.error('Failed to register user');
        }
      }
    }
  };

  return (
    <Box className="center" sx={{ flexDirection: 'column' }}>
      <StyledPageTitle>Create new account</StyledPageTitle>
      <Button
        sx={{ textTransform: 'none' }}
        onClick={() => navigate(NavigationRoutes.LOGIN)}
      >
        Already Registered? Login
      </Button>
      <Box className="MenuCard">
        <TextField
          id="name"
          label="Name"
          error={!!errors.name}
          helperText={errors.name}
          onChange={(e) => {
            const name = e.target.value;
            setNewUser((prevState) => ({ ...prevState, name }));
            validateName(name, setErrors);
          }}
        />
        <DatePicker
          label="Date of birth"
          format="dd/MM/yyyy"
          value={newUser.birthDate}
          disableFuture
          onChange={(newDate) => {
            setNewUser((prevState) => ({ ...prevState, birthDate: newDate }));
            validateBirthDate<Errors>(newDate, setErrors);
          }}
          slotProps={{
            textField: {
              error: !!errors.birthDate,
              helperText: errors.birthDate,
            },
          }}
        />
        <TextField
          id="email"
          label="Email"
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => {
            const email = e.target.value;
            setNewUser((prevState) => ({ ...prevState, email }));
            validateEmail<Errors>(email, setErrors);
          }}
        />
        <TextField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ outline: 'none' }}
          onChange={(e) => {
            const password = e.target.value;
            setNewUser((prevState) => ({ ...prevState, password }));
            validatePassword(password);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="confirmPassword"
          label="Confirm password"
          type={showConfirmPassword ? 'text' : 'password'}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          onChange={(e) => {
            const confirmPassword = e.target.value;
            setNewUser((prevState) => ({ ...prevState, confirmPassword }));
            validateConfirmPassword(confirmPassword);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <StyledMenuButton
        sx={{ marginTop: '3vh' }}
        disabled={disableContinue()}
        onClick={handleContinue}
      >
        {`Let's start!`}
      </StyledMenuButton>
    </Box>
  );
};

export default RegisterPage;
