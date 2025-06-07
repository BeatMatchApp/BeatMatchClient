import ShinyCard from "../ShinyCard/ShinyCard";
import { StyledContentContainer, StyledPageTitle } from "../styledComponents";
import { Box, Typography } from "@mui/material";

interface Props {
  PlaylistUrl: string;
}

export const CreatePlaylistFinish: React.FC<Props> = ({ PlaylistUrl }) => {

  return (
     <Box className="center">
       <StyledPageTitle>Playlist created!</StyledPageTitle>
       <StyledContentContainer sx={{ color: 'white', alignItems: 'center' }}>
        <ShinyCard colors={['#8d92f6', '#a2dfd0']}>
          <Typography sx={{ padding: '1vh'}}>{PlaylistUrl}</Typography>
        </ShinyCard>
       </StyledContentContainer>
     </Box>
  );
};
