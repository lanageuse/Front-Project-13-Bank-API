import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ProfileApiResponse } from "../types"
import type { RootState } from "../../../app/store"




export const profileApi = createApi({
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
  reducerPath: "profileApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Profile"],
  endpoints: build => ({
    profile: build.mutation<ProfileApiResponse, undefined>({
      query: () => ({
        url: "/profile",
        method: "POST",
      }),
    }),
    updateProfile: build.mutation<
      ProfileApiResponse,
      { firstName: string; lastName: string } 
      >({
      query: credentials => ({
        url: "/profile",
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
})

export const {
  useProfileMutation,
  useUpdateProfileMutation,
} = profileApi
