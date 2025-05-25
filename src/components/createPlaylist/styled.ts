import { TextField, Button, Typography } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)`
  background: white;

  & .MuiOutlinedInput-root {
    border-radius: 12px;
    background: #fafafa;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-radius: 12px;
  }
`;

export const ContinueButton = styled(Button)`
  margin-top: 32px;
  font-weight: bold;
  color: white;
  text-transform: none;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 250px;
`;

export const Title = styled(Typography)`
  margin: 10px 0 !important;
  font-size: 6vh !important;
  font-weight: bold !important;
`;
