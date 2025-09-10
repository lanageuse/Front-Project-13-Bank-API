import { toast } from "react-toastify"
import type { AppDispatch } from "../../../app/store"
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
      const {isValid, errors} = validateAuth({email, password})
      if(!isValid){
        toast.warn(
          errors.join('\n')
        )
        return
      }
      
      // Tentative de connexion
      const result = await login({ email, password }).unwrap()
      const token = result.body.token
      dispatch(handleLoginSucess(token, remember))
      setFormValue(INITIAL_LOGIN_FORM_VALUE)
      void navigate("/profile")
    } catch (error) {
      console.warn(error)
    }
  }
  
  /**
   * Gestionnaire de succès de connexion
   * @param {string} token - Token JWT reçu
   * @param {boolean} remember - Indique si l'utilisateur veut rester connecté
   * @returns {Function} Thunk Redux pour gérer l'état d'authentification
   */
  const handleLoginSucess =
    (token: string, remember: boolean) => (dispatch: AppDispatch) => {
      dispatch(setToken(token))
      dispatch(setAuth(true))
      
      // Gestion & nettoyage du type de storage utilisé en function des choix utilisateur   
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
      toast.success("Login sucess")
    }

  return {
    formValue,
    handleLoginSucess,
    handleChange,
    handleSubmit,
    isLoading
  }
}
