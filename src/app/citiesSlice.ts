import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { CitiesState } from "./types"
import { ICity } from "../types"
import { AppDispatch, RootState } from "./store"
import { setError } from "./appSlice"

const initialState: CitiesState = {
  array: [],
}

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<ICity[]>) => {
      state.array = action.payload
      localStorage.setItem("cities", JSON.stringify(action.payload))
    },
  },
})

export const { setCities } = citiesSlice.actions

export default citiesSlice.reducer

export const deleteCity = (city: string) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const cities = getState().cities.array as ICity[]
    dispatch(setCities(cities.filter((c: ICity) => c.name !== city)))
    dispatch(setError("City deleted"))
  }
}
