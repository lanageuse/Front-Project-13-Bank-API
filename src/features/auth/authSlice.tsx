import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { getStoredAuthData } from "./utils/utils"
import type {AuthState } from "./types"

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

export const { setAuth, setToken, logout } = authSlice.actions
export default authSlice.reducer
