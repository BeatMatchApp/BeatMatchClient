import { AxiosInstance } from "axios";
import { SPOTIFY_UNAUTHORIZED } from "../shared/consts";

export const spotifyInterceptor = (
  axiosInstance: AxiosInstance,
  onUnauthorized: () => void
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === SPOTIFY_UNAUTHORIZED) {
        onUnauthorized();

        return Promise.resolve({ __unauthorized: true });
      }

      return Promise.reject(error);
    }
  );
};
