// API RTK Query pour le profil utilisateur
import { createApi } from "@reduxjs/toolkit/query/react"
import type { ProfileApiResponse } from "../types"
import { fetchAuthBaseQuery } from "../../utils/api/prepareAuthHeaders";

/**
 * Configuration de l'API de récupération des données utilisateur
 * 
 * Cette API gère toutes les requêtes liées à la récupération des données utilisateurs
 * Elle utilise un baseQuery personnalisé @fetchAuthBaseQuery qui gère automatiquement les headers d'authentification
 */

export const profileApi = createApi({
  baseQuery: fetchAuthBaseQuery,
  reducerPath: "profileApi",
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
