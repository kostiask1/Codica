import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card as MCard,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { FC, lazy, useState } from "react"
import { Link } from "react-router-dom"
import { useGetCityQuery } from "../../app/api"
import { useAppDispatch } from "../../app/hooks"
import { deleteCity } from "../../app/weatherSlice"
import CelciusIcon from "../CelciusIcon"
const Chart = lazy(() => import("../../components/Chart"))

interface Props {
  city: string
  extended?: boolean
}

const Card: FC<Props> = ({ city, extended = false }) => {
  const dispatch = useAppDispatch()
  const { data, error, refetch, isLoading } = useGetCityQuery(city)
  const [expanded, setExpanded] = useState<string | false>(extended && "panel1")

  const handledeleteCity = (name: string) => dispatch(deleteCity(name))

  if (error)
    return (
      <>
        Error while loading <b>{city}</b>, probably you entered city name wrong.
        <Button variant="contained" onClick={() => handledeleteCity(city)}>
          Delete
        </Button>{" "}
        this city
      </>
    )
  if (isLoading) return <></>

  const { main, weather } = data

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <>
      <MCard variant="outlined">
        <button onClick={refetch}>Update data</button>
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
          <Typography variant="h5" component="div">
            {weather[0].description}
          </Typography>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Extend data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  feels_like: {Math.round(main.feels_like)} <CelciusIcon />
                </li>
                <li>
                  temp: {Math.round(main.temp)} <CelciusIcon />
                </li>
                <li>
                  temp_max: {Math.round(main.temp_max)} <CelciusIcon />
                </li>
                <li>
                  temp_min: {Math.round(main.temp_min)} <CelciusIcon />
                </li>
                <li>
                  humidity: {Math.round(main.humidity)} <CelciusIcon />
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </MCard>
      {extended && <Chart key={data} city={city} />}
    </>
  )
}

export default Card
