import { ICity } from "../types"

export interface CitiesState {
  array: ICity[]
}

export interface AppState {
  error: string
  success: string
}
