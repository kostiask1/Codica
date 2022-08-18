import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { setCities } from "../../app/weatherSlice"
import { ICity } from "../../types"

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
    if (isExist !== -1) return
    dispatch(
      setCities([
        ...cities,
        { name: city, show: true, id: new Date().getTime() },
      ])
    )
    setCity("")
  }
  const deleteCity = (id: number) => {
    const citiesClone = [...cities]
    const index = cities.findIndex((c: ICity) => c.id === id)
    citiesClone.splice(index, 1)
    dispatch(setCities(citiesClone))
  }

  const handleCityShow = (id: number) => {
    const citiesClone: ICity[] = JSON.parse(JSON.stringify(cities))
    const index = citiesClone.findIndex((city) => city.id === id)
    citiesClone[index].show = !citiesClone[index].show
    dispatch(setCities(citiesClone))
  }
  return (
    <>
      {!!cities.length && (
        <ul>
          {cities.map((city: ICity) => (
            <li key={city.id}>
              <input
                type="checkbox"
                name={city.id.toString()}
                id={city.id.toString()}
                onChange={() => handleCityShow(city.id)}
                checked={city.show}
              />
              <label htmlFor={city.id.toString()}>{city.name}</label>
              <button onClick={() => deleteCity(city.id)}>x</button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={addCity}>
        <input
          type="text"
          name="new_city"
          id="new_city"
          value={city}
          onChange={handleCityInput}
        />
        <button type="submit">Add city</button>
      </form>
    </>
  )
}

export default CityForm
