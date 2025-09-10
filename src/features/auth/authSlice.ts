import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { getStoredAuthData } from "./utils/utils"
import type {AuthState } from "./types"

// Récupération de l'état initial depuis le localStorage/sessionStorage à l'aide de la function utilitaire getStoredAuthData
const initialState: AuthState = getStoredAuthData()

/**
 * Slice Redux pour la gestion de l'authentification
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Met à jour le statut d'authentification
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    
    // Stocke le token JWT
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    
    // Déconnexion : réinitialise l'état et nettoie le stockage
    logout: state => {
      state.token = null
      state.isAuthenticated = false

      localStorage.removeItem("token")
      localStorage.removeItem("auth")
      localStorage.removeItem("rememberMe")

      sessionStorage.removeItem("token")
      sessionStorage.removeItem("auth")
    }
  },
})


export const { setAuth, setToken, logout } = authSlice.actions
export default authSlice.reducer
