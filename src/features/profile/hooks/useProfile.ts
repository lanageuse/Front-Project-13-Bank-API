import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import type { ProfileState } from "../types"
import { setProfile } from "../profileSlice"
import { useProfileMutation } from "../services/profileApi"

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