import { Grid } from "@mui/material"
import { useAppSelector, useDebounce } from "../../app/hooks"
import { RootState } from "../../app/store"
import Card from "../../components/Card"
import CityForm from "../../components/CityForm"
import { ICity } from "../../types"
import { useEffect, useState } from "react"

const List = () => {
  const cities = useAppSelector((state: RootState) => state.cities.array)
  const [width, setWidth] = useState(window.innerWidth)
  const debouncedWidth = useDebounce(width, 500)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return (
    <>
      <CityForm />
      <Grid container spacing={2}>
        {!!cities.length &&
          cities.map(
            (city: ICity) =>
              city.show && (
                <Grid item xs={debouncedWidth > 767 ? 6 : 12} key={city.id}>
                  <Card city={city.name} />
                </Grid>
              )
          )}
      </Grid>
    </>
  )
}

export default List
