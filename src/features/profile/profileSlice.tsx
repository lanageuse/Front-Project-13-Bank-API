import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export type ProfileState = {
  id: string | null
  email: string | null
  firstName: string | null
  lastName: string | null
  createdAt: string | null
  updatedAt: string | null
}
const initialState: ProfileState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  createdAt: null,
  updatedAt: null,
}
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state : ProfileState, action: PayloadAction<Partial<ProfileState>>) => {
     Object.assign(state, action.payload)
    }
  },
})

export const { setProfile } = profileSlice.actions
