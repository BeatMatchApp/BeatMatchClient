import React, { useState } from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { CreatePlaylistFilters } from '../../components/createPlaylistFilters/createPlaylistFilters';
import { StyledMenuButton } from '../../components/styledComponents';
import { CreatePlaylistResults } from '../../components/createPlaylistResults/createPlaylistResults';
import { CreatePlaylistFinish } from '../../components/createPlaylistFinish/createPlaylistFinish';

const CreatePlaylistPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const steps = [
    {
      stepText: 'Let’s get started!',
      stepButtonText: 'Start Creating my playlist',
      StepContent: () => (
        <CreatePlaylistFilters onValidChange={setIsStepValid} />
      ),
    },
    {
      stepText: 'Let’s customize it!',
      stepButtonText: 'My playlist is perfect!',
      StepContent: () => <CreatePlaylistResults />,
    },
    {
      stepText: 'Finish',
      stepButtonText: 'Create another playlist',
      StepContent: () => <CreatePlaylistFinish PlaylistUrl="myUrl" />,
    },
  ];

  const handleNext = () => {
    if (!isStepValid && activeStep === 0) return;
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      setActiveStep(0);
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
          disabled={!isStepValid && activeStep === 0}
        >
          {steps[activeStep].stepButtonText}
        </StyledMenuButton>
      </Box>
    </Box>
  );
};

export default CreatePlaylistPage;
