import { isRejectedWithValue } from "@reduxjs/toolkit"
import type { Middleware } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

/**
 * Middleware de gestion des erreurs RTK Query
 * @description Intercepte les actions rejetées et affiche des notifications d'erreur
 * @param {Middleware} - Middleware Redux pour la gestion centralisée des erreurs
 * @returns {Function} Le middleware configuré
 */
export const rtkQueryErrorLogger: Middleware = () => next => action => {
  // Vérifie si l'action est une action rejetée avec une valeur
  if (isRejectedWithValue(action)) {
    console.warn(action)
    
    // Vérifie la structure du payload pour extraire le message d'erreur
    if (
      action.payload &&
      typeof action.payload === "object" &&
      "status" in action.payload
    ) {
      // Affiche une notification toast avec le message d'erreur approprié
      toast.warn(
        "data" in action.payload
          ? (action.payload.data as { message: string }).message
          : action.error.message,
      )
    }
  }
  return next(action)
}
