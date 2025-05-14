import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { ScrollableSelector } from "../scrollableSelector/scrollableSelector";
import styled from "styled-components";

const Wrapper = styled.div`
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

const ContentContainer = styled.div`
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

const FieldWrapper = styled.div`
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  background: white;
  border-radius: 8px;
`;

const ContinueButton = styled(Button)`
  margin-top: 32px;
  font-weight: bold;
  color: white;
  text-transform: none;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 250px;
`;

const Title = styled(Typography)`
  margin: 10px 0 !important;
  font-size: 6vh !important;
  font-weight: bold !important;
`;

export const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [event, setEvent] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validatePlaylistName = (name: string): boolean => {
    const isValid = name.trim().length > 0 && name.length <= 100;
    return isValid;
  };

  const handlePlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPlaylistName(value);
    setError(
      validatePlaylistName(value)
        ? null
        : "Enter a valid playlist name (1–100 chars)."
    );
  };

  return (
    <Wrapper>
      <Title>Lets get started!</Title>

      <ContentContainer>
        <FieldWrapper>
          <Typography variant="h6" gutterBottom>
            Playlist name
          </Typography>
          <StyledTextField
            value={playlistName}
            onChange={handlePlaylistNameChange}
            placeholder="Enter playlist name"
            error={!!error}
            helperText={error}
            fullWidth
          />
        </FieldWrapper>

        <ScrollableSelector
          title="Special event?"
          items={["Party", "Cooking", "Work out", "Study", "Picnic", "Meeting"]}
          selected={event}
          onSelect={setEvent}
        />

        <ScrollableSelector
          title="Specific mood?"
          items={["Happy", "Hype", "Sad", "Calm", "Romantic", "Motivated"]}
          selected={mood}
          onSelect={setMood}
        />

        <ContinueButton
          variant="contained"
          size="large"
          fullWidth
          disabled={!!error || playlistName.trim() === ""}>
          Continue
        </ContinueButton>
      </ContentContainer>
    </Wrapper>
  );
};
