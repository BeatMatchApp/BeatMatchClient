import axios from "axios";
import { envConfig } from "../config/config";

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

const refreshTokenService = axios.create({
  baseURL: envConfig.BACKEND_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

serverService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        await refreshTokenService.get("/auth/refresh");

        return await axios(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        console.log("Error: ", refreshError);
      }
    }

    return Promise.reject(error);
  }
);