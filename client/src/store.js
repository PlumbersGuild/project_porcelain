import { configureStore } from "@reduxjs/toolkit";
import { api } from "./reducers/api";
import authReducer from "./reducers/auth";
import cartReducer from "./reducers/cart";

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		auth: authReducer,
		cart: cartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export default store;
