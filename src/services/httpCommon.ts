import axios from "axios";
import { envConfig } from "../config/config";
import { spotifyInterceptor } from "../interceptors/spotifyInterceptor";
import { toast } from "react-toastify";
import { NavigationRoutes } from "../models/NavigationRoutes";
import { tokenInterceptor } from "../interceptors/tokenInterceptor";
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

spotifyInterceptor(serverService, () => {
  console.warn("spotify Unauthorized detected!");
  // todo: handle spotify redirect
});
