export type ProfileState = {
  id: string | null
  email: string | null
  firstName: string | null
  lastName: string | null
  createdAt: string | null
  updatedAt: string | null
}

export type ProfileFormData = {
  firstName: string
  lastName: string
}

export type ProfileApiResponse = {
  body: {
    email: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
    id: string
  }
  message: string
  status: number
}

export const INITIAL_FORM_VALUE: ProfileFormData = {
  firstName: "",
  lastName: "",
} as const