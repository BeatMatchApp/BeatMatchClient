import React, { useState } from 'react';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { CreatePlaylistFilters } from '../../components/createPlaylistFilters/createPlaylistFilters';
import { StyledMenuButton } from '../../components/styledComponents';
import { CreatePlaylistResults } from '../../components/createPlaylistResults/createPlaylistResults';

const steps = ['Lets get started!', 'Lets custom it!', 'Finish'];

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
      return <CreatePlaylistResults onValidChange={onValidChange}/>;
    case 2:
      return <Typography>Final step! You're on the last page.</Typography>;
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
      setIsStepValid(false);
    }
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
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
          disabled={activeStep === steps.length - 1 || !isStepValid}
        >
          Next
        </StyledMenuButton>
      </Box>
    </Box>
  );
};

export default CreatePlaylistPage;
