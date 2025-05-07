import { envConfig } from "../config/config";
import { UserSpotifyProfile } from "../models/UserSpotifyProfile";
import { spotifyService } from "./httpCommon";

export const redirectToSpotify = () => {
  window.location.href = `${import.meta.env.VITE_SPOTIFY_SERVICE_URL}/login`;
};

export const getUserDetails = async (): Promise<UserSpotifyProfile> => {
  const response = await spotifyService.get(
    `${envConfig.SPOTIFY_SERVICE_URL}/users/userDetails`
  );

  return response.data;
};

export const createPlaylist = async (playlistName: string) => {
  const response = await spotifyService.post(
    `${envConfig.SPOTIFY_SERVICE_URL}/playlists/createPlaylist`,
    {
      playlistName,
    }
  );

  return response.data;
};

export const addSongToPlaylist = async (
  playlistId: string,
  songName: string,
  artist: string
) => {
  const response = await spotifyService.post(
    `${envConfig.SPOTIFY_SERVICE_URL}/playlists/addSong`,
    {
      playlistId,
      songName,
      artist,
    }
  );

  return response.data;
};
