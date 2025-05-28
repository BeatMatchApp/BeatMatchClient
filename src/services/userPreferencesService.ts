import { envConfig } from "../config/config";
import { UserPreferences } from "../models/interfaces/UserPreferences";
import { serverService } from "./httpCommon";

export const updatePreferences = async (userPreferences: UserPreferences) => {
  const response = await serverService.post(
    `${envConfig.BACKEND_SERVICE_URL}/userPreferences/updatePreferences`,
    { preferences: userPreferences }
  );

  return response;
};
