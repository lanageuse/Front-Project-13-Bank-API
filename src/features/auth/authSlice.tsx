import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { AppDispatch } from "../../app/store"
import { toast } from "react-toastify"

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
  rememberMe: boolean
}

const getStoredAuthData = () => {
  const localToken = localStorage.getItem("token")
  const localAuth = localStorage.getItem("auth")
  if (localToken && localAuth === "true") {
    return {
      isAuthenticated: true,
      token: localToken,
      loginError: null,
      rememberMe: true,
    }
  }
  const sessionToken = sessionStorage.getItem("token")
  const sessionAuth = sessionStorage.getItem("auth")
  if (sessionToken && sessionAuth === "true") {
    return {
      isAuthenticated: true,
      token: sessionToken,
      loginError: null,
      rememberMe: false,
    }
  }
  return {
    isAuthenticated: false,
    token: null,
    loginError: null,
    rememberMe: false,
  }
}

const initialState: AuthState = getStoredAuthData()

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
      localStorage.removeItem("rememberMe")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("auth")
    }
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
      localStorage.setItem("rememberMe", "true")

      sessionStorage.removeItem("token")
      sessionStorage.removeItem("auth")
    }else{
      sessionStorage.setItem("token", token)
      sessionStorage.setItem("auth", "true")
  
      localStorage.removeItem("token")
      localStorage.removeItem("auth")
      localStorage.removeItem("rememberMe")
    }
    toast.success("Login sucess")
  }

export const handleLoginError = (error: unknown) => (dispatch: AppDispatch) => {
  let errorMessage = "Erreur de connexion"
  if (error && typeof error === "object" && "status" in error) {
    const rtkError = error as RTKQueryError
    errorMessage = rtkError.data?.message ?? "erreur inconnue"
  }
  console.error("erreur de login : ", errorMessage)
  dispatch(setLoginError(errorMessage))
  toast.warn(errorMessage)
}

export default authSlice.reducer
