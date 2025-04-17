// src/redux/spotifyUserSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSpotifyProfile } from '../models/UserSpotifyProfile';

export interface SpotifyUserState {
  user: UserSpotifyProfile | null;
  accessToken: string | null;
}

export interface SetSpotifyUserPayload {
  user: UserSpotifyProfile;
  accessToken: string;
}

const initialState: SpotifyUserState = {
  user: null,
  accessToken: null,
};

const spotifyUserSlice = createSlice({
  name: 'spotifyUser',
  initialState,
  reducers: {
    setSpotifyUser(state, action: PayloadAction<SetSpotifyUserPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setSpotifyUser } = spotifyUserSlice.actions;
export default spotifyUserSlice.reducer;
