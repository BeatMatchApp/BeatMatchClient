import "./UserDetails.css";

import { UserSpotifyProfile } from "../../models/UserSpotifyProfile";
import {
  addSongToPlaylist,
  createPlaylist,
  getUserDetails,
} from "../../services/spotifyService";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { StyledMenuButton } from "../styledComponents";
import { GeminiParams, getGeminiAnswer } from "../../services/geminiService";

function UserDetails() {
  const [user, setUser] = useState<UserSpotifyProfile | null>(null);
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [geminiParams, setGeminiParams] = useState<GeminiParams>({});
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserDetails();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUser();
  }, []);

  const createPlaylistInSpotify = async () => {
    if (!playlistName) {
      toast("Please provide playlist name");
    } else {
      const playlistDetails = await createPlaylist(playlistName, user!.id);

      if (playlistDetails.id) {
        setPlaylistId(playlistDetails.id);
        toast("Playlist created successfully");
      } else {
        toast("Failed to create playlist");
      }
    }
  };

  const addSongToSpotifyPlaylist = async () => {
    if (!songName || !artistName) {
      toast("Please provide song and artist name");
    } else {
      if (playlistId) {
        const songDetails = await addSongToPlaylist(
          playlistId,
          songName,
          artistName
        );

        if (songDetails.success) {
          toast("Song added successfully");
        } else {
          toast("Failed to add song");
        }
      }
    }
  };

  const handleGetSuggestion = async () => {
    try {
      const response = await getGeminiAnswer(geminiParams);
      setSuggestion(response.suggestion);
    } catch {
      toast("Failed to fetch suggestion. Please try again.");
    }
  };

  if (!user) 
    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size="5em" color="secondary"/>
    </Box>
    );

  return (
    <Box className="MenuCard">       
        <img width="300em" src={`/assets/logo.png`} loading="lazy" className="logoImg" />

      {!playlistId && (
        <>
          <Typography sx={{ color: '#715cf8', fontWeight: 'bold'}}> Logged in as {user.display_name} </Typography>
          <TextField id="playlistName" label="Playlist name" onChange={(e) => setPlaylistName(e.target.value)}/>
          <StyledMenuButton onClick={createPlaylistInSpotify}>Create Playlist</StyledMenuButton>

          <TextField id="mood" label="mood" onChange={(e) => setGeminiParams(prevState => ({ ...prevState, mood: e.target.value }))}          />
          <TextField id="favoriteArtist" label="favorite artist" onChange={(e) => setGeminiParams(prevState => ({ ...prevState, favoriteArtist: e.target.value }))}          />
          <StyledMenuButton onClick={handleGetSuggestion}>Get suggestion</StyledMenuButton>
          {suggestion && <Typography sx={{ color: '#715cf8', fontWeight: 'bold'}}> {`The suggestion is ${suggestion}`}</Typography> }
          </>
      )}
      {playlistId && (
        <>
          <TextField id="songInput" label="Song name" onChange={(e) => setSongName(e.target.value)}/>
          <TextField id="artistInput" label="Artist name" onChange={(e) => setArtistName(e.target.value)}/>
          <StyledMenuButton onClick={addSongToSpotifyPlaylist}>Add Song</StyledMenuButton>
        </>
      )}
      <ToastContainer />
    </Box>
  );
}

export default UserDetails;
