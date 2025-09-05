import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { AppDispatch } from "../../app/store"

// Type pour les erreurs RTK Query
type RTKQueryError = {
  status: number
  data?: {
    message?: string
  }
}

type AuthState = {
  isAuthenticated: boolean
  token: string | null
  loginError: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loginError: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setLoginError: (state, action: PayloadAction<string | null>) => {
      state.loginError = action.payload
    },
    clearLoginError: state => {
      state.loginError = null
    },
    logout: state => {
      state.token = null
      state.isAuthenticated = false
      state.loginError = null
      localStorage.removeItem("token")
      localStorage.removeItem("auth")
    },
  },
})

export const { setAuth, setToken, setLoginError, clearLoginError, logout } =
  authSlice.actions

export const handleLoginSucess =
  (token: string, remember: boolean) => (dispatch: AppDispatch) => {
    dispatch(setToken(token))
    dispatch(setAuth(true))
    if (remember) {
      localStorage.setItem("token", token)
      localStorage.setItem("auth", "true")
    }
  }

export const handleLoginError = (error: unknown) => (dispatch: AppDispatch) => {
  let errorMessage = "Errur de connexion"
  if (error && typeof error === 'object' && 'status' in error) {
    const rtkError = error as RTKQueryError
    errorMessage = rtkError.data?.message ?? "erreur inconnue"
  }
  console.error("erreur de login : ", errorMessage)
  dispatch(setLoginError(errorMessage))
}

export default authSlice.reducer
