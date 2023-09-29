import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

const CREDENTIALS = "credentials";

const authApi = api.injectEndpoints({
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
  console.log(state);
  state.credentials = { token: payload.token, user: { ...payload.user } };
  window.sessionStorage.setItem(
    CREDENTIALS,
    JSON.stringify({
      token: payload.token,
      user: { ...payload.user },
    })
  );
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    credentials: JSON.parse(window.sessionStorage.getItem(CREDENTIALS)) || {
      token: "",
      user: { userId: null },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
      console.log("logout");
      state.credentials = {
        token: "",
        user: { userId: null },
      };
      window.sessionStorage.removeItem(CREDENTIALS);
    });
  },
});

export default authSlice.reducer;

export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
