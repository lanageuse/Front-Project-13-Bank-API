import { useEffect, useState } from "react"
import {
  type ProfileFormData,
  type ProfileState,
} from "../types"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { toast } from "react-toastify"
import { setProfile } from "../profileSlice"
import { useUpdateProfileMutation } from "../services/profileApi"
import { validateProfile } from "../services/profileValidation"
import { INITIAL_PROFILE_FORM_VALUE } from "../constants"

/**
 * Hook pour gérer le formulaire de modification du profil utilisateur.
 * Gère l'état du formulaire, la validation, la soumission et l'annulation.
 * 
 * @returns {Object} retourne updateProfile, isUpdating, firstName, lastName, edited, setEdited, handleChange, handleSubmit, handleCancel
 */

export const useProfileForm = () => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const user: ProfileState = useAppSelector(state => state.profile)
  const [formValue, setFormValue] =
    useState<ProfileFormData>(INITIAL_PROFILE_FORM_VALUE)
  const { firstName, lastName } = formValue
  const [edited, setEdited] = useState(false)
  const dispatch = useAppDispatch()

  // Pré-remplit le formulaire avec les données du store
  useEffect(() => {
    if (user.firstName && user.lastName) {
      setFormValue({
        firstName: user.firstName,
        lastName: user.lastName,
      })
    }
  }, [user.firstName, user.lastName])

  // Met à jour les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormValue(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  // Soumet le formulaire après validation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
     const {isValid, errors} = validateProfile({firstName, lastName})
     if(!isValid){
      toast.warn(errors.join('\n \n'))
      return 
     }
      // Appel API de mise à jour et mise à jour du store
      const result = await updateProfile({ firstName, lastName }).unwrap()
      dispatch(setProfile(result.body))
      setEdited(!edited)
      toast.success(result.message)
    } catch (error) {
      console.warn(error)
    }
  }

  // Annule l'édition et restaure les valeurs depuis le store
  const handleCancel = () => {
    setEdited(!edited)
    if (user.firstName !== null && user.lastName !== null) {
      setFormValue({
        firstName: user.firstName,
        lastName: user.lastName,
      })
    }
  }

  return {
    user,
    updateProfile,
    isUpdating,
    firstName,
    lastName,
    edited,
    setEdited,
    handleChange,
    handleSubmit,
    handleCancel
  }
}
