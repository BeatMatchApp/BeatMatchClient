import { useState } from "react";
import styled from "@emotion/styled";
import { Button, Paper, TextField, Typography } from "@mui/material";
import UserDetails from "./components/userDetails/userDetails";
import "./App.css";
import { getGeminiAnswer } from "./services/geminiService";

const StyledMenuButton = styled(Button)({
  backgroundColor: "#715cf8",
  color: "white",
  width: "12em",
  "&:hover": {
    backgroundColor: "#5a4cc8",
  },
});

function App() {
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [mood, setMood] = useState("");
  const [favoriteArtist, setFavoriteArtist] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleGetSuggestion = async () => {
    try {
      const response = await getGeminiAnswer(favoriteArtist, mood);
      setSuggestion(response.suggestion);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      alert("Failed to fetch suggestion. Please try again.");
    }
  };

  return (
    <>
      {!isUserDetailsOpen && (
        <Paper className="MenuCard">       
        <img width="300em" src={`/assets/logo.png`} loading="lazy" className="logoImg" />
          <StyledMenuButton onClick={() => setIsUserDetailsOpen(true)}>Login to spotify</StyledMenuButton>
          <TextField id="mood" label="mood" onChange={(e) => setMood(e.target.value)}/>
          <TextField id="favoriteArtist" label="favorite artist" onChange={(e) => setFavoriteArtist(e.target.value)}/>
        <StyledMenuButton onClick={handleGetSuggestion}>Get suggestion</StyledMenuButton>
        {suggestion && <Typography> {`The suggestion is ${suggestion}`}</Typography> }
        </Paper>
      )}
      {isUserDetailsOpen && <UserDetails />}
    </>
  );
}

export default App;
