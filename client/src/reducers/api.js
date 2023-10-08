import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

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
          url: `api/admin/products/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    addProduct: builder.mutation({
      query: (userInput) => ({
        url: "api/admin/products/new",
        method: "POST",
        body: userInput,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `api/admin/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    users: [],
    books: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          books: payload,
        };
      }
    ),
      builder.addMatcher(
        api.endpoints.deleteProduct.matchFulfilled,
        (state, { payload }) => {
          return {
            ...state,
            books: state.books.filter((book) => book.id !== payload.id),
          };
        }
      ),
      builder.addMatcher(
        api.endpoints.addProduct.matchFulfilled,
        (state, { payload }) => {
          state.books.push(payload);
          return state;
        }
      );
  },
});

export default dataSlice.reducer;

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useEditProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
} = api;
