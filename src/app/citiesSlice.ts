import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { setStorage } from "../helpers"
import { ICity } from "../types"
import { setError, setSuccess } from "./appSlice"
import { AppDispatch, RootState } from "./store"
import { CitiesState } from "./types"

const initialState: CitiesState = {
  array: [],
}

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state: CitiesState, action: PayloadAction<ICity[]>) => {
      state.array = action.payload
      setStorage("cities", action.payload)
    },
    addCity: (state: CitiesState, action: PayloadAction<ICity>) => {
      state.array = [...state.array, action.payload]
      setStorage("cities", state.array)
    },
  },
})

export const { setCities, addCity } = citiesSlice.actions

export default citiesSlice.reducer

export const deleteCity = (city: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const cities = getState().cities.array as ICity[]
    await dispatch(setCities(cities.filter((c: ICity) => c.name !== city)))
    dispatch(setError("City deleted"))
  }
}

export const saveCity = (city: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const cities = getState().cities.array as ICity[]
    if (city.length < 2) return dispatch(setError("City name is too short"))
    const isExist = cities.findIndex((c: ICity) => c.name === city)
    if (isExist !== -1) return dispatch(setError("City already exist"))
    await dispatch(
      addCity({ name: city, show: true, id: new Date().getTime() })
    )
    dispatch(setSuccess("City added"))
  }
}
