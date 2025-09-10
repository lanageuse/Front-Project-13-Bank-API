import { createApi } from "@reduxjs/toolkit/query/react"
import type { ProfileApiResponse } from "../types"
import { fetchAuthBaseQuery } from "../../shared/api/prepareAuthHeaders";

export const profileApi = createApi({
  baseQuery: fetchAuthBaseQuery,
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

export const { useProfileMutation, useUpdateProfileMutation } = profileApi
