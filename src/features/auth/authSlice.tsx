import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { AppDispatch } from "../../app/store"
import { toast } from "react-toastify"

type AuthState = {
  isAuthenticated: boolean
  token: string | null
  rememberMe: boolean
}

const getStoredAuthData = () => {
  const localToken = localStorage.getItem("token")
  const localAuth = localStorage.getItem("auth")
  if (localToken && localAuth === "true") {
    return {
      isAuthenticated: true,
      token: localToken,
      rememberMe: true,
    }
  }
  const sessionToken = sessionStorage.getItem("token")
  const sessionAuth = sessionStorage.getItem("auth")
  if (sessionToken && sessionAuth === "true") {
    return {
      isAuthenticated: true,
      token: sessionToken,
      rememberMe: false,
    }
  }
  return {
    isAuthenticated: false,
    token: null,
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

export const { setAuth, setToken, logout } =
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

export default authSlice.reducer
