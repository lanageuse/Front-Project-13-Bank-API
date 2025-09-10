import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { ProfileState } from "./types"

// État initial du profil utilisateur
const initialState: ProfileState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  createdAt: null,
  updatedAt: null,
}

// Slice Redux pour le profil
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Met à jour les champs du profil
    setProfile: (state : ProfileState, action: PayloadAction<Partial<ProfileState>>) => {
     Object.assign(state, action.payload)
    }
  },
})

// Export des actions
export const { setProfile } = profileSlice.actions
