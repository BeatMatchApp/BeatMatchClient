import { envConfig } from "../config/config";
import { UserSpotifyProfile } from "../models/UserSpotifyProfile";
import { spotifyService } from "./httpCommon";

export const redirectToSpotify = () => {
  window.location.href = `${import.meta.env.VITE_SPOTIFY_SERVICE_URL}/login`;
};

export const getUserDetails = async (
  token: string
): Promise<UserSpotifyProfile> => {
  const response = await spotifyService.get(
    `${envConfig.SPOTIFY_SERVICE_URL}/users/userDetails/?accessToken=${token}`
  );

  return response.data;
};

export const createPlaylist = async (
  accessToken: string,
  playlistName: string,
  userId: string
) => {
  const response = await spotifyService.post(
    `${envConfig.SPOTIFY_SERVICE_URL}/playlists/createPlaylist`,
    {
      accessToken,
      playlistName,
      userId,
    }
  );

  return response.data;
};

export const addSongToPlaylist = async (
  accessToken: string,
  playlistId: string,
  songName: string,
  artist: string
) => {
  const response = await spotifyService.post(
    `${envConfig.SPOTIFY_SERVICE_URL}/playlists/addSong`,
    {
      accessToken,
      playlistId,
      songName,
      artist,
    }
  );

  return response.data;
};
