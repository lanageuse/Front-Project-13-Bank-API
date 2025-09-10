import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setProfile } from "../profileSlice"
import { useProfileMutation } from "../services/profileApi"
import type { ProfileState } from "../types"

/**
 * Hook pour récupérer et gérer le profil utilisateur.
 * @description Charge automatiquement le profil depuis l'API si absent du store.
 * @returns {Object} retourne le profil utilisateur, état de chargement, erreur et une fonction de rechargement
 */
export const useProfile = () => {
  const [fetchProfile, { isLoading }] = useProfileMutation()
  const user: ProfileState = useAppSelector(state => state.profile)
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setError(null)
        const result = await fetchProfile(undefined).unwrap()
        dispatch(setProfile(result.body))
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
        setError(errorMessage)
        console.error('Erreur lors de la récupération du profil:', error)
      }
    }
    if (!user.firstName && !user.lastName) {
      void fetchUserProfile()
    }
  }, [dispatch, fetchProfile, user.firstName, user.lastName])

  return {
    user,
    isLoading,
    error,
    refetch: () => fetchProfile(undefined)
  }
}