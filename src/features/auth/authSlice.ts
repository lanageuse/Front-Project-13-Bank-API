import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { getStoredAuthData } from "./utils/utils"
import type { AuthState } from "./types"
import { STATE } from "./constants"

// Récupération de l'état initial depuis le localStorage/sessionStorage à l'aide de la function utilitaire getStoredAuthData
const initialState: AuthState = getStoredAuthData()
/**
 * Slice Redux pour la gestion de l'authentification
 */
export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    // Met à jour le statut d'authentification
    setAuth: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    }),
    // Stocke le token JWT
    setToken: create.reducer((state, action: PayloadAction<string>) => {
      state.token = action.payload
    }),
    setStatus : create.reducer((state, action : PayloadAction<typeof STATE[keyof typeof STATE]>)=>{
      state.status = action.payload
    }),
    // Déconnexion : réinitialise l'état et nettoie le stockage
    logout: create.reducer(state => {
      state.token = null
      state.isAuthenticated = false
    }),
  }),
})

export const { setAuth, setToken, logout } = authSlice.actions
export default authSlice.reducer
