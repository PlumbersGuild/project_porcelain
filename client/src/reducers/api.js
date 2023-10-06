import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

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
	}),
});

export const { useGetBooksQuery, useGetBookByIdQuery } =
	api;
