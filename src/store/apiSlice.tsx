import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/';

//'https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/feed/313cbfd3-4fc1-4763-9d18-caedd0be4a63'
// https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/feed/post/{postid}/react

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
        url: 'feed/post/d4668569-4590-4787-9c11-4158fdaa9bd3/react',
        method: 'POST',
        body: like,
      }),
    }),

    // Payments
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: 'payment/create-subscription',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useGetPostsQuery, useUpdateReactionMutation, useCreatePaymentIntentMutation} = apiSlice;
