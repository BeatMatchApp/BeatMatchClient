import { envConfig } from "../config/config";
import { serverService } from "./httpCommon";
export interface GeminiParams {
  favoriteArtist?: string;
  mood?: string;
}

export const getGeminiAnswer = async (geminiParams: GeminiParams) => {
  const response = await serverService.get(
    `${envConfig.BACKEND_SERVICE_URL}/playlist/suggestion`,
    {
      params: { geminiParams },
    }
  );

  return response.data;
};
