import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const CREDENTIALS = "credentials";

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		me: builder.query({
			query: () => "auth/me",
		}),
		login: builder.mutation({
			query: (cred) => ({
				url: "auth/login",
				method: "POST",
				body: cred,
			}),
		}),
		register: builder.mutation({
			query: (cred) => ({
				url: "auth/register",
				method: "POST",
				body: cred,
			}),
		}),
		logout: builder.mutation({
			queryFn: () => ({ data: {} }),
		}),
	}),
});

function storeToken(state, { payload }) {
	state.credentials = {
		token: payload.token,
	};
	window.sessionStorage.setItem(
		CREDENTIALS,
		JSON.stringify({
			token: payload.token,
		})
	);
}

const authSlice = createSlice({
	name: "auth",
	initialState: {
		credentials: JSON.parse(
			window.sessionStorage.getItem(CREDENTIALS)
		) || {
			token: "",
		},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.login.matchFulfilled,
			storeToken
		);
		builder.addMatcher(
			api.endpoints.register.matchFulfilled,
			storeToken
		);
		builder.addMatcher(
			api.endpoints.logout.matchFulfilled,
			(state) => {
				state.credentials = {
					token: "",
				};
				window.sessionStorage.removeItem(CREDENTIALS);
				window.localStorage.removeItem("cart");
			}
		);
	},
});

export default authSlice.reducer;

export const {
	useMeQuery,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
} = authApi;
