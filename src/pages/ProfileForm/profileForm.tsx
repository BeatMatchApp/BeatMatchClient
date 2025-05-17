import React, { useMemo, useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import TopArtists from '../../components/topArtists/topArtists';
import { updatePreferences } from '../../services/userPreferencesService';
import { toast } from 'react-toastify';
import RegisterPage from '../RegisterPage/registerPage';
import { useNavigate } from 'react-router-dom';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import TopGenres from '../../components/topGenres/topGenres';
import { StyledFormBox } from '../../components/styledComponents';
import './ProfileForm.css';
import TopSong from '../../components/topSong/topSong';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>('');

  const isFinishedForm = useMemo(() => {
    return activeStep === stepComponents.length - 1;
  }, [activeStep]);

  const updateArtists = (artists: string[]): void => {
    setSelectedArtists(artists);

    handleNext();
  };

  const updateGenres = (artists: string[]): void => {
    setSelectedGenres(artists);

    handleNext();
  };

  const updateSong = (song: string): void => {
    setSelectedSong(song);
  };

  const savePreferences = async (): Promise<void> => {
    try {
      await updatePreferences({
        artists: selectedArtists,
        genres: selectedGenres,
        song: selectedSong,
      });

      toast.success('your preferences are saved. enjoy your Beat match ;)');

      navigate(NavigationRoutes.USER_ACTIONS_PAGE);
    } catch (err) {
      toast.error('preferences failed to be saved :( fill them in later on!');
    }
  };

  const handleNext = (): void => {
    if (isFinishedForm) {
      navigate(NavigationRoutes.USER_ACTIONS_PAGE);
    } else if (activeStep < stepComponents.length - 1) {
      setActiveStep((prev: number) => prev + 1);
    }
  };

  const handleBack = (): void => {
    if (activeStep > 0) {
      setActiveStep((prev: number) => prev - 1);
    }
  };

  const stepComponents = [
    {
      stepName: 'User Details',
      component: <RegisterPage handleNextStep={handleNext} />,
    },
    {
      stepName: 'Artists',
      component: <TopArtists handleNextStep={updateArtists} />,
    },
    {
      stepName: 'Genres',
      component: <TopGenres handleNextStep={updateGenres} />,
    },
    {
      stepName: 'Song',
      component: <TopSong handleNextStep={updateSong} />,
    },
  ];

  return (
    <div className="form-container">
      <StyledFormBox>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {stepComponents.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.stepName}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {stepComponents[activeStep].component}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {activeStep > 1 && (
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
          )}
          {isFinishedForm && (
            <Button variant="contained" onClick={savePreferences}>
              Save my choices!
            </Button>
          )}
        </Box>
      </StyledFormBox>
    </div>
  );
};

export default ProfileForm;
