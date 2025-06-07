import { StyledContentContainer, StyledPageTitle } from "../styledComponents";
import { Box, Typography } from "@mui/material";

interface Props {
    PlaylistUrl: string;
}

export const CreatePlaylistFinish: React.FC<Props> = ({ PlaylistUrl }) => {

    return (
        <Box className="center">
            <StyledPageTitle>Playlist created!</StyledPageTitle>
            <StyledContentContainer sx={{width: '80%', color: 'white'}}>
                <Box sx={{ backgroundColor: '#9C27B0', }}>
                    <Typography sx={{ padding: '10px'}}>{PlaylistUrl}</Typography>
                </Box>
            </StyledContentContainer>
        </Box>
    );
};