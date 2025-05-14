import { envConfig } from "../config/config";
import { serverService } from "./httpCommon";

export const getEvents = async (): Promise<string[]> => {
  const response = await serverService.get(
    `${envConfig.BACKEND_SERVICE_URL}/meta/events`
  );

  return response.data?.events ?? [];
};

export const getMoods = async (): Promise<string[]> => {
  const response = await serverService.get(
    `${envConfig.BACKEND_SERVICE_URL}/meta/moods`
  );

  return response.data?.moods ?? [];
};
