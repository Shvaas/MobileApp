import {configureStore} from '@reduxjs/toolkit';
import {postSlice} from './postSlice';
import {userSessionSlice} from './userSessionSlice';
import {sessionSlice} from './sessionSlice';
import {apiSlice} from './apiSlice';

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    userSessions: userSessionSlice.reducer,
    sessions: sessionSlice.reducer,
    api: apiSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
