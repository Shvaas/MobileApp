import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/';

//'https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/feed/313cbfd3-4fc1-4763-9d18-caedd0be4a63'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => 'feed/313cbfd3-4fc1-4763-9d18-caedd0be4a63',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetPostsQuery} = apiSlice;
