import { Playlist, Song } from '../models/Playlist';
import { serverService } from './httpCommon.ts';
import { envConfig } from '../config/config.ts';

export interface CreatePlaylistBody {
  name: string;
  description: string;
  mood?: string | null;
  event?: string | null;
  songs: Song[];
}

class PlaylistService {
  async getUserPlaylists(): Promise<Playlist[]> {
    const response = await serverService.get(
      `${envConfig.BACKEND_SERVICE_URL}/playlist`
    );

    return response.data || [];
  }

  async createPlaylist(body: CreatePlaylistBody): Promise<Playlist> {
    const response = await serverService.post(
      `${envConfig.BACKEND_SERVICE_URL}/playlist`,
      {
        ...body,
      }
    );

    return response.data;
  }
}

export const playlistService = new PlaylistService();
