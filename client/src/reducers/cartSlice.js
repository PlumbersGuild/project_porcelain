import { createSlice } from "@reduxjs/toolkit";
import cartApi from "./cart";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
	},
	// reducers: {
	// 	addToCart(state, action) {
	// 		state.push(action.payload);
	// 	},
	// },
	extraReducers: (builder) => {
		builder.addMatcher(
			cartApi.endpoints.addNewCartItem.matchFulfilled,
			(state, { payload }) => {
				state.cart.push(payload);
				return state;
			}
		);
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
