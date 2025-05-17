import { Box } from "@mui/material";
import { StyledContentContainer, StyledPageTitle } from "../styledComponents";
import { useEffect } from "react";

interface CreatePlaylistResultsProps {
  onValidChange: (isValid: boolean) => void;
}

export const CreatePlaylistResults: React.FC<CreatePlaylistResultsProps> = ({ onValidChange }) =>  {

    useEffect(() => {
      onValidChange(true);
    }, [onValidChange]);

  return (
    <Box className="center">
      <StyledPageTitle>Lets get started!</StyledPageTitle>

      <StyledContentContainer>
        hey
      </StyledContentContainer>
    </Box>
  );
};
