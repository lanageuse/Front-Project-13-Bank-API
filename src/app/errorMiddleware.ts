import { isRejectedWithValue } from "@reduxjs/toolkit"
import type { Middleware } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    console.warn(action)
    if (
      action.payload &&
      typeof action.payload === "object" &&
      "status" in action.payload
    ) {
      toast.warn(
        "data" in action.payload
          ? (action.payload.data as { message: string }).message
          : action.error.message,
      )
    }
  }
  return next(action)
}
