import { envConfig } from "../config/config";
import { serverService } from "./httpCommon";
export interface PlaylistSuggestionParams {
    favoriteArtist?: string;
    mood?: string;
}

export const getAiPlaylistSuggestionAnswer = async (params: PlaylistSuggestionParams) => {
    const response = await serverService.get(
        `${envConfig.BACKEND_SERVICE_URL}/playlist/suggestion`,
        {
            params: { ...params },
        }
    );

    return response.data;
};
