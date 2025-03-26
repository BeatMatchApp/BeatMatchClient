export interface UserSpotifyProfile {
  id: string;
  email: string;
  display_name: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
}
