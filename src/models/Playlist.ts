import { TrackDetails } from './AiResponse';

export interface Playlist {
  id: string;
  userId: string;
  name: string;
  context: string;
  songs: TrackDetails[];
  creationTime: Date;
  lastUpdatedTime: Date;
}
