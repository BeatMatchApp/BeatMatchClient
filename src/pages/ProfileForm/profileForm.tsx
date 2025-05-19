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
import { FormSteps } from '../../models/enums/FormSteps';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>('');

  const isFinishedForm = useMemo(() => {
    return activeStep === Object.keys(FormSteps).length - 1;
  }, [activeStep]);

  const updateArtists = (artists: string[]): void => {
    setSelectedArtists(artists);

    handleNext();
  };

  const updateGenres = (genres: string[]): void => {
    setSelectedGenres(genres);

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
      console.error('failed to save preferences. error:', err);
      toast.error('preferences failed to be saved :( fill them in later on!');
    }
  };

  const handleNext = (): void => {
    if (isFinishedForm) {
      navigate(NavigationRoutes.USER_ACTIONS_PAGE);
    } else if (activeStep < Object.keys(FormSteps).length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrevious = (): void => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const stepComponents = [
    {
      stepName: FormSteps.USER_DETAILS,
      component: <RegisterPage handleNextStep={handleNext} />,
    },
    {
      stepName: FormSteps.ARTISTS,
      component: <TopArtists handleNextStep={updateArtists} />,
    },
    {
      stepName: FormSteps.GENRES,
      component: <TopGenres handleNextStep={updateGenres} />,
    },
    {
      stepName: FormSteps.SONG,
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
          {activeStep > 1 && <Button onClick={handlePrevious}>Back</Button>}
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
