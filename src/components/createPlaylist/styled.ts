import { TextField, Button, Typography } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #fff;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  max-width: 450px;
  padding: 1.5vh;
  box-sizing: border-box;
`;

export const FieldWrapper = styled.div`
  width: 100%;
`;

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
