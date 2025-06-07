import { Playlist } from '../models/Playlist';

const mockPlaylists: Playlist[] = [
  {
    id: '1',
    userId: 'user123',
    name: 'playlist1',
    context: '',
    songs: [
      { songName: 'Song A', artist: 'Artist A' },
      { songName: 'Song B', artist: 'Artist B' },
      { songName: 'Song C', artist: 'Artist C' },
      { songName: 'Song D', artist: 'Artist D' },
      { songName: 'Song E', artist: 'Artist E' },
      { songName: 'Song F', artist: 'Artist F' },
      { songName: 'Song G', artist: 'Artist G' },
      { songName: 'Song H', artist: 'Artist H' },
    ],
    creationTime: new Date('2025-04-15'),
    lastUpdatedTime: new Date('2025-05-20'),
  },
  {
    id: '2',
    userId: 'user123',
    name: 'playlist1',
    context: '',
    songs: [
      { songName: 'Song A', artist: 'Artist A' },
      { songName: 'Song B', artist: 'Artist B' },
      { songName: 'Song C', artist: 'Artist C' },
      { songName: 'Song D', artist: 'Artist D' },
      { songName: 'Song E', artist: 'Artist E' },
    ],
    creationTime: new Date('2025-04-15'),
    lastUpdatedTime: new Date('2025-05-20'),
  },
  {
    id: '3',
    userId: 'user123',
    name: 'playlist1',
    context: 'my playlist context',
    songs: [],
    creationTime: new Date('2025-04-15'),
    lastUpdatedTime: new Date('2025-05-20'),
  },
  {
    id: '4',
    userId: 'user123',
    name: 'playlist1',
    context: '',
    songs: [
      { songName: 'Song A', artist: 'Artist A' },
      { songName: 'Song B', artist: 'Artist B' },
      { songName: 'Song C', artist: 'Artist C' },
      { songName: 'Song D', artist: 'Artist D' },
      { songName: 'Song E', artist: 'Artist E' },
    ],
    creationTime: new Date('2025-04-15'),
    lastUpdatedTime: new Date('2025-05-20'),
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
