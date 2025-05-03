import axios, { AxiosInstance } from "axios";
import { refreshTokenService } from "../services/httpCommon";

export const tokenInterceptor = (
  axiosInstance: AxiosInstance,
  onUnauthorized: () => void
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response.status === 403 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/user/login")
      ) {
        originalRequest._retry = true;
  
        try {
          await refreshTokenService.get("/user/refresh");
  
          return await axios(originalRequest);
        } catch {
          onUnauthorized();

          return Promise.resolve({ __unauthorized: true });
        }
      }
  
      return Promise.reject(error);
    }
  );
};
