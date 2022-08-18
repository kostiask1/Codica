import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { WeatherState } from "./types"
import { ICity } from "../types"
import { AppDispatch, RootState } from "./store"
import { setError } from "./appSlice"

const initialState: WeatherState = {
  cities: [],
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<ICity[]>) => {
      state.cities = action.payload
      localStorage.setItem("cities", JSON.stringify(action.payload))
    },
  },
})

export const { setCities } = weatherSlice.actions

export default weatherSlice.reducer

export const deleteCity = (city: string) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const cities = getState().weather.cities as ICity[]
    dispatch(setCities(cities.filter((c: ICity) => c.name !== city)))
    dispatch(setError("City deleted"))
  }
}
