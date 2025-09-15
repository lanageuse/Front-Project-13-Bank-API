import { createListenerMiddleware } from "@reduxjs/toolkit"
import { authSlice } from "../features/auth/authSlice"

export const storageMiddleware = createListenerMiddleware()

// Écouter spécifiquement l'action de loginUser fulfilled
storageMiddleware.startListening({
  actionCreator: authSlice.actions.loginUser.fulfilled,
  effect: action => {
    const token = action.payload.token
    const remember = action.payload.remember
    //configure le type de storage en fonction du choix utilisateur
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
    localStorage.removeItem("token")
    localStorage.removeItem("auth")
    localStorage.removeItem("rememberMe")

    sessionStorage.removeItem("token")
    sessionStorage.removeItem("auth")
  },
})
