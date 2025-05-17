import { AxiosInstance } from "axios";

export const tokenInterceptor = (
  axiosInstance: AxiosInstance,
  onUnauthorized: () => void
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        !originalRequest.url.includes("/user/login")
      ) {
        onUnauthorized();

        return Promise.resolve({ __unauthorized: true });
      }

      return Promise.reject(error);
    }
  );
};
