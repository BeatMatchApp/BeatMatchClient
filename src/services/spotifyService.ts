import { spotifyService } from "./httpCommon";

export const redirectToSpotify = () => {
  window.location.href = `${import.meta.env.VITE_SPOTIFY_SERVICE_URL}/login`;
};

export const getUserDetails = async (token: string) => {
  const response = await spotifyService.get(
    `${
      import.meta.env.VITE_SPOTIFY_SERVICE_URL
    }/userDetails/?accessToken=${token}`
  );

  return response.data;
};
