import React, { useMemo, useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import TopArtists from '../../components/topArtists/topArtists';
import { updatePreferences } from '../../services/userPreferencesService';
import { toast } from 'react-toastify';
import RegisterPage from '../RegisterPage/registerPage';
import { useNavigate } from 'react-router-dom';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import TopGenres from '../../components/topGenres/topGenres';
import './ProfileForm.css';
import TopSong from '../../components/topSong/topSong';
import { FormSteps } from '../../models/enums/FormSteps';
import { MAX_PREFERENCES_AMOUNT } from '../../shared/consts';
import { StyledCardBox, StyledPageCard } from '../styledPages';
import { StyledMenuButton } from '../../components/styledComponents';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>('');

  const isFinishedForm = useMemo(() => {
    return activeStep === Object.keys(FormSteps).length - 1;
  }, [activeStep]);

  const isPreferencesFilled: boolean =
    Boolean(selectedSong) &&
    selectedArtists.length === MAX_PREFERENCES_AMOUNT &&
    selectedGenres.length === MAX_PREFERENCES_AMOUNT;

  const updateSong = (song: string): void => {
    setSelectedSong(song);
  };

  const savePreferences = async (): Promise<void> => {
    try {
      if (isPreferencesFilled) {
        await updatePreferences({
          artists: selectedArtists,
          genres: selectedGenres,
          song: selectedSong,
        });

        toast.success('your preferences are saved. enjoy your Beat match ;)');

        navigate(NavigationRoutes.MAIN_PAGE);
      }
    } catch (err) {
      console.error('failed to save preferences. error:', err);
      toast.error('preferences failed to be saved :( fill them in later on!');
    }
  };

  const handleNext = (): void => {
    if (isFinishedForm) {
      navigate(NavigationRoutes.MAIN_PAGE);
    } else {
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
      component: (
        <TopArtists
          handleNextStep={handleNext}
          selectedArtists={selectedArtists}
          setSelectedArtists={setSelectedArtists}
        />
      ),
    },
    {
      stepName: FormSteps.GENRES,
      component: (
        <TopGenres
          handleNextStep={handleNext}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      ),
    },
    {
      stepName: FormSteps.SONG,
      component: <TopSong handleNextStep={updateSong} />,
    },
  ];

  return (
    <Box className="form-container">
      <StyledPageCard>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {stepComponents.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.stepName}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {stepComponents[activeStep].component}

        <StyledCardBox>
          {isFinishedForm && (
            <StyledMenuButton
              sx={{ marginTop: '3vh' }}
              disabled={!isPreferencesFilled}
              variant="contained"
              onClick={savePreferences}
            >
              Save my choices!
            </StyledMenuButton>
          )}
          {activeStep > 1 && (
            <StyledMenuButton variant="outlined" onClick={handlePrevious}>
              Back
            </StyledMenuButton>
          )}
        </StyledCardBox>
      </StyledPageCard>
    </Box>
  );
};

export default ProfileForm;
