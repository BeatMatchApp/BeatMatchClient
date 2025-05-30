import React, { useState } from "react";
import { Box } from "@mui/material";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {
    StyledSongContainer,
    StyledSongBox,
    SongNumberTypography,
    SongTitle,
    StyledUnlikeIconButton
} from "../styledComponents";

interface PlaylistSongProps {
    id: number;
    song: string;
    trackNumber: number;
    onDislikeChange: (isDislike: boolean, id: number) => void;
}

export const PlaylistSong: React.FC<PlaylistSongProps> = ({ id, song, trackNumber, onDislikeChange }) => {
    const [isDisliked, setIsDisliked] = useState(false);

    const handleDislikeClick = () => {
        setIsDisliked(prev => {
            const newValue = !prev;
            onDislikeChange(newValue, id);
            return newValue;
        });
    };

    return (
        <StyledSongContainer>
            <StyledSongBox>
                <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <SongNumberTypography>{trackNumber}</SongNumberTypography>
                    <SongTitle>{song}</SongTitle>
                </Box>
                <StyledUnlikeIconButton size="small" onClick={handleDislikeClick}>
                    <ThumbDownIcon 
                        fontSize="small" 
                        sx={{ 
                            color: isDisliked ? '#ffcccb' : 'white',
                            transition: 'color 0.2s ease',
                        }} 
                    />
                </StyledUnlikeIconButton>
            </StyledSongBox>
        </StyledSongContainer>
    );
};

export default PlaylistSong;