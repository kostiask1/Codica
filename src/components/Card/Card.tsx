import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import RefreshIcon from "@mui/icons-material/Refresh"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Card as MCard,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import { FC, lazy, useState } from "react"
import { Link } from "react-router-dom"
import { useGetCityQuery } from "../../app/api"
import { useAppDispatch } from "../../app/hooks"
import { deleteCity } from "../../app/weatherSlice"
import CloseIcon from "@mui/icons-material/Close"
import { Box } from "@mui/material"
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

  const { main, weather, wind } = data

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <>
      <MCard variant="outlined" sx={{ backgroundColor: "#9ce2ff" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={refetch}
            variant="contained"
            endIcon={<RefreshIcon />}
          >
            Update data
          </Button>
          <IconButton
            color="error"
            size="small"
            onClick={() => handledeleteCity(data.name)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <CardContent>
          <Link
            to={`/${data.name}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h4" component="span">
              {data.name}
            </Typography>
            <Typography sx={{ ml: 5 }} variant="h6">
              {Math.round(main.temp)} °C
            </Typography>
            <CardMedia
              component="img"
              height="60"
              image={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              style={{ aspectRatio: "1/1", width: "unset" }}
              alt={weather[0].main}
            />
          </Link>
          <Typography variant="h5" component="div">
            {weather[0].description.charAt(0).toUpperCase() +
              weather[0].description.slice(1)}
          </Typography>
          <Accordion
            expanded={expanded === "panel1"}
            sx={{ mt: 2 }}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {expanded === "panel1" ? "Hide" : "Extend"} data
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText
                        sx={{ maxWidth: 90 }}
                        primary="Feels like:"
                      />
                      <ListItemText
                        primary={`${Math.round(main.feels_like)} °C`}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText sx={{ maxWidth: 90 }} primary="Temp max:" />
                      <ListItemText
                        primary={`${Math.round(main.temp_max)} °C`}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText sx={{ maxWidth: 90 }} primary="Temp min:" />
                      <ListItemText
                        primary={`${Math.round(main.temp_min)} °C`}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText sx={{ maxWidth: 90 }} primary="Humidity:" />
                      <ListItemText primary={`${Math.round(main.humidity)}%`} />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText sx={{ maxWidth: 90 }} primary="Pressure:" />
                      <ListItemText
                        primary={`${Math.round(main.pressure)} hPa`}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText
                        sx={{ maxWidth: 115 }}
                        primary="Wind speed:"
                      />
                      <ListItemText primary={`${wind.speed} metre/sec`} />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        sx={{ maxWidth: 115 }}
                        primary="Wind direction:"
                      />
                      <ListItemText primary={`${wind.deg} °Deg`} />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        sx={{ maxWidth: 115 }}
                        primary="Wind gust:"
                      />
                      <ListItemText primary={`${wind.gust} metre/sec`} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </MCard>
      {extended && <Chart key={data} city={city} />}
    </>
  )
}

export default Card
