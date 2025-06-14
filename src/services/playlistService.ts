import { Playlist, Song } from '../models/Playlist';
import { serverService } from './httpCommon.ts';
import { envConfig } from '../config/config.ts';

export interface CreatePlaylistBody {
  name: string;
  description: string;
  mood?: string;
  event?: string;
  songs: Song[];
}

export interface UpdatePlaylistBody {
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

  async updatePlaylist(
    playlistId: string,
    body: Partial<UpdatePlaylistBody>
  ): Promise<Playlist> {
    const response = await serverService.put(
      `${envConfig.BACKEND_SERVICE_URL}/playlist/${playlistId}`,
      {
        ...body,
      }
    );

    return response.data;
  }

  async deletePlaylist(
    playlistId: string,
    spotifyPlaylistId: string
  ): Promise<Playlist> {
    const response = await serverService.delete(
      `${envConfig.BACKEND_SERVICE_URL}/playlist`,
      {
        data: {
          playlistId,
          spotifyPlaylistId,
        },
      }
    );

    return response.data;
  }

  async getPlaylistById(playlistId: string): Promise<Playlist | null> {
    const response = await serverService.get(
      `${envConfig.BACKEND_SERVICE_URL}/playlist/${playlistId}`
    );

    return response.data || null;
  }
}

export const playlistService = new PlaylistService();
