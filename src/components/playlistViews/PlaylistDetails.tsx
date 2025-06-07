import React, {useState} from 'react';
import { Box, Typography, IconButton, Paper, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Playlist} from "../../models/Playlist.ts";
import {StyledPageSubtitle, StyledMenuButton, StyledTextField} from "../styledComponents";
import PlaylistSong from './PlaylistSong';

// ################ STYLED COMPONENTS ################

const InfoPaper = styled(Paper)({
    padding: 24,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: '#f8f8ff'
});

const RequestPaper = styled(Paper)({
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#f8f8ff'
});

// ################ COMPONENT ################

interface PlaylistDetailProps {
    playlist: Playlist;
    onBack: () => void;
    onEdit?: (playlist: Playlist) => void;
}

const PlaylistDetail: React.FC<PlaylistDetailProps> = ({ playlist, onBack, onEdit }) => {
    const [dislikedSongs, setDislikedSongs] = useState<number[]>([]);
    const [requestText, setRequestText] = useState('');
    const [isRefreshDisabled, setIsRefreshDisabled] = useState(true);

    const creationDate = new Date(playlist.creationTime).toLocaleDateString();
    const lastUpdated = new Date(playlist.lastUpdatedTime).toLocaleDateString();

    const onDislikeChange = (id: number) => {
        setDislikedSongs(prev => {
            const exists = prev.includes(id);
            const updated = exists
                ? prev.filter(songId => songId !== id)
                : [...prev, id];

            setIsRefreshDisabled(updated.length === 0 && !requestText.trim());
            return updated;
        });
    };

    const handleRequestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setRequestText(value);
        setIsRefreshDisabled(value.trim().length === 0 && dislikedSongs.length === 0);
    };

    const handleRefresh = () => {
        console.log('Disliked songs:', dislikedSongs);
        console.log('Request text:', requestText);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={onBack} sx={{ mr: 1, color: '#715cf8' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#5a36a1' }}>
                    {playlist.name}
                </Typography>
                {onEdit && (
                    <IconButton
                        onClick={() => onEdit(playlist)}
                        sx={{ ml: 'auto', color: '#715cf8' }}
                    >
                        <EditIcon />
                    </IconButton>
                )}
            </Box>

            <InfoPaper elevation={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Created:</strong> {creationDate}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Last Updated:</strong> {lastUpdated}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <strong>Number of Songs:</strong> {playlist.songs.length}
                    </Typography>
                    {playlist.context && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#5a36a1' }}>
                                Playlist Context:
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>
                                {playlist.context}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </InfoPaper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <StyledPageSubtitle>Songs</StyledPageSubtitle>
                <StyledMenuButton
                    disabled={isRefreshDisabled}
                    onClick={handleRefresh}
                    size="small"
                    startIcon={<RefreshIcon />}
                >
                    Refresh
                </StyledMenuButton>
            </Box>

            {playlist.songs.length === 0 ? (
                <Typography variant="body1" color="secondary">
                    This playlist doesn't have any songs yet.
                </Typography>
            ) : (
                <Box sx={{ mb: 3 }}>
                    {playlist.songs.map((song, index) => (
                        <PlaylistSong
                            key={index}
                            id={index}
                            song={song}
                            trackNumber={index + 1}
                            onDislikeChange={onDislikeChange}
                        />
                    ))}
                </Box>
            )}

            <RequestPaper elevation={1}>
                <Typography variant="subtitle1" sx={{ color: '#5a36a1', fontWeight: 'bold', mb: 2 }}>
                    Any requests?
                </Typography>
                <StyledTextField
                    multiline
                    minRows={2}
                    placeholder="Add song requests or feedback for this playlist..."
                    onChange={handleRequestChange}
                    variant="outlined"
                    fullWidth
                />
            </RequestPaper>
        </Box>
    );
};

export default PlaylistDetail;