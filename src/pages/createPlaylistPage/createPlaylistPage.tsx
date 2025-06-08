import React, { useState } from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { CreatePlaylistFilters } from '../../components/createPlaylistFilters/createPlaylistFilters';
import { StyledMenuButton } from '../../components/styledComponents';
import { CreatePlaylistResults } from '../../components/createPlaylistResults/createPlaylistResults';
import { CreatePlaylistFinish } from '../../components/createPlaylistFinish/createPlaylistFinish';
import { getAiPlaylistCreationAnswer} from "../../services/aiService.ts";
import {playlistService} from "../../services/playlistService.ts";
import {Song} from "../../models/Playlist.ts";

const CreatePlaylistPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [mood, setMood] = useState<string | null>(null);
  const [event, setEvent] = useState<string | null>(null);
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState('');

  const steps = [
    {
      stepText: "Let's get started!",
      stepButtonText: 'Start creating my playlist',
      StepContent: () => (
          <CreatePlaylistFilters
              onValidChange={setIsStepValid}
              onPlaylistNameChange={setPlaylistName}
              onMoodChange={setMood}
              onEventChange={setEvent}
          />
      )
    },
    {
      stepText: "Let's customize it!",
      stepButtonText: 'My playlist is perfect!',
      StepContent: () => (
          <CreatePlaylistResults
              songs={songs}
              loading={loading}
              vibe={mood}
              activity={event}
              onSongsChange={setSongs}
          />
      )
    },
    {
      stepText: 'Finish',
      stepButtonText: 'Create another playlist?',
      StepContent: () => <CreatePlaylistFinish PlaylistUrl={playlistUrl} />
    }
  ];

  const fetchPlaylistSuggestions = async () => {
    setLoading(true);
    try {
      const result = await getAiPlaylistCreationAnswer({
        vibe: mood || '',
        activity: event || ''
      });

      if (result?.playlist?.data) {
        const formattedSongs = result.playlist.data.map((song: Song, index: number) => ({
          id: index + 1,
          name: song.name,
          artist: song.artist
        }));
        setSongs(formattedSongs);
      } else {
        setSongs([]);
      }
    } catch (error) {
      console.error('Error fetching playlist suggestions:', error);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const savePlaylist = async () => {
    setLoading(true);
    try {
      const formattedSongs = songs.map(song => ({
        name: song.name,
        artist: song.artist
      }));

      const result = await playlistService.createPlaylist({
        name: playlistName,
        songs: formattedSongs,
        description: '',
        vibe: mood || '',
        activity: event || ''
      });

      if (result?.id) {
        // TODO: update playlistUrl
        setPlaylistUrl("updatedPlaylistUrl");
      } else {
        setPlaylistUrl('https://example.com/playlist');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      setPlaylistUrl('Error creating playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (!isStepValid && activeStep === 0) return;

    if (activeStep === 0) {
      await fetchPlaylistSuggestions();
      setActiveStep((prev) => prev + 1);
    } else if (activeStep === 1) {
      await savePlaylist();
      setActiveStep((prev) => prev + 1);
    } else {
      // reset state
      setActiveStep(0);
      setIsStepValid(false);
      setPlaylistName('');
      setMood(null);
      setEvent(null);
      setSongs([]);
      setPlaylistUrl('');
    }
  };

  return (
    <Box sx={{ marginTop: '3vh', height: '7vh' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.stepText}>
            <StepLabel>{step.stepText}</StepLabel>
          </Step>
        ))}
      </Stepper>

        <Box sx={{ mt: 4, minHeight: 100 }}>
          {steps[activeStep].StepContent()}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <StyledMenuButton
              variant="contained"
              onClick={handleNext}
              disabled={(!isStepValid && activeStep === 0) || loading}
          >
            {loading ? 'Loading...' : steps[activeStep].stepButtonText}
          </StyledMenuButton>
        </Box>
      </Box>
  );
};

export default CreatePlaylistPage;