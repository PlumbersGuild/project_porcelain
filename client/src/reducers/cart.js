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
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/api/cart/update/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/api/cart/delete/${id}`,
        method: "DELETE",
      }),
    }),
    getCartItems: builder.query({
      query: () => "/api/cart",
    }),
    submitOrder: builder.mutation({
      query: (userInput) => ({
        url: "/api/order/submit",
        method: "POST",
        body: userInput,
      }),
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
      ),
      builder.addMatcher(
        cartApi.endpoints.editCartItem.matchFulfilled,
        (state, { payload }) => {
          return {
            cart: state.cart.map((item) =>
              item.product.id === payload.product.id ? payload : item
            ),
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
  useSubmitOrderMutation,
} = cartApi;

export default cartSlice.reducer;
