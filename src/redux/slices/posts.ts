import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../models/post';

export type SortBy = keyof IPost;

interface IPostsState {
  allPosts: IPost[] | null;
  posts: IPost[] | null;
  currentPage: number;
  postsPerPage: number;
  search: string | null;
  start: number;
  sortBy: SortBy;
  sortMethod: 'asc' | 'dsc';
  postsCount: number;
}

function customSort(
  array: IPost[],
  sortBy: SortBy,
  sortMethod: IPostsState['sortMethod'],
): IPost[] {
  const compareFn = (a: IPost, b: IPost) => {
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];

    // Определяем порядок для сортировки по возрастанию или убыванию
    const order = sortMethod === 'asc' ? 1 : -1;

    // Сравниваем значения для сортировки
    if (fieldA < fieldB) {
      return -1 * order;
    } else if (fieldA > fieldB) {
      return 1 * order;
    } else {
      return 0;
    }
  };

  return array.slice().sort(compareFn); // Возвращаем новый отсортированный массив
}

const initialState: IPostsState = {
  allPosts: null,
  posts: null,
  currentPage: 1,
  start: 0,
  postsPerPage: 10,
  search: null,
  sortBy: 'id',
  sortMethod: 'asc',
  postsCount: 0,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAllPosts(state, action: PayloadAction<IPostsState['allPosts']>) {
      if (action.payload) {
        state.allPosts = action.payload;
        state.postsCount = action.payload.length;
      }
    },
    setPosts(state) {
      if (state.allPosts) {
        state.allPosts = customSort(state.allPosts, state.sortBy, state.sortMethod);
        if (state.search) {
          state.allPosts = state.allPosts.filter(
            (post) =>
              post.title.toLowerCase().includes(state.search?.toLowerCase() ?? '') ||
              post.body.toLowerCase().includes(state.search?.toLowerCase() ?? ''),
          );
          state.postsCount = state.allPosts.length - 1;
        }
        state.posts = state.allPosts.slice(state.start, state.postsPerPage * state.currentPage);
      }
    },
    setSearch(state, action: PayloadAction<IPostsState['search']>) {
      state.search = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<IPostsState['currentPage']>) {
      state.currentPage = action.payload;
      state.start = Math.floor((state.currentPage - 1) * state.postsPerPage);
    },
    setSort(
      state,
      action: PayloadAction<{
        sortBy: IPostsState['sortBy'];
        sortMethod: IPostsState['sortMethod'];
      }>,
    ) {
      const { sortBy, sortMethod } = action.payload;

      state.sortBy = sortBy;
      state.sortMethod = sortMethod;
    },
  },
});

export const { setPosts, setSearch, setCurrentPage, setAllPosts, setSort } = postsSlice.actions;
export default postsSlice.reducer;
