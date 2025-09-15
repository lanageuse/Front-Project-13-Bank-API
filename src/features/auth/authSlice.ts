import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { getStoredAuthData } from "./utils/utils"
import type { AuthState, LoginFormData } from "./types"
import { endpoints } from "./services/authApi"
import { toast } from "react-toastify"

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
    // LoginUser en cas de succés
    loginUser: create.asyncThunk(
      async (params: LoginFormData, { dispatch }) => {
        const result = await dispatch(endpoints.login.initiate(params)).unwrap()
          return { token: result.body.token, remember: params.remember, message : result.message }
      },
      {
        pending : (state) => {
          state.status = "loading"
        },
        fulfilled: (state, action ) => {
          const {token, message} = action.payload
          state.token = token
          state.isAuthenticated = true
          state.status = "success"
         
          toast.success(message)
        },
        rejected : (state, action) => {
          state.status = 'error'
          toast.error(action.error.message ?? 'Login failed')
        }
      },
    ),
    // Déconnexion : réinitialise l'état et nettoie le stockage
    logout: create.reducer(state => {
      state.token = null
      state.isAuthenticated = false
    }),
  }),
})

export const { setAuth, setToken, loginUser, logout } = authSlice.actions
export default authSlice.reducer
