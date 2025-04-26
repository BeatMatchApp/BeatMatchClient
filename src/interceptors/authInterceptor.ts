import { AxiosInstance } from "axios";

export const authInterceptor = (
  axiosInstance: AxiosInstance,
  onUnauthorized: () => void
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("401 Unauthorized detected!");
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
};
