import { createApi} from "@reduxjs/toolkit/query/react"
import type { LoginApiResponse } from "../types"
import { fetchAuthBaseQuery } from "../../shared/api/prepareAuthHeaders";

/**
 * Configuration de l'API d'authentification avec RTK Query
 * 
 * Cette API gère toutes les requêtes liées à l'authentification des utilisateurs
 * Elle utilise un baseQuery personnalisé @fetchAuthBaseQuery qui gère automatiquement les headers d'authentification
 */

export const authApi = createApi({
  baseQuery: fetchAuthBaseQuery,
  reducerPath: "authApi",
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

export const { endpoints } = authApi
