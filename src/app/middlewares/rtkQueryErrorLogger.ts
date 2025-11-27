import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit"
import type { Middleware } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

function getMessageType(action: any) : {message :string, status ?: number | string} {
  const message =
    action.payload?.data?.message ??
    action.payload?.data ??
    action.error?.message ??
    "Une erreur est survenue"

  const status =
    action.payload?.status ??
    action.payload?.originalStatus ??
    action.error?.status ??
    ""
  return { message, status}
}

/**
 * Middleware de gestion des erreurs RTK Query
 * @description Intercepte les actions rejetées et affiche des notifications d'erreur
 * @param {Middleware} - Middleware Redux pour la gestion centralisée des erreurs
 * @returns {Function} Le middleware configuré
 */
export const rtkQueryErrorLogger: Middleware = () => next => (action) => {
  // Vérifie si l'action est une action rejetée avec une valeur ou sans valeur
  if (isRejectedWithValue(action) || isRejected(action)) {
    // Affiche une notification toast avec le message d'erreur retourné
    const {message, status} = getMessageType(action)
    toast.error(`${message} ${status ? " (" + status + ")" : ""}`)
    getMessageType(action)
  }
  return next(action)
}
