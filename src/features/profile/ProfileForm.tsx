import { useEffect, useState } from "react"
import {
  useProfileMutation,
  useUpdateProfileMutation,
} from "../auth/authApiSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { type ProfileState, setProfile } from "./profileSlice"
import { toast } from "react-toastify"

type ProfileFormData = {
  firstName: string
  lastName: string
}

const INITIAL_FORM_VALUE: ProfileFormData = {
  firstName: "",
  lastName: "",
} as const

const ProfileForm = () => {
  const [fetchProfile, { isLoading: isFetching }] = useProfileMutation()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const user: ProfileState = useAppSelector(state => state.profile)
  const dispatch = useAppDispatch()
  const [formValue, setFormValue] =
    useState<ProfileFormData>(INITIAL_FORM_VALUE)
  const { firstName, lastName } = formValue
  const [edited, setEdited] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormValue(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (user.firstName && user.lastName) {
      setFormValue({
        firstName: user.firstName,
        lastName: user.lastName,
      })
    }
  }, [user.firstName, user.lastName])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const result = await fetchProfile(undefined).unwrap()
        dispatch(setProfile(result.body))
      } catch (error) {
        console.warn(error)
      }
    }

    if (!user.firstName || !user.lastName) {
      void fetchUserProfile()
    }
  }, [dispatch, fetchProfile, user.firstName, user.lastName])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if(firstName.length === 0 || lastName.length === 0){
        toast.warn('firstName and lastName is required !')
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

  if (isFetching) {
    return <div>Loading.....</div>
  }

  return (
    <>
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstName ?? "undefined"} {user.lastName ?? "undefined"}
        </h1>
        {edited ? (
          <form
            onSubmit={e => {
              void handleSubmit(e)
            }}
            className="form-edit"
          >
            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={lastName}
                  onChange={handleChange}
                  name="lastName"
                />
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={isUpdating} className="edit-button">
                {isUpdating ? "Updating..." : "Save"}
              </button>
              <button type="button" className="edit-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            className="edit-button"
            onClick={() => {
              setEdited(true)
            }}
          >
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  )
}

export default ProfileForm
