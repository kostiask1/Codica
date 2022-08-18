import CityForm from "../../components/CityForm"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import Card from "../../components/Card/Card"
import { ICity } from "../../types"

const List = () => {
  const [cities] = useLocalStorage("cities", [])
  return (
    <>
      <CityForm />
      {!!cities.length &&
        cities.map(
          (city: ICity) => city.show && <Card key={city.id} city={city.name} />
        )}
    </>
  )
}

export default List
