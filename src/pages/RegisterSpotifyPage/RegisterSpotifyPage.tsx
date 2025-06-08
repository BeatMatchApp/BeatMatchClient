import { Box, Tooltip, IconButton } from '@mui/material';
import { StyledPageTitle } from '../../components/styledComponents';
import { redirectToSpotify } from '../../services/spotifyService';
import SpotifyIcon from '../../../public/assets/images/spotifyIcon.png';
import ShinyCard from '../../components/ShinyCard/ShinyCard';

const RegisterSpotifyPage = () => {
  const fetchSpotifyUser = async () => {
    redirectToSpotify();
  };

  return (
    <Box
      className="center"
      sx={{
        flexDirection: 'column',
        height: '100%',
        width: '90%',
        margin: 'auto',
      }}
    >
      <ShinyCard colors={['#00cc66', '#00cc66']}>
        <StyledPageTitle>Connect your Spotify account!</StyledPageTitle>
        <Box className="center">
          <Tooltip title={'Connect to Spotify'}>
            <IconButton onClick={fetchSpotifyUser} sx={{ color: '#1DB954' }}>
              <img
                src={SpotifyIcon}
                alt="Spotify"
                style={{ width: 40, height: 40 }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </ShinyCard>
    </Box>
  );
};

export default RegisterSpotifyPage;
