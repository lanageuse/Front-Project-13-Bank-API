import { STATE } from "../constants"
import type { AuthState } from "../types"

export const getStoredAuthData = (): AuthState => {
    const localToken = localStorage.getItem("token")
    const localAuth = localStorage.getItem("auth")

    if (localToken && localAuth === "true") {
      return {
        isAuthenticated: true,
        token: localToken,
        rememberMe: true,
        status: STATE.IDLE
      }
    }
    const sessionToken = sessionStorage.getItem("token")
    const sessionAuth = sessionStorage.getItem("auth")
    if (sessionToken && sessionAuth === "true") {
      return {
        isAuthenticated: true,
        token: sessionToken,
        rememberMe: false,
        status: STATE.IDLE
      }
    }
    return {
      isAuthenticated: false,
      token: null,
      rememberMe: false,
      status: STATE.IDLE
    }
  }