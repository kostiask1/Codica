import { configureStore } from "@reduxjs/toolkit"
import appReducer from "./appSlice"
import weatherReducer from "./weatherSlice"
import { weatherApi } from "./api"

export const store = configureStore({
  reducer: {
    app: appReducer,
    weather: weatherReducer,
    weatherApi: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
