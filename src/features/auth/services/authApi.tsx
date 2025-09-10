// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../../../app/store"
import type { LoginApiResponse } from "../types"



export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/user/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  reducerPath: "authApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Auth"],
  endpoints: build => ({
    login: build.mutation<
      LoginApiResponse,
      { email: string; password: string }
    >({
      query: credentials => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
} = authApi
