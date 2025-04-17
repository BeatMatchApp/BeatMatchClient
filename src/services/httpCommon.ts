import axios from "axios";
import { envConfig } from "../config/config";

export const spotifyService = axios.create({
  baseURL: envConfig.SPOTIFY_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const serverService = axios.create({
  baseURL: envConfig.BACKEND_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
  },
});