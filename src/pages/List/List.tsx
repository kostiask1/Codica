import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import Card from "../../components/Card/Card"
import CityForm from "../../components/CityForm"
import { ICity } from "../../types"

const List = () => {
  const cities = useAppSelector((state: RootState) => state.weather.cities)
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
