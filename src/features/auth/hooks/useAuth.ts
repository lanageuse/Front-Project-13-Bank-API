import { toast } from "react-toastify"
import { setAuth, setToken } from "../authSlice"
import type { LoginFormData } from "../types"
import { INITIAL_LOGIN_FORM_VALUE } from "../constants"
import { useState } from "react"
import { useLoginMutation, validateAuth } from "../services"
import { useAppDispatch } from "../../../app/hooks"
import { useNavigate } from "react-router"

/**
 * Hook personnalisé pour la gestion de l'authentification
 * @hook
 * @description Gère l'état du formulaire de connexion, la validation et la soumission
 * @returns {Object} Objet contenant les valeurs du formulaire et les handlers
 */
export const useAuth = () => {
  // État local du formulaire de connexion
  const [formValue, setFormValue] = useState<LoginFormData>(
    INITIAL_LOGIN_FORM_VALUE,
  )
  const { email, password, remember } = formValue
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  /**
   * Gestionnaire de changement des champs du formulaire
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, type, checked, value } = e.target
    setFormValue(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  /**
   * Gestionnaire de soumission du formulaire
   * @param {React.FormEvent<HTMLFormElement>} e - Événement de soumission
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    try {
      // Validation des données du formulaire
      const { isValid, errors } = validateAuth({ email, password })
      if (!isValid) {
        toast.warn(errors.join("\n"))
        return
      }
      // Tentative de connexion
      const result = await login({ email, password, remember }).unwrap()

      dispatch(setToken(result.body.token))
      dispatch(setAuth(true))

      setFormValue(INITIAL_LOGIN_FORM_VALUE)
      await navigate("/profile")
    } catch (error) {
      console.warn(error)
    }
  }

  return {
    formValue,
    handleChange,
    handleSubmit,
    isLoading,
  }
}
