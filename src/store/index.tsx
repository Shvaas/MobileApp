import {configureStore} from '@reduxjs/toolkit';
import {postSlice} from './postSlice';
import {apiSlice} from './apiSlice';

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    api: apiSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
