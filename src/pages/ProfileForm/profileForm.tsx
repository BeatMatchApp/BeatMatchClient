import React, { ChangeEvent, useMemo, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  TextField,
} from "@mui/material";
import TopArtists from "../../components/topArtists/topArtists";
import { updatePreferences } from "../../services/userPreferencesService";
import { toast } from "react-toastify";
import RegisterPage from "../RegisterPage/registerPage";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../models/NavigationRoutes";
import TopGenres from "../../components/topGenres/topGenres";

const steps = ["User Details", "Artists", "Genres", "Favorite Song"];

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>("");

  const isFinishedForm = useMemo(() => {
    return activeStep === steps.length - 1;
  }, [activeStep]);

  const updateArtists = (artists: string[]): void => {
    setSelectedArtists(artists);

    handleNext();
  };

  const updateGenres = (artists: string[]): void => {
    setSelectedGenres(artists);

    handleNext();
  };

  const updateSong = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSelectedSong(e.target.value);
  };

  const savePreferences = async (): Promise<void> => {
    try {
      await updatePreferences({
        artists: selectedArtists,
        genres: selectedGenres,
        vibe: "calm",
        song: selectedSong,
      });

      navigate(NavigationRoutes.USER_ACTIONS_PAGE);
    } catch (err) {
      console.log(err);
      toast.error("preferences failed to be saved :( fill them in later on!");
    }
  };

  const handleNext = () => {
    if (isFinishedForm) {
      navigate(NavigationRoutes.USER_ACTIONS_PAGE);
    } else if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const stepComponents = [
    {
      stepName: "User Details",
      component: <RegisterPage handleNextStep={handleNext} />,
    },
    {
      stepName: "Artists",
      component: <TopArtists handleNextStep={updateArtists} />,
    },
    {
      stepName: "Genres",
      component: <TopGenres handleNextStep={updateGenres} />,
    },
    {
      stepName: "Favorite Song",
      component: (
        <TextField
          id="song"
          value={selectedSong}
          onChange={updateSong}
          fullWidth
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {stepComponents.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.stepName}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {stepComponents[activeStep].component}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {isFinishedForm && (
          <Button variant="contained" onClick={savePreferences}>
            Save my choices!
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProfileForm;
