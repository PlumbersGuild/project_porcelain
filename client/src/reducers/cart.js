import { api } from "./api";
import { createSlice } from "@reduxjs/toolkit";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addNewCartItem: builder.mutation({
      query: (userInput) => ({
        url: "/api/cart/new",
        method: "POST",
        body: userInput,
      }),
    }),
    editCartItem: builder.mutation({
      query: (userInput) => ({
        url: "/api/cart/update",
        method: "PUT",
        body: userInput,
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (userInput) => ({
        url: "/api/cart/delete",
        method: "DELETE",
        body: userInput,
      }),
    }),
    getCartItems: builder.query({
      query: () => "/api/cart",
    }),
  }),
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.addNewCartItem.matchFulfilled,
      (state, { payload }) => {
        return {
          cart: payload,
        };
      }
    ),
      builder.addMatcher(
        cartApi.endpoints.getCartItems.matchFulfilled,
        (state, { payload }) => {
          return {
            cart: payload,
          };
        }
      );
  },
});

export const {
  useAddNewCartItemMutation,
  useEditCartItemMutation,
  useDeleteCartItemMutation,
  useGetCartItemsQuery,
} = cartApi;

export default cartSlice.reducer;
