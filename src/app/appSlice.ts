import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import { AppState } from "./types"

const initialState: AppState = {
  error: "",
  success: "",
}

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    error: (state: AppState, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    success: (state: AppState, action: PayloadAction<string>) => {
      state.success = action.payload
    },
  },
})

export default app.reducer

export const { error, success } = app.actions

let timer: boolean = false

export const setError = (msg: string) => {
  return (dispatch: AppDispatch) => {
    if (timer) {
      dispatch(error(""))
      timer = false
    }
    timer = true
    setTimeout(() => dispatch(error(msg)))
  }
}

export const setSuccess = (msg: string) => {
  return (dispatch: AppDispatch) => {
    if (timer) {
      dispatch(success(""))
      timer = false
    }
    timer = true
    setTimeout(() => dispatch(success(msg)))
  }
}
