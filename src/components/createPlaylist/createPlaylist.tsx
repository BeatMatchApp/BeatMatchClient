import { Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ScrollableSelector } from "../scrollableSelector/scrollableSelector";
import {
  Wrapper,
  ContentContainer,
  FieldWrapper,
  StyledTextField,
  ContinueButton,
  Title,
} from "./styled";

export const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [event, setEvent] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validatePlaylistName = (name: string): boolean => {
    const isValid = name.trim().length > 0 && name.length <= 100;
    return isValid;
  };

  const handlePlaylistNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPlaylistName(value);
    setError(
      validatePlaylistName(value)
        ? null
        : "Enter a valid playlist name (1–100 chars)."
    );
  };

  const handleContinue = () => {
    if (validatePlaylistName(playlistName)) {
      // todo: Handle the continue action here
      console.log("Continue with:", { playlistName, event, mood });
    } else {
      setError("Enter a valid playlist name (1–100 chars).");
    }
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
          disabled={!!error || playlistName.trim() === ""}
          onClick={handleContinue}>
          Continue
        </ContinueButton>
      </ContentContainer>
    </Wrapper>
  );
};
