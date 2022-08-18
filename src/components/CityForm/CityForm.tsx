import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { deleteCity, setCities } from "../../app/weatherSlice"
import { ICity } from "../../types"
import { setError, setSuccess } from "../../app/appSlice"
import { Checkbox, FormControlLabel, List, ListItem } from "@mui/material"

const CityForm = () => {
  const dispatch = useAppDispatch()
  const cities = useAppSelector((state: RootState) => state.weather.cities)
  const [city, setCity] = useState("")

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value.trim())
  }

  const addCity = (e: React.FormEvent) => {
    e.preventDefault()
    const isExist = cities.findIndex((c: ICity) => c.name === city)
    console.log("isExist:", isExist)
    if (isExist !== -1) return dispatch(setError("City already exist"))
    dispatch(
      setCities([
        ...cities,
        { name: city, show: true, id: new Date().getTime() },
      ])
    )
    dispatch(setSuccess("City added"))
    setCity("")
  }

  const handledeleteCity = (name: string) => dispatch(deleteCity(name))

  const handleCityShow = (id: number) => {
    const citiesClone: ICity[] = JSON.parse(JSON.stringify(cities))
    const index = citiesClone.findIndex((city) => city.id === id)
    citiesClone[index].show = !citiesClone[index].show
    dispatch(setCities(citiesClone))
  }
  return (
    <>
      {!!cities.length && (
        <List>
          {cities.map((city: ICity) => (
            <ListItem key={city.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={city.show}
                    onChange={() => handleCityShow(city.id)}
                  />
                }
                label={city.name}
              />
              <button onClick={() => handledeleteCity(city.name)}>x</button>
            </ListItem>
          ))}
        </List>
      )}
      <form onSubmit={addCity}>
        <input
          type="text"
          name="new_city"
          id="new_city"
          value={city}
          onChange={handleCityInput}
          minLength={2}
          maxLength={40}
        />
        <button type="submit">Add city</button>
      </form>
    </>
  )
}

export default CityForm
