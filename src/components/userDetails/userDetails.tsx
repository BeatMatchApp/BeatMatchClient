import "./UserDetails.css";
import {
  addSongToPlaylist,
  createPlaylist,
  getUserDetails,
} from "../../services/spotifyService";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { StyledLoadingBox, StyledMenuButton } from "../styledComponents";
import { GeminiParams, getGeminiAnswer } from "../../services/geminiService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSpotifyUser } from "../../redux/spotifyUserSlice";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const spotifyInfo = useSelector((state: RootState) => state.spotifyUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        dispatch(setSpotifyUser({ user: userData }));

        if (!userData) {
          navigate("/register/spotify");
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        navigate("/register/spotify"); // optionally handle error case
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  const createPlaylistInSpotify = async () => {
    if (!playlistName) {
      toast("Please provide playlist name");
    } else {
      const playlistDetails = await createPlaylist(
        playlistName,
        spotifyInfo.user!.id
      );

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

  if (!spotifyInfo.user)
    return (
      <StyledLoadingBox>
        <CircularProgress size="5em" color="secondary" />
      </StyledLoadingBox>
    );

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
          <Typography sx={{ color: "#715cf8", fontWeight: "bold" }}>
            {" "}
            Logged in as {spotifyInfo.user.display_name}{" "}
          </Typography>
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
              setGeminiParams((prevState) => ({
                ...prevState,
                mood: e.target.value,
              }))
            }
          />
          <TextField
            id="favoriteArtist"
            label="favorite artist"
            onChange={(e) =>
              setGeminiParams((prevState) => ({
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
      <ToastContainer />
    </Box>
  );
}

export default UserDetails;
