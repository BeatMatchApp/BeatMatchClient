import { Playlist } from "../models/Playlist";

const mockPlaylists: Playlist[] = [
  {
    id: '1',
    userId: 'user123',
    name: 'playlist1',
    context: '',
    songs: [
      'song 1',
      'song 2',
      'song 3',
      'song 4',
      'song 5'
    ],
    creationTime: new Date('2025-04-15'),
    lastUpdatedTime: new Date('2025-05-20')
  },
  {
    id: '2',
    userId: 'user123',
    name: 'playlist1',
    context: '',
    songs: [
      'song 1',
      'song 2',
      'song 3',
      'song 4',
      'song 5'
    ],
    creationTime: new Date('2025-04-15'),
    lastUpdatedTime: new Date('2025-05-20')
  },
  {
    id: '3',
    userId: 'user123',
    name: 'playlist1',
    context: 'playlist context',
    songs: [],
    creationTime: new Date('2025-04-15'),
    lastUpdatedTime: new Date('2025-05-20')
  },
  {
    id: '4',
    userId: 'user123',
    name: 'playlist1',
    context: '',
    songs: [
      'song 1',
      'song 2',
      'song 3',
      'song 4',
      'song 5'
    ],
    creationTime: new Date('2025-04-15'),
    lastUpdatedTime: new Date('2025-05-20')
  },
];

class PlaylistService {
  async getUserPlaylists(): Promise<Playlist[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPlaylists);
      }, 1000);
    });
  }

}

export const playlistService = new PlaylistService();
