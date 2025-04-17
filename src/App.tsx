import { useState } from "react";
import { Box } from "@mui/material";
import UserDetails from "./components/userDetails/userDetails";
import "./App.css";
import { StyledMenuButton } from "./components/styledComponents";

function App() {
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  return (
    <>
      {!isUserDetailsOpen && (
        <Box className="MenuCard">       
        <img width="300em" src={`/assets/logo.png`} loading="lazy" className="logoImg" />
          <StyledMenuButton onClick={() => setIsUserDetailsOpen(true)}>Login to spotify</StyledMenuButton>
        </Box>
      )}
      {isUserDetailsOpen && <UserDetails />}
    </>
  );
}

export default App;
