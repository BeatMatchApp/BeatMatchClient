import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  StyledMenuButton,
  StyledPageTitle,
} from "../../components/styledComponents";
import { DatePicker } from "@mui/x-date-pickers";
import { register } from "../../services/userService";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: null as Date | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  const validateName = (name: string) => {
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const validateBirthDate = (birthDate: Date | null) => {
    const today = new Date();

    if (!birthDate) {
      setErrors((prev) => ({
        ...prev,
        birthDate: "Your birthday date is required",
      }));
    } else if (birthDate >= today) {
      setErrors((prev) => ({
        ...prev,
        birthDate: "Your birthday date cannot be in the future",
      }));
    } else {
      setErrors((prev) => ({ ...prev, birthDate: "" }));
    }
  };

  const validatePassword = (confirmPassword: string) => {
    if (confirmPassword !== newUser.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const disableContinue = () => {
    if (Object.values(newUser).some((value) => value === "")) return true;
    if (Object.values(errors).some((erorr) => erorr !== "")) return true;
    return false;
  };

  const handleContinue = async () => {
    if (disableContinue()) return;

    const registerResponse = await register({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      birthDate: newUser.birthDate!,
    });

    if (registerResponse.status === 201) {
      navigate("/details");
    } else {
      toast.error("Failed to register user");
      console.error("Registration error:", registerResponse);
    }
  };

  return (
    <Box className="center" sx={{ flexDirection: "column" }}>
      <StyledPageTitle>Create new account</StyledPageTitle>
      <Button sx={{ textTransform: "none" }} onClick={() => navigate("/login")}>
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
            validateName(name);
          }}
        />
        <DatePicker
          label="Date of birth"
          value={newUser.birthDate}
          onChange={(newDate) => {
            setNewUser((prevState) => ({ ...prevState, birthDate: newDate }));
            validateBirthDate(newDate);
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
            validateEmail(email);
          }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) => {
            const password = e.target.value;
            setNewUser((prevState) => ({ ...prevState, password }));
          }}
        />
        <TextField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          onChange={(e) => {
            const confirmPassword = e.target.value;
            setNewUser((prevState) => ({ ...prevState, confirmPassword }));
            validatePassword(confirmPassword);
          }}
        />
      </Box>
      <StyledMenuButton disabled={disableContinue()} onClick={handleContinue}>
        Continue
      </StyledMenuButton>
    </Box>
  );
};

export default RegisterPage;
