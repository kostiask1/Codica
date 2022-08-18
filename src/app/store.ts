import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./weatherSlice"
import { weatherApi } from "./api"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    weatherApi: weatherApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
