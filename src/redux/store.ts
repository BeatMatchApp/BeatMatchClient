import { configureStore } from '@reduxjs/toolkit';
import userReducer from './spotifyUserSlice'; // or './redux/userSlice' depending on path

export const store = configureStore({
  reducer: {
    spotifyUser: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
