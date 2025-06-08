export interface Playlist {
    id: string;
    userId: string;
    name: string;
    description: string;
    songs: Song[];
    spotifyPlaylistId: string;
    vibe: string;
    activity: string;
    creationDate: Date;
    lastUpdatedDate: Date;
}


export interface Song {
    id?: number
    name: string;
    artist: string
}

export interface RefreshSong {
    name: string,
    artist: string,
    isReplace: boolean
}