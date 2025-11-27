import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authSlice } from "../features/auth/authSlice"
import { profileSlice } from "../features/profile/profileSlice"
import { rtkQueryErrorLogger } from "./middlewares/rtkQueryErrorLogger"
import { authApi } from "../features/auth/services/authApi"
import { profileApi } from "../features/profile/services/profileApi"
import { storageMiddleware } from "./middlewares/storageMidlleware"
import { unauthenticatedMiddleware } from "./middlewares/unauthenticatedMiddleware"
import { STATE } from "../features/auth"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(authApi, authSlice, profileApi, profileSlice)
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

const loadInitState = (): Partial<RootState> => {
  const token = localStorage.getItem("token")
  const rememberMe = localStorage.getItem("rememberMe")
  const auth = localStorage.getItem("auth")

  if (!token && !rememberMe && !auth) return {}

  return {
    auth: {
      token,
      rememberMe: rememberMe === "true",
      isAuthenticated: auth === "true",
      status: STATE.IDLE,
    },
  }
}

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(
        authApi.middleware,
        profileApi.middleware,
        unauthenticatedMiddleware,
        rtkQueryErrorLogger,
        storageMiddleware.middleware,
      )
    },
    preloadedState,
  })
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore(loadInitState())

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
