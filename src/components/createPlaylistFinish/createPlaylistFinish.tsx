import { StyledContentContainer, StyledPageTitle } from "../styledComponents";
import { Box, Typography } from "@mui/material";

interface CreatePlaylistFinishProps {
  url: string;
}

export const CreatePlaylistFinish: React.FC<CreatePlaylistFinishProps> = ({ url }) => {

  return (
     <Box className="center">
       <StyledPageTitle>Playlist created!</StyledPageTitle>
       <StyledContentContainer sx={{width: '80%', color: 'white'}}>
        <Box sx={{ backgroundColor: '#9C27B0', }}>
            <Typography sx={{ padding: '10px'}}>{url}</Typography>
        </Box>
       </StyledContentContainer>
     </Box>
  );
};
