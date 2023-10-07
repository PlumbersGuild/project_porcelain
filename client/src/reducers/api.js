import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers) => {
      const credentials = JSON.parse(
        window.sessionStorage.getItem("credentials")
      );

      if (!credentials) {
        return headers;
      }

      console.log("credentials");

      const token = credentials.token;

      if (token) {
        headers.set("Authorization", token);
      }
      // else {

      // }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "api/books",
    }),
    getBookById: builder.query({
      query: (id) => `api/books/${id}`,
    }),
    editProduct: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/admin/products/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    addProduct: builder.mutation({
      query: (userInput) => ({
        url: "/admin/products/new",
        method: "POST",
        body: userInput,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `admin/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useEditProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
} = api;
