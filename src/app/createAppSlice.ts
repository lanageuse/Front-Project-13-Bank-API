import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

/**
 * Créateur de slice personnalisé avec support des thunks asynchrones
 * @description Utilise buildCreateSlice de Redux Toolkit pour créer des slices avec des thunks async intégrés
 * @constant {Function} createAppSlice - Fonction pour créer des slices avec support async
 */
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
