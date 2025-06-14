import { ChangeEvent, useEffect, useState } from 'react';
import { ScrollableSelector } from '../scrollableSelector/scrollableSelector';
import { getEvents, getMoods } from '../../services/metaService';
import {
  StyledContentContainer,
  StyledPageSubtitle,
  StyledPageTitle,
} from '../styledComponents';
import { Box, TextField } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import MoodIcon from '@mui/icons-material/Mood';

interface Props {
  onValidChange: (isValid: boolean) => void;
  onPlaylistNameChange: (name: string) => void;
  onMoodChange: (mood: string) => void;
  onEventChange: (event: string) => void;
}

export const CreatePlaylistFilters: React.FC<Props> = ({
  onValidChange,
  onPlaylistNameChange,
  onMoodChange,
  onEventChange,
}) => {
  const [playlistName, setPlaylistName] = useState('');
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
      console.error('Error fetching events:', error);
    }
  };

  const fetchMoods = async () => {
    try {
      const response = await getMoods();
      setMoods(response);
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchMoods();
  }, []);

  useEffect(() => {
    onValidChange(validatePlaylistName(playlistName) && !error);
  }, [playlistName, error, onValidChange]);

  // Add effects to pass values up to parent
  useEffect(() => {
    onPlaylistNameChange(playlistName);
  }, [playlistName, onPlaylistNameChange]);

  useEffect(() => {
    if (!mood) return;
    onMoodChange(mood);
  }, [mood, onMoodChange]);

  useEffect(() => {
    if (!event) return;
    onEventChange(event);
  }, [event, onEventChange]);

  const validatePlaylistName = (name: string): boolean => {
    return name.trim().length > 0 && name.length <= 100;
  };

  const handlePlaylistNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setPlaylistName(value);
    setError(
      validatePlaylistName(value)
        ? null
        : 'Enter a valid playlist name (1–100 chars).'
    );
  };

  return (
    <Box
      className="center"
      sx={{
        width: { xs: '100%', sm: '80%' },
        margin: 'auto',
        padding: '20px 0 20px 0',
      }}
    >
      <StyledPageTitle>{`Let's get started!`}</StyledPageTitle>

      <StyledContentContainer>
        <StyledPageSubtitle>Playlist name</StyledPageSubtitle>
        <TextField
          value={playlistName}
          onChange={handlePlaylistNameChange}
          placeholder="Enter playlist name"
          error={!!error}
          helperText={error}
          fullWidth
          variant="outlined"
          InputProps={{
            sx: {
              height: '6vh',
              maxHeight: '6-px',
              padding: 0,
              fontSize: '1rem',
              '& input': {
                padding: '6px 8px',
              },
            },
          }}
        />

        <ScrollableSelector
          title="Special event?"
          items={events}
          selected={event}
          onSelect={setEvent}
          icon={EventIcon}
        />

        <ScrollableSelector
          title="Specific mood?"
          items={moods}
          selected={mood}
          onSelect={setMood}
          icon={MoodIcon}
        />
      </StyledContentContainer>
    </Box>
  );
};
