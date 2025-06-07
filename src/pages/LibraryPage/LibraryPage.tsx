import React, { useEffect, useState, useMemo } from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    Container, 
    Alert, 
    Skeleton,
    Card,
    CardContent,
    Stack
} from '@mui/material';
import { StyledPageTitle} from '../../components/styledComponents';
import PlaylistItem from "../../components/playlistViews/PlaylistItem";
import PlaylistDetails from "../../components/playlistViews/PlaylistDetails";
import { Playlist } from '../../models/Playlist.ts';
import { playlistService } from '../../services/playlistService';
import {PageTitleContainer} from "./styled.ts";

const LibraryPage: React.FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await playlistService.getUserPlaylists();
                setPlaylists(data);
            } catch (err) {
                setError('Failed to fetch playlists. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    const handleViewPlaylist = (playlist: Playlist) => {
        setSelectedPlaylist(playlist);
    };

    const handleCloseDetailView = () => {
        setSelectedPlaylist(null);
    };

    const handleDismissError = () => {
        setError(null);
    };

    const PlaylistSkeletons = useMemo(() => (
        <Box sx={{ display: 'grid', gap: 3 }}>
            {[1, 2, 3].map((index) => (
                <Card key={index} sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-4px)' }
                }}>
                    <CardContent sx={{ display: 'flex', p: 2 }}>
                        <Skeleton variant="rounded" width={80} height={80} sx={{ mr: 2 }} />
                        <Box sx={{ width: '100%' }}>
                            <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
                            <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                                <Skeleton variant="rounded" width={80} height={24} />
                                <Skeleton variant="text" width={100} height={24} />
                            </Stack>
                            <Skeleton variant="text" width="70%" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Skeleton variant="circular" width={40} height={40} />
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    ), []);

    const errorAlert = useMemo(() =>
        error && (
            <Alert 
                severity="error" 
                onClose={handleDismissError}
                sx={{ 
                    mb: 3, 
                    borderRadius: 2,
                    '& .MuiAlert-icon': { color: '#f44336' }
                }}
            >
                {error}
            </Alert>
        ), [error, handleDismissError]
    );
    const playlistsList = useMemo(() => (
        <Box sx={{ display: 'grid', gap: 3 }}>
            {playlists.map((playlist) => (
                <PlaylistItem
                    key={playlist.id}
                    playlist={playlist}
                    onView={handleViewPlaylist}
                />
            ))}
        </Box>
    ), [playlists, handleViewPlaylist]);

    const emptyState = useMemo(() => (
        <Paper elevation={1} sx={{p: 6, borderRadius: 3, backgroundColor: '#f8f8ff', textAlign: 'center',}}>
            <Typography variant="h6" color="#5a36a1" gutterBottom>
                No playlists yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Create your first playlist to get started!
            </Typography>
        </Paper>
    ), []);

    return (
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
            {errorAlert}

            <PageTitleContainer>
                <StyledPageTitle>Your Library</StyledPageTitle>
            </PageTitleContainer>

            {selectedPlaylist ? (
                <PlaylistDetails
                    playlist={selectedPlaylist}
                    onBack={handleCloseDetailView}
                />
            ) : (
                <Box sx={{ width: '100%' }}>
                    {loading ? PlaylistSkeletons : 
                     playlists.length === 0 ? emptyState : 
                     playlistsList}
                </Box>
            )}
        </Container>
    );
};

export default LibraryPage;