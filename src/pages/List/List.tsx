import { Grid } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import Card from "../../components/Card"
import CityForm from "../../components/CityForm"
import { ICity } from "../../types"

const List = () => {
  const cities = useAppSelector((state: RootState) => state.cities.array)
  return (
    <>
      <CityForm />
      <Grid container spacing={2}>
        {!!cities.length &&
          cities.map(
            (city: ICity) =>
              city.show && (
                <Grid item xs={6} key={city.id}>
                  <Card city={city.name} />
                </Grid>
              )
          )}
      </Grid>
    </>
  )
}

export default List
