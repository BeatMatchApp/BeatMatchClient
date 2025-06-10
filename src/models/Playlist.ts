export interface Playlist {
    id: string;
    userId: string;
    name: string;
    description: string;
    songs: Song[];
    spotifyPlaylistId: string;
    mood: string;
    event: string;
    url?:string;
    imageUrl?:string;
    creationDate: Date;
    lastUpdatedDate: Date;
}


export interface Song {
    id?: number
    name: string;
    artist: string;
    trackUri?: string;
}

export interface RefreshSong {
    name: string,
    artist: string,
    trackUri?: string;
    isReplace: boolean
}