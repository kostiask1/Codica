import { useLocalStorage } from "../../hooks"
import { useState } from "react"
import { ICity } from "../../types"

const CityForm = () => {
  const [cities, setCities] = useLocalStorage("cities", [])
  const [city, setCity] = useState("")

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value.trim())
  }

  const addCity = (e: React.FormEvent) => {
    e.preventDefault()
    const isExist = cities.findIndex((c: ICity) => c.name === city)
    console.log("isExist:", isExist)
    if (isExist !== -1) return
    setCities([...cities, { name: city, show: true, id: new Date().getTime() }])
    setCity("")
  }
  const deleteCity = (id: number) => {
    const citiesClone = [...cities]
    const index = cities.findIndex((c: ICity) => c.id === id)
    citiesClone.splice(index, 1)
    setCities(citiesClone)
  }

  const handleCityShow = (id: number) => {
    const citiesClone = [...cities]
    const index = citiesClone.findIndex((city) => city.id === id)
    citiesClone[index].show = !citiesClone[index].show
    setCities(citiesClone)
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
