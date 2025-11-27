import { createListenerMiddleware } from "@reduxjs/toolkit"
import { authSlice } from "../../features/auth/authSlice"
import { authApi } from "../../features/auth/services/authApi" // import direct = pas d’import circulaire

export const storageMiddleware = createListenerMiddleware()


//Écoute du login (mutation RTK Query matchFulfilled)

storageMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: action => {
    const { token } = action.payload.body;
    const {remember} = action.meta.arg.originalArgs
    if (remember) {
      localStorage.setItem("token", token)
      localStorage.setItem("auth", "true")
      localStorage.setItem("rememberMe", "true")

      sessionStorage.removeItem("token")
      sessionStorage.removeItem("auth")
    } else {
      sessionStorage.setItem("token", token)
      sessionStorage.setItem("auth", "true")

      localStorage.removeItem("token")
      localStorage.removeItem("auth")
      localStorage.removeItem("rememberMe")
    }
  },
})

// Écouter spécifiquement l'action de logout pour supprimer les différents types de storage

storageMiddleware.startListening({
  actionCreator: authSlice.actions.logout,
  effect: () => {
    localStorage.clear()
    sessionStorage.clear()
  },
})
