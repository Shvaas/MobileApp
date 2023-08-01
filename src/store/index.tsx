import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from "redux";

import {postSlice} from './postSlice';
import {userSessionSlice} from './userSessionSlice';
import {sessionSlice} from './sessionSlice';
import {apiSlice} from './apiSlice';
import {userSlice} from './userSlice';
import {yogiSlice} from './yogiSlice';

const reducers = combineReducers({
  posts: postSlice.reducer,
  userSessions: userSessionSlice.reducer,
  sessions: sessionSlice.reducer,
  user: userSlice.reducer,
  yogi: yogiSlice.reducer,
  api: apiSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'yogi'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
