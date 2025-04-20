// src/redux/spotifyUserSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSpotifyProfile } from "../models/UserSpotifyProfile";

export interface SpotifyUserState {
  user: UserSpotifyProfile | null;
}

export interface SetSpotifyUserPayload {
  user: UserSpotifyProfile;
}

const initialState: SpotifyUserState = {
  user: null,
};

const spotifyUserSlice = createSlice({
  name: "spotifyUser",
  initialState,
  reducers: {
    setSpotifyUser(state, action: PayloadAction<SetSpotifyUserPayload>) {
      state.user = action.payload.user;
    },
  },
});

export const { setSpotifyUser } = spotifyUserSlice.actions;
export default spotifyUserSlice.reducer;
