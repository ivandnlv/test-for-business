import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../models/post';

interface IPostsState {
  posts: IPost[] | null;
  currentPage: number;
  postsPerPage: number;
  search: string | null;
  start: number;
  sortBy: 'id' | 'title' | 'body';
  sortMethod: 'asc' | 'dsc';
  postsCount: number;
}

const initialState: IPostsState = {
  posts: null,
  currentPage: 1,
  start: 0,
  postsPerPage: 9,
  search: null,
  sortBy: 'id',
  sortMethod: 'asc',
  postsCount: 0,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<IPostsState['posts']>) {
      if (action.payload) {
        state.postsCount = action.payload.length;
        state.posts = action.payload.slice(state.start, state.postsPerPage * state.currentPage);
      }
    },
    setSearch(state, action: PayloadAction<IPostsState['search']>) {
      state.search = action.payload;
    },
  },
});

export const { setPosts, setSearch } = postsSlice.actions;
export default postsSlice.reducer;
