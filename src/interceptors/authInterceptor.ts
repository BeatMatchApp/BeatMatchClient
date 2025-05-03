import { AxiosInstance } from "axios";

export const authInterceptor = (
  axiosInstance: AxiosInstance,
  onUnauthorized: () => void
) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized();

        return Promise.resolve({ __unauthorized: true });
      }

      return Promise.reject(error);
    }
  );
};
