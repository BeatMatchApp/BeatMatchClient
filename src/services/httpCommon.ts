import axios from "axios";

export const spotifyService = axios.create({
  baseURL: import.meta.env.SPOTIFY_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const backendService = axios.create({
  baseURL: import.meta.env.BACKEND_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
  },
});