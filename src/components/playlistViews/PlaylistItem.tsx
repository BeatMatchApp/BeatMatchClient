import React from 'react';
import {Box, Typography, IconButton, Paper, Avatar, Stack, Chip, styled} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Playlist} from "../../models/Playlist.ts";


// ################ STYLED COMPONENTS ################

const StyledPlaylistPaper = styled(Paper)({
    padding: '20px',
    borderRadius: 12,
    transition: 'all 0.3s',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
        backgroundColor: '#fcfcff'
    }
})

const PlaylistAvatar = styled(Avatar)({
    width: 80,
    height: 80,
    marginRight: 20,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
});

const PlaylistTitle = styled(Typography)({
    color: '#5a36a1',
    fontWeight: 'bold',
    marginBottom: 4
});

const PlaylistMetaText = styled(Typography)({
    display: 'flex',
    alignItems: 'center'
});

const ActionIconButton = styled(IconButton)({
    color: '#715cf8',
    '&:hover': {
        backgroundColor: 'rgba(113, 92, 248, 0.1)'
    }
});

const StyledChip = styled(Chip)({
    backgroundColor: 'rgba(113, 92, 248, 0.1)',
    color: '#715cf8',
    fontWeight: 500
});

const PlaylistContextText = styled(Typography)({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: 1.4
});


// ################ COMPONENT ################
interface PlaylistItemProps {
    playlist: Playlist;
    onView: (playlist: Playlist) => void;
    onEdit?: (playlist: Playlist) => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist, onView, onEdit }) => {
    const formattedDate = new Date(playlist.lastUpdatedTime).toLocaleDateString();

    return (
        <StyledPlaylistPaper elevation={2}>
            <PlaylistAvatar variant="rounded">
                <MusicNoteIcon sx={{ fontSize: 36, color: 'white' }} />
            </PlaylistAvatar>

            <Box sx={{ flexGrow: 1 }}>
                <PlaylistTitle variant="h6">
                    {playlist.name}
                </PlaylistTitle>

                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                    <StyledChip size="small" label={`${playlist.songs.length} songs`}/>
                    <PlaylistMetaText variant="body2" color="text.secondary">
                        <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {formattedDate}
                    </PlaylistMetaText>
                </Stack>

                {playlist.context && (
                    <PlaylistContextText variant="body2" color="text.secondary">
                        {playlist.context}
                    </PlaylistContextText>
                )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ActionIconButton onClick={() => onView(playlist)}>
                    <VisibilityIcon />
                </ActionIconButton>
                {onEdit && (
                    <ActionIconButton onClick={() => onEdit(playlist)}>
                        <EditIcon />
                    </ActionIconButton>
                )}
            </Box>
        </StyledPlaylistPaper>
    );
};

export default PlaylistItem;