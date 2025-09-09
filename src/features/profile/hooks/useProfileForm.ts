import { useEffect, useState } from "react"
import {
  INITIAL_FORM_VALUE,
  type ProfileFormData,
  type ProfileState,
} from "../types"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { toast } from "react-toastify"
import { setProfile } from "../profileSlice"
import { useUpdateProfileMutation } from "../services/profileApi"
import { validateProfile } from "../services/profileValidation"

export const useProfileForm = () => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const user: ProfileState = useAppSelector(state => state.profile)
  const [formValue, setFormValue] =
    useState<ProfileFormData>(INITIAL_FORM_VALUE)
  const { firstName, lastName } = formValue
  const [edited, setEdited] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user.firstName && user.lastName) {
      setFormValue({
        firstName: user.firstName,
        lastName: user.lastName,
      })
    }
  }, [user.firstName, user.lastName])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormValue(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
     const {isValid, errors} = validateProfile({firstName, lastName})
     if(!isValid){
      toast.warn(errors.join('\n \n'))
      return 
     }
      const result = await updateProfile({ firstName, lastName }).unwrap()
      dispatch(setProfile(result.body))
      setEdited(!edited)
      toast.success(result.message)
    } catch (error) {
      console.warn(error)
    }
  }

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
