import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { WeatherState } from "./types"

const initialState: WeatherState = {
  value: 0,
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = weatherSlice.actions

export default weatherSlice.reducer
