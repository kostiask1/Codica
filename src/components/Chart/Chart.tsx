import { Box, CardMedia } from "@mui/material"
import { FC, useMemo } from "react"
import { useGetCityHourlyQuery } from "../../app/api"
import "./Chart.scss"

interface Props {
  city: string
}

const Chart: FC<Props> = ({ city }) => {
  const { data, isLoading, error } = useGetCityHourlyQuery(city)
  const medium = useMemo(
    () =>
      Math.round(
        data?.list?.reduce((acc: number, cur: any) => {
          return acc + cur.main.temp
        }, 0) / data?.list?.length
      ),
    [data]
  )
  if (error)
    return <>Error while loading, probably you entered city name wrong</>
  if (isLoading) return <></>

  return (
    <Box className="chart" sx={{ backgroundColor: "primary.light" }}>
      {!!data.list.length &&
        data.list.map((item: any) => (
          <div
            className="chart__cell"
            key={item.dt}
            style={{
              transform: `translateY(${
                (medium - Math.round(item.main.temp)) * 3
              }px)`,
              backgroundColor: `hsl(${
                50 + Math.min(16, medium - Math.round(item.main.temp)) * 1.6
              }, 90% ,50%)`,
            }}
          >
            <span>{item.dt_txt.slice(5, item.dt_txt.length - 3)}</span>
            <p>{Math.round(item.main.temp)} °C</p>
            <CardMedia
              component="img"
              height="60"
              image={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              sx={{ aspectRatio: "1/1", width: "unset" }}
              alt={item.weather[0].main}
            />
          </div>
        ))}
    </Box>
  )
}

export default Chart
