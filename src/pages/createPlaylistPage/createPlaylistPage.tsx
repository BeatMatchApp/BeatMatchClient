import React, { useState } from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { CreatePlaylistFilters } from '../../components/createPlaylistFilters/createPlaylistFilters';
import { StyledMenuButton } from '../../components/styledComponents';
import { CreatePlaylistResults } from '../../components/createPlaylistResults/createPlaylistResults';
import { CreatePlaylistFinish } from '../../components/createPlaylistFinish/createPlaylistFinish';

const steps = [
  {stepText: 'Lets get started!', stepButtonText: 'Start Creating my playlist'},
  {stepText: 'Lets custom it!', stepButtonText: 'my playlist is perfect!'},
  {stepText: 'Finish', stepButtonText: 'Create another playlist?'},
  ];

const StepContent = ({
  step,
  onValidChange,
}: {
  step: number;
  onValidChange: (isValid: boolean) => void;
}) => {
  switch (step) {
    case 0:
      return <CreatePlaylistFilters onValidChange={onValidChange} />;
    case 1:
      return <CreatePlaylistResults/>;
    case 2:
      return <CreatePlaylistFinish url='myUrl'/>;
    default:
      return null;
  }
};

const CreatePlaylistPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const handleNext = () => {
    if (!isStepValid) return;
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      setActiveStep(0);
    }
  };

  return (
    <Box sx={{ marginTop: '3vh', marginBottom: '3vh'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.stepText}>
            <StepLabel>{step.stepText}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4, minHeight: 100 }}>
        <StepContent step={activeStep} onValidChange={setIsStepValid}/>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
        <StyledMenuButton
          variant="contained"
          onClick={handleNext}
          disabled={!isStepValid}
        >
          {steps[activeStep].stepButtonText}
        </StyledMenuButton>
      </Box>
    </Box>
  );
};

export default CreatePlaylistPage;
