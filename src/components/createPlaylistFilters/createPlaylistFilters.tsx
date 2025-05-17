import { Box, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { ScrollableSelector } from "../scrollableSelector/scrollableSelector";
import { getEvents, getMoods } from "../../services/metsService";
import { StyledContentContainer, StyledPageTitle } from "../styledComponents";

interface CreatePlaylistFiltersProps {
  onValidChange: (isValid: boolean) => void;
}

export const CreatePlaylistFilters: React.FC<CreatePlaylistFiltersProps> = ({ onValidChange }) =>  {
  const [playlistName, setPlaylistName] = useState("");
  const [event, setEvent] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchMoods = async () => {
    try {
      const response = await getMoods();
      setMoods(response);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchMoods();
  }, []);

  useEffect(() => {
    onValidChange(validatePlaylistName(playlistName) && !error);
  }, [playlistName, error, onValidChange]);

  fetchEvents();

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

  return (
    <Box className="center" sx={{width: '60%', margin: 'auto'}}>
      <StyledPageTitle>Lets get started!</StyledPageTitle>

      <StyledContentContainer>
        {/* <FieldWrapper> */}
          <Typography variant="h6" gutterBottom>
            Playlist name
          </Typography>
          <TextField
            value={playlistName}
            onChange={handlePlaylistNameChange}
            placeholder="Enter playlist name"
            error={!!error}
            helperText={error}
            fullWidth
          />
        {/* </FieldWrapper> */}

        <ScrollableSelector
          title="Special event?"
          items={events}
          selected={event}
          onSelect={setEvent}
        />

        <ScrollableSelector
          title="Specific mood?"
          items={moods}
          selected={mood}
          onSelect={setMood}
        />
      </StyledContentContainer>
    </Box>
  );
};
