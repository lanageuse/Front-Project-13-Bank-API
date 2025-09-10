// Need to use the React-specific entry point to import `createApi`
import { createApi} from "@reduxjs/toolkit/query/react"
import type { LoginApiResponse } from "../types"
import { fetchAuthBaseQuery } from "../../shared/api/prepareAuthHeaders";



export const authApi = createApi({
  baseQuery: fetchAuthBaseQuery,
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
