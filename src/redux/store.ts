import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/posts';
import postsApi from './postsApi';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
