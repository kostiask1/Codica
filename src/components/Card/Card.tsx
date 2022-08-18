import {
  Card as MCard,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { FC } from "react"
import { useGetCityQuery } from "../../app/api"

interface Props {
  city: string
  extended?: boolean
}

const Card: FC<Props> = ({ city, extended = false }) => {
  if (!city) return null

  const { data, isLoading } = useGetCityQuery(city)

  if (isLoading) return <></>

  const { main, weather, wind } = data

  console.log("wind:", wind)

  console.log("data:", data)

  return (
    <>
      <MCard variant="outlined">
        <CardContent>
          <Typography variant="h5" component="span">
            {data.name}
          </Typography>
          <CardMedia
            component="img"
            height="60"
            image={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            style={{ aspectRatio: "1/1", width: "unset" }}
            alt={weather[0].main}
          />
          {extended && (
            <ul>
              <li>feels_like: {Math.round(main.feels_like)}</li>
              <li>temp: {Math.round(main.temp)}</li>
              <li>temp_max: {Math.round(main.temp_max)}</li>
              <li>temp_min: {Math.round(main.temp_min)}</li>
              <li>humidity: {Math.round(main.humidity)}</li>
            </ul>
          )}
          <Typography variant="h5" component="div">
            {weather[0].description}
          </Typography>
        </CardContent>
      </MCard>
      <div />
    </>
  )
}

export default Card
