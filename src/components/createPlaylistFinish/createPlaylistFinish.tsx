import ShinyCard from '../ShinyCard/ShinyCard';
import { StyledContentContainer, StyledPageTitle } from '../styledComponents';
import { Box, Typography, Link } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import '../../App.css';

interface Props {
  savedPlaylist: {
    url?: string;
    error?: boolean;
    errorMessage?: string;
  } | null;
}

export const CreatePlaylistFinish: React.FC<Props> = ({ savedPlaylist }) => {
  const renderContent = () => {
    if (!savedPlaylist) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#ff5252' }}>
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          <Typography>Could not fetch playlist information</Typography>
        </Box>
      );
    }

    if (savedPlaylist.error) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#ff5252' }}>
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          <Typography>
            {savedPlaylist.errorMessage ||
              'Error creating playlist. Please try again.'}
          </Typography>
        </Box>
      );
    }

    if (savedPlaylist.url) {
      return (
        <Link
          className="text-elipsis"
          href={savedPlaylist.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#715cf8',
            '&:hover': {
              color: '#5a36a1',
              textDecoration: 'underline',
            },
            textDecoration: 'none',
          }}
        >
          {savedPlaylist.url}
        </Link>
      );
    }

    return <Typography>Playlist created but no URL available</Typography>;
  };

  return (
    <Box className="center">
      <StyledPageTitle sx={{ marginBottom: '10px' }}>
        Playlist created!
      </StyledPageTitle>
      <StyledContentContainer sx={{ color: 'white', alignItems: 'center' }}>
        <ShinyCard colors={['#8d92f6', '#a2dfd0']}>
          <Box sx={{ padding: '5px 8px' }}>{renderContent()}</Box>
        </ShinyCard>
      </StyledContentContainer>
    </Box>
  );
};
