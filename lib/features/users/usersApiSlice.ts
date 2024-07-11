// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UsersApiResponse {
  users: User[];
}

// Define a service using a base URL and expected endpoints
export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOVFXU3ZNMkp6RmpGaThRSU5mRiIsImVtYWlsIjoiZW1haTIxMTIzbCIsIm5hbWUiOiJURVNUIiwiaWF0IjoxNzIwNjkxNzAxLCJleHAiOjE3MjA3MjA1MDF9.NIJQTjnMnABX0DLx9bh2O726BpQ8Em2PE9sFB1hRekI",
    },
  }),
  reducerPath: "usersApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<UsersApiResponse, number>({
      query: (limit = 10) => `fetch-user-data?limit=${limit}`,
      providesTags: (result, error, id) =>
        result?.users?.map(({ id }) => ({ type: "Users", id })) ?? [
          { type: "Users", id },
        ],
    }),
    createUser: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: build.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/update-user-data/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
