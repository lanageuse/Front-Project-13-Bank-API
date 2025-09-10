import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import type { RootState } from "../../../app/store"

export const prepareAuthHeaders = (headers: Headers, { getState } : {getState : ()=>unknown}) => {
  const state = getState() as RootState
  const token = state.auth.token
  if (token) {
    headers.set("authorization", `Bearer ${token}`)
  }
  return headers
}

export const fetchAuthBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_ENDPOINT_URL as string,
  prepareHeaders: prepareAuthHeaders,
})
