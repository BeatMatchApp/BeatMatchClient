import { Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { ScrollableSelector } from "../scrollableSelector/scrollableSelector";
import { getEvents, getMoods } from "../../services/metaService";
import "./createPlaylist.css";
import {
  StyledMenuButton,
  StyledPageTitle,
  StyledTextField,
} from "../styledComponents";

export const CreatePlaylist = () => {
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

  const isContinueDisabled = !!error || playlistName.trim() === "";

  return (
    <div className="wrapper">
      <StyledPageTitle>Lets get started!</StyledPageTitle>

      <div className="content-container">
        <div className="field-wrapper">
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
        </div>

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

        <StyledMenuButton
          variant="contained"
          size="large"
          fullWidth
          disabled={isContinueDisabled}
          onClick={handleContinue}>
          Continue
        </StyledMenuButton>
      </div>
    </div>
  );
};
