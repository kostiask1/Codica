import { ICity } from "../types"

export interface WeatherState {
  cities: ICity[]
}

export interface AppState {
  error: string
  success: string
}
