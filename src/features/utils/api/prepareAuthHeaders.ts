import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import type { RootState } from "../../../app/store"

/**
 * Prépare les headers d'authentification pour les requêtes API.
 * Ajoute automatiquement le token Bearer si présent dans le store.
 * 
 * @param {Headers} headers - Les headers de la requête à modifier
 * @param {Object} options - Options contenant la fonction getState
 * @param {Function} options.getState - Fonction pour accéder au state Redux
 * @returns {Headers} Headers modifiés avec le token d'authentification
 */
export const prepareAuthHeaders = (headers: Headers, { getState } : {getState : ()=>unknown}) => {
  const state = getState() as RootState
  const token = state.auth.token
  if (token) {
    headers.set("authorization", `Bearer ${token}`)
  }
  return headers
}

/**
 * Instance de fetchBaseQuery configurée avec l'URL de base et l'authentification automatique.
 * Utilise prepareAuthHeaders pour ajouter le token Bearer à chaque requête.
 * 
 * @returns {Function} Instance configurée de fetchBaseQuery
 */
export const fetchAuthBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_ENDPOINT_URL as string,
  prepareHeaders: prepareAuthHeaders,
})
