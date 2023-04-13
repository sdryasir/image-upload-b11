import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
    reducerPath:'todoApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/v1/'}),
    tagTypes: ['Todo'],
    endpoints:(builder)=>({
      getAllTodos: builder.query({
        query: (url) => url,
        providesTags:['Todo']
      }),
      getTodoById: builder.query({
        query: (id) => `todo/${id}`,
        providesTags:['Todo']
      }),
      deleteTodo: builder.mutation({
        query: (id) => ({
            url: `todo/delete/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags:['Todo']
      }),
      updateTodo: builder.mutation({
        query: ({ id, ...rest }) => ({
            url: `todo/update/${id}`,
            method: 'PUT',
            body: rest,
          }),
          invalidatesTags:['Todo']
      }),
      AddTodo: builder.mutation({
          query: (body) => ({
              url: `todo/new`,
              method: 'POST',
              body: body,
            }),
            invalidatesTags:['Todo']
      })
    })
})

export const {
  useGetAllTodosQuery, 
  useGetTodoByIdQuery, 
  useDeleteTodoMutation, 
  useUpdateTodoMutation,
  useAddTodoMutation 
} = todoApi;