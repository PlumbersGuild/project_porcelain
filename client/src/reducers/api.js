import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "api/books",
    }),
    getBookById: builder.query({
      query: (id) => `api/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = api;
