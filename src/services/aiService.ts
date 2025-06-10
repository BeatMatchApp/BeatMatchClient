import { envConfig } from "../config/config";
import { serverService } from "./httpCommon";
import {RefreshSong} from "../models/Playlist.ts";
export interface PlaylistSuggestionParams {
    favoriteArtist?: string;
    mood?: string;
}

export interface PlaylistCreationBody {
    mood: string,
    event: string,
}

export interface PlaylistRefreshBody {
    mood: string,
    event: string,
    songs: RefreshSong[],
    requestChangesText?: string
}

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