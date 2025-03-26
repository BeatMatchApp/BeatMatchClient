import axios from "axios";

const spotifyService = axios.create({
  baseURL: import.meta.env.SPOTIFY_SERVICE_URL + "/api",
  headers: {
    "Content-type": "application/json",
  },
});
