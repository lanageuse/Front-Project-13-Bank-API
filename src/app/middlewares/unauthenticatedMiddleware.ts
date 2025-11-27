import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit"
import { logout } from "../../features/auth"

/**
 * Middleware de gestion des erreurs 401 (token expire)
 * @description Intercepte les actions rejetées avec le status 401, dispatch logout et redirige
 * @param {Middleware} - Middleware Redux pour la gestion des erreurs 401
 * @returns {Function} Le middleware configuré
 */
export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    if (
      isRejectedWithValue(action) &&
      action.payload &&
      typeof action.payload === "object" &&
      "status" in action.payload &&
      action.payload.status === 401
    ) {
      // Déconnexion
      dispatch(logout())
      // Redirection vers login
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    }
    
    return next(action)
  }
