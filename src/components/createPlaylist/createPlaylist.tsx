import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { ScrollableSelector } from "../scrollableSelector/scrollableSelector";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background: #fff;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 48px 16px 80px;
  max-width: 400px;
  margin: 0 auto;
`;

const FieldWrapper = styled.div`
  margin-bottom: 24px;
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
`;

export const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [event, setEvent] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);

  return (
    <Wrapper>
      <ContentContainer>
        <FieldWrapper>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Playlist name
          </Typography>
          <StyledTextField
            fullWidth
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter playlist name"
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

        <ContinueButton variant="contained" size="large" fullWidth>
          Continue
        </ContinueButton>
      </ContentContainer>
    </Wrapper>
  );
};
