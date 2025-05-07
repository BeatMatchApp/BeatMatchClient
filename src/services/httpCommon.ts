import axios from "axios";
import { envConfig } from "../config/config";
import { spotifyInterceptor } from "../interceptors/spotifyInterceptor";
import { toast } from "react-toastify";
import { NavigationRoutes } from "../models/NavigationRoutes";
import { tokenInterceptor } from "../interceptors/tokenInterceptor";
import { redirectToSpotify } from "./spotifyService";

export const spotifyService = axios.create({
  baseURL: envConfig.SPOTIFY_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export const serverService = axios.create({
  baseURL: envConfig.BACKEND_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

tokenInterceptor(serverService, () => {
  console.warn("401 Unauthorized detected!");
  toast.error("Session expired. Please log in again.");

  setTimeout(() => {
    window.location.href = NavigationRoutes.LOGIN;
  }, 2000);
});

spotifyInterceptor(spotifyService, () => {
  console.warn("spotify Unauthorized detected!");

  setTimeout(() => {
    redirectToSpotify();
  }, 2000);
});
