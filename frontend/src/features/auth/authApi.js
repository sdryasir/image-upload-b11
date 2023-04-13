import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/v1/'}),
    endpoints:(builder)=>({
      login: builder.mutation({
          query: (body) => ({
              url: `auth/login`,
              method: 'POST',
              body: body,
            }),
      }),
      logout: builder.mutation({
        query: () => ({
            url: `auth/logout`,
            method: 'POST'
          }),
      })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation
} = authApi;