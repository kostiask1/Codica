import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card as MCard,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { FC, lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { useGetCityHourlyQuery, useGetCityQuery } from "../../app/api"
const Chart = lazy(() => import("../../components/Chart"))

interface Props {
  city: string
  extended?: boolean
}

const Card: FC<Props> = ({ city, extended = false }) => {
  const { data, error, refetch, isLoading } = useGetCityQuery(city)
  const {
    data: dataHourly,
    isLoading: isLoadingHourly,
    refetch: refetchExtended,
  } = extended
    ? useGetCityHourlyQuery(city)
    : { data: [], isLoading: false, refetch: () => {} }

  if (error)
    return <>Error while loading, probably you entered city name wrong</>
  if (isLoading) return <></>

  const { main, weather, wind } = data

  console.log("wind:", wind)

  const refetchData = () => {
    if (extended) refetchExtended()
    refetch()
  }

  return (
    <>
      <MCard variant="outlined">
        <button onClick={refetchData}>Refetch</button>
        <CardContent>
          <Link to={`/${data.name}`}>
            <Typography variant="h5" component="span">
              {data.name}
            </Typography>
          </Link>
          <CardMedia
            component="img"
            height="60"
            image={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            style={{ aspectRatio: "1/1", width: "unset" }}
            alt={weather[0].main}
          />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Extend data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {extended && (
                <ul>
                  <li>feels_like: {Math.round(main.feels_like)}</li>
                  <li>temp: {Math.round(main.temp)}</li>
                  <li>temp_max: {Math.round(main.temp_max)}</li>
                  <li>temp_min: {Math.round(main.temp_min)}</li>
                  <li>humidity: {Math.round(main.humidity)}</li>
                </ul>
              )}
            </AccordionDetails>
          </Accordion>
          <Typography variant="h5" component="div">
            {weather[0].description}
          </Typography>
        </CardContent>
      </MCard>
      <Suspense fallback={<></>}>
        {!isLoadingHourly && extended && <Chart data={dataHourly} />}
      </Suspense>
    </>
  )
}

export default Card
