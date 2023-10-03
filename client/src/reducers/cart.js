import { api } from "./api";

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
	}),
});

export const {
	useAddNewCartItemMutation,
	useEditCartItemMutation,
	useDeleteCartItemMutation,
} = cartApi;

export default cartApi;
