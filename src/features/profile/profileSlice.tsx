import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { ProfileState } from "./types"


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
