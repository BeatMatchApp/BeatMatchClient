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
    const playlistDetails = await createPlaylist(
      accessToken!,
      "tryCarmel",
      user!.id
    );
    if (playlistDetails) {
      console.log(playlistDetails);
      setPlaylistId(playlistDetails.id);
      toast("Playlist created successfully");
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
      <h1>Display your Spotify profile data</h1>

      <section id="profile">
        <h2>
          Logged in as <span>{user.display_name}</span>
        </h2>
      </section>
      <button onClick={createPlaylistInSpotify}>Create Playlist</button>
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
