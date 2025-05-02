import axios from "axios";
import { envConfig } from "../config/config";
import { authInterceptor } from "../interceptors/authInterceptor";
import { NavigationRoutes } from "../models/NavigationRoutes";
import { toast } from "react-toastify";

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

authInterceptor(serverService, () => {
  console.warn("401 Unauthorized detected!");
  toast.error("Session expired. Please log in again.");

  setTimeout(() => {
    window.location.href = NavigationRoutes.REGISTER_SPOTIFY;
  }, 2000);
});
