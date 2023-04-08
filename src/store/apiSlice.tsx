import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/';

//'https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/feed/313cbfd3-4fc1-4763-9d18-caedd0be4a63'
// https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/feed/post/{postid}/react

// Define a service using a base URL and expected endpoints
// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({baseUrl}),
//   endpoints: builder => ({
//     getPosts: builder.query({
//       query: () => 'feed/313cbfd3-4fc1-4763-9d18-caedd0be4a63',
//     }),
//     getPostsu: builder.query({
//       query: () => 'feed/313cbfd3-4fc1-4763-9d18-caedd0be4',
//     }),

//     updateLike: builder.mutation({
//       query: like => ({
//         url: 'feed/post/37f1687e-ce62-4076-b075-7c338bdf4034/react',
//         method: 'POST',
//         body: like,
//       }),
//     }),

//   }),
// });



export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'feed/313cbfd3-4fc1-4763-9d18-caedd0be4a63',
    }),

    // Orders
    updateReaction: builder.mutation({
      query: (like) => ({
        url: 'feed/post/37f1687e-ce62-4076-b075-7c338bdf4034/react',
        method: 'POST',
        body: like,
      }),
    }),

    // Payments
  }),
});

export const {useGetPostsQuery, useUpdateReactionMutation} = apiSlice;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints


// export const {useGetPostsQuery, useGetPostsu, updateLikeReaction} = apiSlice;
