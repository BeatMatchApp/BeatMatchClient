import "./UserDetails.css";
import {
  addSongToPlaylist,
  createPlaylist,
} from "../../services/spotifyService";
import { useState } from "react";
import { toast } from "react-toastify";
import { Box, TextField, Typography } from "@mui/material";
import { StyledMenuButton } from "../styledComponents";
import {
  PlaylistSuggestionParams,
  getAiPlaylistSuggestionAnswer,
} from "../../services/aiService.ts";

function UserDetails() {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [playlistSuggestionParams, setPlaylistSuggestionParams] =
    useState<PlaylistSuggestionParams>({});
  const [suggestion, setSuggestion] = useState("");

  const createPlaylistInSpotify = async () => {
    if (!playlistName) {
      toast("Please provide playlist name");
    } else {
      // todo: fix in server to work without id
      const playlistDetails = await createPlaylist(playlistName);

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
          toast.success("Song added successfully");
        } else {
          toast.error("Failed to add song");
        }
      }
    }
  };

  const handleGetSuggestion = async () => {
    try {
      const response = await getAiPlaylistSuggestionAnswer(
        playlistSuggestionParams
      );
      setSuggestion(response?.suggestion);
    } catch (error) {
      console.error("Failed to fetch suggestion:", error);
      toast.error("Failed to fetch suggestion. Please try again.");
    }
  };

  return (
    <Box className="MenuCard">
      <img
        width="300em"
        src={`/assets/logo.png`}
        loading="lazy"
        className="logoImg"
      />

      {!playlistId && (
        <>
          <TextField
            id="playlistName"
            label="Playlist name"
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <StyledMenuButton onClick={createPlaylistInSpotify}>
            Create Playlist
          </StyledMenuButton>

          <TextField
            id="mood"
            label="mood"
            onChange={(e) =>
              setPlaylistSuggestionParams((prevState) => ({
                ...prevState,
                mood: e.target.value,
              }))
            }
          />
          <TextField
            id="favoriteArtist"
            label="favorite artist"
            onChange={(e) =>
              setPlaylistSuggestionParams((prevState) => ({
                ...prevState,
                favoriteArtist: e.target.value,
              }))
            }
          />
          <StyledMenuButton onClick={handleGetSuggestion}>
            Get suggestion
          </StyledMenuButton>
          {suggestion && (
            <Typography sx={{ color: "#715cf8", fontWeight: "bold" }}>
              {" "}
              {`The suggestion is ${suggestion}`}
            </Typography>
          )}
        </>
      )}
      {playlistId && (
        <>
          <TextField
            id="songInput"
            label="Song name"
            onChange={(e) => setSongName(e.target.value)}
          />
          <TextField
            id="artistInput"
            label="Artist name"
            onChange={(e) => setArtistName(e.target.value)}
          />
          <StyledMenuButton onClick={addSongToSpotifyPlaylist}>
            Add Song
          </StyledMenuButton>
        </>
      )}
    </Box>
  );
}

export default UserDetails;
