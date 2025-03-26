import { spotifyService } from "./httpCommon";

export const redirectToSpotify = async () => {
  window.location.href = `${spotifyService}/login`;
};
