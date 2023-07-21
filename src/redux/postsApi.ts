import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../models/post';

const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<IPost[], void>({
      query: () => 'posts',
    }),
  }),
});

export const { useFetchPostsQuery } = postsApi;
export default postsApi;
