import CloseIcon from "@mui/icons-material/Close"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material"
import { useState } from "react"
import { setError, setSuccess } from "../../app/appSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import { deleteCity, setCities } from "../../app/citiesSlice"
import { ICity } from "../../types"
import { capitalizeFirstLetter } from "../../helpers"

const CityForm = () => {
  const dispatch = useAppDispatch()
  const cities = useAppSelector((state: RootState) => state.cities.array)
  const [city, setCity] = useState("")

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.trim().length < 40) setCity(capitalizeFirstLetter(value))
  }

  const addCity = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.length < 2) return dispatch(setError("City name is too short"))
    const isExist = cities.findIndex((c: ICity) => c.name === city)
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
        <Grid container>
          {cities.map((city: ICity) => (
            <Grid item xs={4} key={city.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={city.show}
                    onChange={() => handleCityShow(city.id)}
                  />
                }
                label={city.name}
              />
              <IconButton
                color="error"
                size="small"
                onClick={() => handledeleteCity(city.name)}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      )}
      <Box component="form" mb={2} onSubmit={addCity}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          value={city}
          onChange={handleCityInput}
          autoComplete="off"
          size="small"
        />
        <Button type="submit" variant="contained" sx={{ ml: 1 }}>
          Add city
        </Button>
      </Box>
    </>
  )
}

export default CityForm
