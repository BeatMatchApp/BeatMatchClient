import { envConfig } from "../config/config";
import { backendService } from "./httpCommon";

export const getGeminiAnswer = async (favoriteArtist: string | null, mood: string | null) => {
  const response = await backendService.get(
    `${envConfig.BACKEND_SERVICE_URL}/playlist/suggestion`, {
      params: { favoriteArtist, mood }
    }
  );

  return response.data;
};

