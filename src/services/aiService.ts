import { envConfig } from "../config/config";
import { serverService } from "./httpCommon";
import {RefreshSong} from "../models/Playlist.ts";
export interface PlaylistSuggestionParams {
    favoriteArtist?: string;
    mood?: string;
}

export interface PlaylistCreationBody {
    vibe: string,
    activity: string,
}

export interface PlaylistRefreshBody {
    vibe: string,
    activity: string,
    songs: RefreshSong[],
    requestChangesText?: string
}

export const getAiPlaylistSuggestionAnswer = async (params: PlaylistSuggestionParams) => {
    const response = await serverService.get(
        `${envConfig.BACKEND_SERVICE_URL}/musicalAIConsultant/suggestion`,
        {
            params: { ...params },
        }
    );

    return response.data;
};

export const getAiPlaylistCreationAnswer = async (body: PlaylistCreationBody)=> {
    const response = await serverService.post(
        `${envConfig.BACKEND_SERVICE_URL}/musicalAIConsultant/createPlaylist`,
        {
            ...body
        }
    );

    return response.data;
}

export const refreshAiPlaylist = async (body: PlaylistRefreshBody) => {
    const response = await serverService.post(
        `${envConfig.BACKEND_SERVICE_URL}/musicalAIConsultant/refreshPlaylist`,
        {
            ...body
        }
    );

    return response.data;
}