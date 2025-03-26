import "./UserDetails.css";

import { UserSpotifyProfile } from "../../models/UserSpotifyProfile";
import {
  addSongToPlaylist,
  createPlaylist,
  getUserDetails,
  redirectToSpotify,
} from "../../services/spotifyService";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserDetails() {
  const [user, setUser] = useState<UserSpotifyProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("accessToken");

      if (!token) {
        redirectToSpotify();
        return;
      }

      try {
        setAccessToken(token);
        const userData = await getUserDetails(token);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        // Optionally redirect again or show error UI
      }
    };

    fetchUser();
  }, []);

  const createPlaylistInSpotify = async () => {
    if (!playlistName) {
      toast("Please provide playlist name");
    } else {
      const playlistDetails = await createPlaylist(
        accessToken!,
        playlistName,
        user!.id
      );
      if (playlistDetails) {
        console.log(playlistDetails);
        setPlaylistId(playlistDetails.id);
        toast("Playlist created successfully");
      }
    }
  };

  const addSongToSpotifyPlaylist = async () => {
    if (!songName || !artistName) {
      toast("Please provide song and artist name");
    } else {
      if (playlistId) {
        const songDetails = await addSongToPlaylist(
          accessToken!,
          playlistId,
          songName,
          artistName
        );

        if (songDetails) {
          toast("Song added successfully");
        }
      }
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-details">
      <h1>BeatMatch</h1>

      {!playlistId && (
        <div>
          <section id="profile">
            <h2>
              Logged in as <span>{user.display_name}</span>
            </h2>
          </section>
          <input
            type="text"
            placeholder="Playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="song-input"
          />
          <button onClick={createPlaylistInSpotify}>Create Playlist</button>
        </div>
      )}
      {playlistId && (
        <div className="song-form">
          <input
            type="text"
            placeholder="Song name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            className="song-input"
          />
          <input
            type="text"
            placeholder="Artist name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            className="song-input"
          />
          <button onClick={addSongToSpotifyPlaylist} className="song-button">
            Add Song
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default UserDetails;
